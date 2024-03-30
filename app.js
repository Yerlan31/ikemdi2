const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const alert = require('alert');
var path = require('path');
const { start } = require('repl');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cron = require('node-cron');


const app = express();
const port = 3000;
const dbConfig = {user: 'postgres', password: 'postgres', host: 'localhost', port: '5432', database: 'judo'};
const db = pgp(dbConfig);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.set('view engine', 'ejs');

app.use(session({secret: 'your-secret-key', resave: true, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }));










app.get('/', async (req, res) => {
    var tournaments = await getTournaments();
    const page = req.query.page || 1;
    const logged = req.session.logged || false;
    const user = req.session.user || null;
    res.render('index', { tournaments, page, logged, user });
});

async function getTournaments() {
    try {
        const data = await db.any('SELECT * FROM tournaments');
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}










app.get('/login', async (req, res) => {
    res.render('login');
})

app.post('/login-start', async (req, res) => {
    const { email, password } = req.body;
    const userExists = await checkIfUserExists(email);
    if (userExists) {
        const passwordCorrect = await checkIfPasswordCorrect(email, password);
        if (passwordCorrect) {
            req.session.logged = true;
            req.session.user = await getUser(email);
            res.redirect('/login-success');
            return;
        }
    }
    res.render('loginAgain');
});

app.get('/login-success', async (req, res) => {
    var tournaments = await getTournaments();
    const page = req.query.page || 1;
    const logged = req.session.logged;
    const user = req.session.user;
    res.render('index', { tournaments, page, logged, user });
})

async function checkIfPasswordCorrect(email, password) {
    const user = await getUser(email);
    const hashed = await hashPassword(password, user.salt);
    if (user.password_hash == hashed) {
        return true;
    } else {
        return false;
    }
} 

async function getUser(email) {
    try {
        const data = await db.oneOrNone('SELECT * FROM users WHERE email = $1', email);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

app.post('/forgot-password-start', async (req, res) => {
    res.render('forgotPassword');
})

app.post('/forgot-password-process-start', async (req, res) => {
    const { email } = req.body;
    const userExists = await checkIfUserExists(email);
    if (userExists) {
        const userConfirmed = await checkIfUserConfirmed(email);
        if(userConfirmed) {
            const forgotPasswordToken = await generateToken();
            await changeRecoveryToken(email, forgotPasswordToken);
            const link = `http://localhost:3000/password-recovery/${forgotPasswordToken}`;
            await sendRecoveryEmail(email, link);
            res.redirect('/forgot-password-process-email-sent');
            return;
        }
    }
    res.redirect('/forgot-password-process-incorrect-email');
})

app.get('/forgot-password-process-email-sent', async (req, res) => {
    res.render('recoveryEmailSent');
})

app.get('/forgot-password-process-incorrect-email', async (req, res) => {
    res.render('forgotPasswordProcessIncorrectEmail');
})

async function changeRecoveryToken(email, token) {
    try {
        const result = await db.oneOrNone('UPDATE users SET recovery_password_token = $1 WHERE email = $2 RETURNING id', [ token, email]);
        return !!result;
    } catch (error) {
        console.error('Error activating account:', error);
        throw error;
    }
}

async function sendRecoveryEmail(email, link) {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
    const mailOptions = {
        from: 'tournaments-recovery@tournaments.com',
        to: email,
        subject: 'Tournament Account Recovery',
        text: `To recover the password of account please click on the link below:\n ${link}`,
    };
    let info = await transporter.sendMail(mailOptions);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

app.get('/password-recovery/:token', async (req, res) => {
    const { token } = req.params;
    const result = await findRecoveryToken(token);
    if (result) {
        res.render('accountRecovery', { token });
    } else {
        res.render('accountRecoveryError');
    }
});

async function findRecoveryToken(token) {
    const result = await db.oneOrNone('SELECT id FROM users WHERE recovery_password_token = $1', token);
    return !!result
}

app.post('/password-change-start', async (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.password;
    const newSalt = await generateRandomSalt();
    const newHash = await hashPassword(newPassword, newSalt);
    try {
        const result = await db.oneOrNone('UPDATE users SET recovery_password_token = NULL, password_hash = $1, salt = $2  WHERE recovery_password_token = $3 RETURNING id', [ newHash, newSalt, token]);
        res.redirect('/forgot-password-process-success')
    } catch (error) {
        console.error('Error activating account:', error);
        throw error;
    }
})

app.get('/forgot-password-process-success', async (req, res) => {
    res.render('forgotPasswordProcessSuccess');
})










app.get('/register', async (req, res) => {
    res.render('register');
})

app.post('/registration_start', async (req, res) => {
    const { name, surname, email, password } = req.body;
    const userExists = await checkIfUserExists(email);
    if (userExists) {
        const users = await getUsers();
        res.render('alreadyRegistered');
    } else {
        const confirmationToken = generateToken();
        await addUser(name, surname, email, confirmationToken, password);
        const users = await getUsers();
        const confirmationLink = `http://localhost:3000/confirm/${confirmationToken}`;
        await sendConfirmationEmail(req.body.email, confirmationLink);
        res.render('confirmationEmailSent');
    }
});

async function getUsers() {
    try {
        const data = await db.any('SELECT * FROM users');
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function checkIfUserExists(email) {
    const result = await db.oneOrNone('SELECT id FROM users WHERE email = $1', email);
    return !!result;
}

async function addUser(name, surname, email, token, password) {
    const currentDate = await new Date();
    const expirationDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    const salt = await generateRandomSalt();
    const user = {
        name: name,
        surname: surname,
        email: email,
        token: token,
        expiration: expirationDate,
        password_hash: hashPassword(password, salt),
        salt: salt,
        confirmed: false,
        recovery_password_token: null
    };
    const cs = new pgp.helpers.ColumnSet(['name', 'surname', 'email', 'token', 'expiration', 'password_hash', 'salt', 'confirmed', 'recovery_password_token'], { table: 'users' });
    const insertQuery = pgp.helpers.insert(user, cs);
    try {
        await db.none(insertQuery);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

app.get('/confirm/:token', async (req, res) => {
    const { token } = req.params;
    const result = await activateAccount(token);
    if (result) {
        res.render('accountConfirmed');
    } else {
        res.render('accountConfirmedError');
    }
});

async function activateAccount(token) {
    const date = await new Date();
    try {
        const result = await db.oneOrNone('UPDATE users SET confirmed = TRUE WHERE token = $1 AND expiration > $2 RETURNING id', [ token, date]);
        return !!result;
    } catch (error) {
        console.error('Error activating account:', error);
        throw error;
    }
}

async function sendConfirmationEmail(email, confirmationLink) {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
    const mailOptions = {
        from: 'tournaments-confirmation@tournaments.com',
        to: email,
        subject: 'Tournament Account Verification',
        text: `To confirm the account creation please select the following link:\n ${confirmationLink}`,
    };
    let info = await transporter.sendMail(mailOptions);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

function generateToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}

function generateRandomSalt(length=16) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function hashPassword(password, salt) {
    const algorithm = 'sha256';
    const iterations = 10000;
    const keyLength = 64;
    const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations, keyLength, algorithm)
        .toString('hex');
    return hashedPassword;
}

app.post('/registration_again', async (req, res) => {
    const { email } = req.body;
    const userExists = await checkIfUserExists(email);
    const userConfirmed = await checkIfUserConfirmed(email);
    if (userExists && !userConfirmed) {
        const confirmationToken = generateToken();
        const confirmationLink = `http://localhost:3000/confirm/${confirmationToken}`;
        await changeToken(email, confirmationToken);
        await sendConfirmationEmail(email, confirmationLink);
        res.render('confirmationEmailSent');
    } else {
        res.render('alreadyRegistered');
    }
});

async function changeToken(email, token) {
    const date = await new Date();
    const expiration = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    try {
        const result = await db.oneOrNone('UPDATE users SET token = $1, expiration = $2 WHERE email = $3 RETURNING id', [token, expiration, email]);
        return !!result;
    } catch (error) {
        console.error('Error activating account:', error);
        throw error;
    }
}

async function checkIfUserConfirmed(email) {
    const result = await db.oneOrNone('SELECT id FROM users WHERE email = $1 AND confirmed = TRUE', email);
    return !!result;
}









async function getTournamentsWithID(id) {
    try {
        const data = await db.any('SELECT * FROM tournaments WHERE id = $1', [id]);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

app.post('/view-tournament/:id', async (req, res) => {
    const tournamentID = req.params.id;
    try {
        let tournament = await getTournamentsWithID(tournamentID);
        const currentDate = await new Date();
        const avaibility = await (tournament[0].submission_date > currentDate && tournament[0].curr_participants < tournament[0].participants_limit);
        req.session.tournament = tournament;
        req.session.avaibility = avaibility;
        req.session.matches = await getMatchesWithTournamentIDAndName(tournament[0].id);
        res.redirect('/view-tournament-success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/view-tournament-success', async (req, res) => {
    const tournament = await req.session.tournament;
    const avaibility = await req.session.avaibility;
    const logged = await req.session.logged || false;
    const user = await req.session.user || null;
    const matches = await req.session.matches || null;
    const participants = await getParticipantsWithTournamentIdJoinUsers(tournament[0].id);
    if (!tournament) {
        return res.status(404).send('Tournament not found');
    }
    res.render('tournamentView', { tournament , avaibility, logged, user, participants, matches});
});

app.post('/edit-tournament-start/:tournamentID', async (req, res) => {
    const tournamentID = req.params.tournamentID;
    try {
        req.session.editing = await getTournamentsWithIDs([tournamentID]);
        res.redirect('/edit-tournament-process/');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/edit-tournament-process', async (req,res) => {
    const tournament = req.session.editing;
    const user = req.session.user;
    const currDate = await new Date();
    res.render("editTournament", { currDate, user, tournament });
})

app.post('/edit-tournament-process-start', async (req, res) => {
    const { tourID, name, discipline, time, submission, location, embedding, limitP, currP, sponsors, creator, idC, seeded } = req.body;
    const sponsorLinks = sponsors.split(' ').map(link => link.trim());
    const result = await editTournament(tourID, name, discipline, time, submission, location, embedding, limitP, currP, sponsorLinks, creator, idC, seeded);
    if (result) {
        res.redirect('/edit-tournament-success');
    }
})

app.get('/edit-tournament-success', async (req, res) => {
    res.render('editTournamentSuccess')
    const tournaments = await getTournaments();
})

async function editTournament(tourID, name, discipline, time, submission, location, embedding, limitP, currP, sponsorLinks, creator, idC, seeded) {
    const map_embeddingValue = embedding.trim() !== '' ? embedding : null;
    const sponsorLogosValue = sponsorLinks.every(logo => logo.trim() !== '') ? sponsorLinks : null;
    try {
        const updateQuery = `
            UPDATE tournaments
            SET
                name = $1,
                discipline = $2,
                date_time = $3,
                submission_date = $4,
                location = $5,
                map_embedding = $6,
                participants_limit = $7,
                curr_participants = $8,
                sponsor_logos = $9, 
                creator = $10, 
                creator_id = $11,
                seeded = $12
            WHERE id = $13
        `;
        
        await db.none(updateQuery, [name, discipline, time, submission, location, map_embeddingValue, limitP, currP, sponsorLogosValue, creator, idC, seeded, tourID ]);
        return true;
    } catch (error) {
        console.error('Error updating tournament:', error);
        return false;
    }
}












app.get('/createTournament', async (req, res) => {
    const currDate = await new Date();
    const user = await req.session.user;
    res.render('createTournament', { currDate, user });
});

app.post('/create-tournament-start', async (req, res) => {
    const { name, discipline, time, submission, location, embedding, limitP, currP, sponsors, creator, idC } = req.body;
    const sponsorLinks = sponsors.split(' ').map(link => link.trim());
    const result = await addTournament(name, discipline, time, submission, location, embedding, limitP, currP, sponsorLinks, creator, idC);
    if (result) {
        res.redirect('/create-tournament-success');
    }
})

async function addTournament(name, discipline, date_time, submission_date, location, map_embedding, participants_limit, curr_participants, sponsor_logos, creator, idC) {
    const map_embeddingValue = map_embedding.trim() !== '' ? map_embedding : null;
    const sponsorLogosValue = sponsor_logos.every(logo => logo.trim() !== '') ? sponsor_logos : null;
    const tournament = {
        name: name,
        discipline: discipline,
        date_time: date_time,
        submission_date: submission_date,
        location: location,
        map_embedding: map_embeddingValue,
        participants_limit: participants_limit,
        curr_participants: curr_participants,
        sponsor_logos: sponsorLogosValue,
        creator: creator, 
        creator_id: idC, 
        seeded: false
    };
    const cs = new pgp.helpers.ColumnSet(['name', 'discipline', 'date_time', 'submission_date', 'location', 'map_embedding', 'participants_limit', 'curr_participants', 'sponsor_logos', 'creator', 'creator_id', 'seeded'], { table: 'tournaments' });
    const insertQuery = pgp.helpers.insert(tournament, cs);
    try {
        await db.none(insertQuery);
        return true
    } catch (error) {
        console.error('Error inserting data:', error);
        return false;
    }
}

app.get('/create-tournament-success', async (req, res) => {
    res.render('createTournamentSuccess')
})













app.post('/participate-start/:userId/:tournamentId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const tournamentId = req.params.tournamentId;
        const checkTournament = await checkIfTournamentAvailable(tournamentId);
        const checkParticipants = await checkIfUserParticipates(userId, tournamentId);
        if (checkTournament && !checkParticipants) {
            res.redirect('/participation-process-start');
        } else {
            res.redirect('/participation-failure');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/participation-process-start', async (req, res) => {
    const user = await req.session.user;
    const tournament = await req.session.tournament;
    res.render('participationDetails', { userId: user.id, tournamentId: tournament[0].id });
});

app.post('/participation-details-provided', async (req, res) => {
    const { userId, tournamentId, license, ranking} = req.body;
    const result = await participateInTournament(userId, tournamentId, license, ranking);
    if (result) {
        res.redirect('/participation-success');
        return;
    }
    res.redirect('/participation-failure');
});

async function participateInTournament(userId, tournamentId, license, ranking) {
    const checkTournament = await checkIfTournamentAvailable(tournamentId);
    const checkParticipants = await checkIfUserParticipates(userId, tournamentId);
    if (checkTournament && !checkParticipants) {
        const result = await addParticipationRow(userId, tournamentId, license, ranking);
        if (result) {
            const result2 = await addParticipantToTournament(tournamentId);
            if (result2) {
                return true
            }
        }
    }
    return false;
}

async function checkIfTournamentAvailable(tournamentID) {
    const result = await db.oneOrNone('SELECT id FROM tournaments WHERE id = $1 AND participants_limit > curr_participants', tournamentID);
    return !!result;
}

async function checkIfUserParticipates(userId, tournamentId) {
    const result = await db.oneOrNone('SELECT id FROM participants WHERE user_id = $1 AND tournament_id = $2', [userId, tournamentId]);
    return !!result;
}

async function addParticipationRow(userID, tournamentID, license, ranking) {
    const participation = {
        user_id: userID,
        tournament_id: tournamentID,
        license: license,
        ranking: ranking,
        seed: null
    };
    const cs = new pgp.helpers.ColumnSet(['user_id', 'tournament_id', 'license', 'ranking', 'seed'], { table: 'participants' });
    const insertQuery = pgp.helpers.insert(participation, cs);
    try {
        await db.none(insertQuery);
        return true
    } catch (error) {
        console.error('Error inserting data:', error);
        return false;
    }
}

async function addParticipantToTournament(tournamentID) {
    try {
        const currDate = new Date();
        const result = await db.oneOrNone('UPDATE tournaments SET curr_participants = curr_participants + 1 WHERE id = $1 AND participants_limit - curr_participants - 1 >= 0 AND submission_date > $2 RETURNING id', [tournamentID, currDate]);
        return !!result;
    } catch (error) {
        console.error('Error changing data:', error);
        throw error;
    }
}

app.get('/participation-success', async (req, res) => {
    res.render('participationSuccess');
});

app.get('/participation-failure', async (req, res) => {
    res.render('participationFailure');
});

async function getParticipants() {
    try {
        const data = await db.any('SELECT * FROM participants');
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getParticipantsWithTournamentId(tourID) {
    try {
        const data = await db.any('SELECT * FROM participants WHERE tournament_id = $1', [tourID]);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getParticipantsWithTournamentIdAndWinnerIds(tourID, winnerIds) {
    try {
        const data = await db.any('SELECT * FROM participants WHERE tournament_id = $1 AND user_id IN ($2:csv)', [tourID, winnerIds]);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getParticipantsWithTournamentIdJoinUsers(tourID) {
    try {
        const data = await db.any(`
            SELECT participants.*, users.*
            FROM participants
            JOIN users ON participants.user_id = users.id
            WHERE participants.tournament_id = $1
        `, [tourID]);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

















cron.schedule('* * * * *', () => {
    runEveryMinute();
});

async function runEveryMinute() {
    await checkSubmissionDate();
    await updateMatches();
    //await testingAddWinners(); // used for testing
    await generateNextRounds();
}

async function checkSubmissionDate() {
    const currDate = new Date();
    let tournaments;
    try {
        tournaments = await db.any(`SELECT * FROM tournaments WHERE submission_date < $1 AND seeded = false AND curr_participants > 0`, [currDate]);
    } catch (error) {
        console.error('Error querying the database:', error);
        throw error;
        return
    }

    const processTournaments = async (tournaments) => {
        for (const item of tournaments) {
          await makeSeeds(item.id);
        }
    };

    processTournaments(tournaments)
    .then(() => {
    })
    .catch((error) => {
        console.error('Error processing tournaments:', error);
    });
    return
}

async function makeSeeds(tournamentID) {
    const participants = await getParticipantsWithTournamentId(tournamentID);
    const participants_len = participants.length;
    participants.sort((a, b) => a.ranking - b.ranking);
    let seed = 1;

    matches = []
    for (const participation of participants) {
        try {
            if (seed <= Math.floor(participants_len / 2)) {
                await db.oneOrNone('UPDATE participants SET seed = $1 WHERE user_id = $2 AND tournament_id = $3', [seed, participation.user_id, tournamentID]);
                seed += 1;
            } else if ((seed == participants_len) && (participants_len % 2 !== 0)) {
                await db.oneOrNone('UPDATE participants SET seed = $1 WHERE user_id = $2 AND tournament_id = $3', [Math.floor(participants_len / 2) + 1, participation.user_id, tournamentID]);
                seed += 1;
            } else {
                await db.oneOrNone('UPDATE participants SET seed = $1 WHERE user_id = $2 AND tournament_id = $3', [seed - (Math.floor(participants_len / 2)), participation.user_id, tournamentID]);
                seed += 1;
            }
        } catch (error) {
            console.error('Error changing data:', error);
            throw error;
        }
    }

    const round = 1;
    let max;
    if (participants_len % 2 !== 0) {
        max = Math.floor(participants_len / 2) + 1
    } else {
        max = Math.floor(participants_len / 2)
    }
    for (let index = 1; index <= max; index++) {
        try {
            await createMatches(tournamentID, index, round);
        } catch (error) {
            console.error('Error changing data:', error);
            throw error;
        }
    }

    try {
        await db.oneOrNone('UPDATE tournaments SET seeded = true WHERE id = $1', [tournamentID]);
    } catch (error) {
        console.error('Error changing data:', error);
        throw error;
    }

    return true;
}

async function createMatches(tournamentId, seedID, round) {
    try {
        let matchData;
        const result = await db.any(`SELECT * FROM participants WHERE tournament_id = $1 AND seed = $2;`, [tournamentId, seedID]);
        
        if (result.length == 2) {
            matchData = {
                user_id1: result[0].user_id,
                user_ranking1: result[0].ranking,
                user_id2: result[1].user_id,
                user_ranking2: result[1].ranking,
                tournament_id: result[0].tournament_id,
                round: round,
                winner1: null,
                winner2: null,
                complete: false
              };
        } else if (result.length == 1) {
            matchData = {
                user_id1: result[0].user_id,
                user_ranking1: result[0].ranking,
                user_id2: null,
                user_ranking2: null,
                tournament_id: result[0].tournament_id,
                round: round,
                winner1: result[0].user_id,
                winner2: result[0].user_id,
                complete: true
              };
        }
        if (matchData) {
            const cs = new pgp.helpers.ColumnSet(['user_id1', 'user_ranking1', 'user_id2', 'user_ranking2', 'tournament_id', 'round', 'winner1', 'winner2', 'complete'], { table: 'matches' });
            const insertQuery = pgp.helpers.insert(matchData, cs);
            await db.none(insertQuery);
            return true
        }
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getMatchesWithTournamentID(id) {
    try {
        const data = await db.any('SELECT * FROM matches WHERE tournament_id = $1', [id]);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getMatchesWithTournamentIDAndName(id) {
    try {
        const data = await db.any(
        `SELECT
            matches.id,
            matches.user_id1,
            matches.user_ranking1,
            users1.name AS user1_name,
            users1.surname AS user1_surname,
            matches.user_id2,
            matches.user_ranking2,
            users2.name AS user2_name,
            users2.surname AS user2_surname,
            matches.tournament_id,
            matches.round,
            matches.winner1,
            matches.winner2,
            matches.complete,
            winner.name AS winner_name,
            winner.surname AS winner_surname
        FROM
            matches
        LEFT JOIN
            users AS users1 ON matches.user_id1 = users1.id
        LEFT JOIN
            users AS users2 ON matches.user_id2 = users2.id
        LEFT JOIN
            users as winner ON (
                (matches.winner1 = matches.winner2) AND
                (winner.id = matches.winner1) AND
                (matches.winner1 IS NOT NULL AND matches.winner2 IS NOT NULL)
            )
        WHERE
            matches.tournament_id = $1; 
        `, [id]);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getMatches() {
    try {
        const data = await db.any('SELECT * FROM matches');
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getMatchWithID(id) {
    try {
        const data = await db.any('SELECT * FROM matches WHERE id = $1', [id]);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function updateMatches() {
    try {
        const result = await db.result(
          'UPDATE matches SET complete = true WHERE winner1 = winner2 AND winner1 IS NOT NULL AND winner2 IS NOT NULL'
        );
      } catch (error) {
        console.error('Error updating matches:', error);
      }
}

async function testingAddWinners() {
    try {
        await db.none('UPDATE matches SET winner1 = user_id1, winner2 = user_id1, complete = true WHERE winner1 IS NULL AND winner2 IS NULL AND complete = false');
    } catch (error) {
        console.error('Error updating matches:', error);
    }
}

async function generateNextRounds() {
    try {
        const maxRoundQuery = `
            SELECT tournament_id, MAX(round) AS latest_round
            FROM matches
            WHERE complete = true
            GROUP BY tournament_id
            HAVING NOT EXISTS (
                SELECT 1
                FROM matches m2
                WHERE m2.tournament_id = matches.tournament_id
                AND m2.round > MAX(matches.round)
                AND m2.complete = false
            )
            `;
        const winnersQuery = `SELECT winner1 FROM matches WHERE complete = true AND tournament_id = $1 AND round = $2 AND winner1 = winner2 AND winner1 IS NOT NULL`;
        const tournamentRounds = await db.any(maxRoundQuery);
        for (const tournament of tournamentRounds) {
            const winners = await db.any(winnersQuery, [tournament.tournament_id, tournament.latest_round]);
            const winnerIds = winners.map(winner => winner.winner1);
            if (winnerIds.length > 1) {
                const data = await getParticipantsWithTournamentIdAndWinnerIds(tournament.tournament_id, winnerIds);
                let seed = 1
                for (const participation of data) {
                    if (seed <= Math.floor(data.length / 2)) {
                        participation.seed = seed;
                        seed += 1;
                    } else if ((seed == data.length) && (data.length % 2 !== 0)) {
                        participation.seed = Math.floor(data.length / 2) + 1;
                        seed += 1;
                    } else {
                        participation.seed = seed - Math.floor(data.length / 2);
                        seed += 1;
                    }
                }
                await createNextMatches(data, tournament.latest_round + 1);
            }
        }
    } catch (error) {
        console.error('Error creating matches:', error);
    }
}

async function createNextMatches(participations, round) {
    try {
        const groupedData = await participations.reduce((result, participant) => {
            const seed = participant.seed;
            if (!result[seed]) {
              result[seed] = [];
            }
            result[seed].push(participant);
            return result;
        }, {});
        for (const seed in groupedData) {
            const participants = groupedData[seed];
            let matchData;
            if (participants.length === 2) {
                matchData = {
                    user_id1: participants[0].user_id,
                    user_ranking1: participants[0].ranking,
                    user_id2: participants[1].user_id,
                    user_ranking2: participants[1].ranking,
                    tournament_id: participants[0].tournament_id,
                    round: round,
                    winner1: null,
                    winner2: null,
                    complete: false
                };
            } else if (participants.length === 1) {
                matchData = {
                    user_id1: participants[0].user_id,
                    user_ranking1: participants[0].ranking,
                    user_id2: null,
                    user_ranking2: null,
                    tournament_id: participants[0].tournament_id,
                    round: round,
                    winner1: participants[0].user_id,
                    winner2: participants[0].user_id,
                    complete: true
                };
            }
            if (matchData) {
                const cs = new pgp.helpers.ColumnSet(['user_id1', 'user_ranking1', 'user_id2', 'user_ranking2', 'tournament_id', 'round', 'winner1', 'winner2', 'complete'], { table: 'matches' });
                const insertQuery = pgp.helpers.insert(matchData, cs);
                await db.none(insertQuery);
            }
        } 
        return true;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}





























app.post('/submit-results-start/:userId/:matchId', async (req, res) => {
    const userId = req.params.userId;
    const matchId = req.params.matchId;
    const match = await getMatchWithID(matchId);
    req.session.match = match;
    res.redirect('/submit-results-process-start')
});

app.get('/submit-results-process-start', async (req, res) => {
    res.render('submitResults');
});

app.post('/submit-results-process-win/', async (req, res) => {
    const userId = req.session.user.id || null;
    const matchId = req.session.match[0].id || null;
    if (userId && matchId) {
        try {
            const data = await db.oneOrNone('SELECT * FROM matches WHERE id = $1', [matchId]);
            let updatedRows;
            if (userId == data.user_id1) { 
                updatedRows = await db.result(`UPDATE matches SET winner1 = $1 WHERE id = $2 AND (winner2 IS NULL OR winner2 = $1) RETURNING *`, [userId, matchId]);
            } else { 
                updatedRows = await db.result(`UPDATE matches SET winner2 = $1 WHERE id = $2 AND (winner1 IS NULL OR winner1 = $1) RETURNING *`, [userId, matchId]);
            }
            const numberOfUpdatedRows = updatedRows.rowCount;
            
            if (numberOfUpdatedRows == 1) {
                res.redirect('/submit-results-success');
            } else {
                const result = await db.none('UPDATE matches SET winner1 = NULL, winner2 = NULL, complete = false WHERE id = $1', [matchId]);
                res.redirect('/submit-results-failure');
            } 
        } catch (error) {
            console.error('Error updating match winner:', error);
            res.redirect('/submit-results-failure');
        }
    } else {
        console.error('Invalid userId or matchId');
        res.redirect('/submit-results-failure');
    }
});

app.post('/submit-results-process-lost/', async (req, res) => {
    const userId = req.session.user.id || null;
    const matchId = req.session.match[0].id || null;
    if (userId && matchId) {
        try {
            let updatedRows;
            const data = await db.oneOrNone('SELECT * FROM matches WHERE id = $1', [matchId]);
            if (userId == data.user_id1) { 
                updatedRows = await db.result(`UPDATE matches SET winner1 = $1 WHERE id = $2 AND (winner2 IS NULL OR winner2 = $1) RETURNING *`, [data.user_id2, matchId]);
            } else { 
                updatedRows = await db.result(`UPDATE matches SET winner2 = $1 WHERE id = $2 AND (winner1 IS NULL OR winner1 = $1) RETURNING *`, [data.user_id1, matchId]);
            }
            const numberOfUpdatedRows = updatedRows.rowCount;
            
            if (numberOfUpdatedRows == 1) {
                res.redirect('/submit-results-success');
            } else {
                const result = await db.none('UPDATE matches SET winner1 = NULL, winner2 = NULL, complete = false WHERE id = $1', [matchId]);
                res.redirect('/submit-results-failure');
            } 
        } catch (error) {
            console.error('Error updating match winner:', error);
            res.redirect('/submit-results-failure');
        }
    } else {
        console.error('Invalid userId or matchId');
        res.redirect('/submit-results-failure');
    }
});

app.get('/submit-results-success', async (req, res) => {
    res.render('submitResultsSuccess');
});

app.get('/submit-results-failure', async (req, res) => {
    res.render('submitResultsFailure');
});















app.get('/viewOwnTournaments', async (req, res) => {
    const user = await req.session.user;
    const tournamentIds = await getTournamentIds(user.id);
    const page = req.query.pageUser || 1;
    if (tournamentIds) {
        const tournaments = await getTournamentsWithIDs(tournamentIds);
        if (tournaments) {
            res.render('userTournaments', { tournaments, page});
            return;
        }
    }
    res.render("userTournamentsError");
})

async function getTournamentIds(userID) {
    try {
        const tournamentIds = await db.manyOrNone('SELECT tournament_id FROM participants WHERE user_id = $1', [userID]);
        return tournamentIds.map(entry => entry.tournament_id);
    } catch (error) {
        return false;
    }
}

async function getTournamentsWithIDs(IDlist) {
    try {
        const tournaments = await db.manyOrNone('SELECT * FROM tournaments WHERE id IN ($1:csv)', [IDlist]);
        return tournaments;
    } catch (error) {
        return false;
    }
}

