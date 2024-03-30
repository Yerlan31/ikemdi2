const pgp = require('pg-promise')();
const dbConfig = {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'judo'
};

const db = pgp(dbConfig);

const map_embeddings = ["1m18!1m12!1m3!1d20634.647057378377!2d16.892278724523145!3d52.39645382567141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b322b18c34f%3A0x145700ff326653af!2sGaleria%20Avenida!5e0!3m2!1spl!2spl!4v1704242910000!5m2!1spl!2spl",
"1m18!1m12!1m3!1d16857.939036564927!2d16.896406646939738!3d52.39565652616875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045ad58cd2f4a5%3A0x77150933f1f49c40!2sHotel%20Moderno!5e0!3m2!1spl!2spl!4v1704243015411!5m2!1spl!2spl",
"1m18!1m12!1m3!1d16857.939036564927!2d16.896406646939738!3d52.39565652616875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b3bb44e01cd%3A0x28b16867e5ae92e8!2sStary%20Browar!5e0!3m2!1spl!2spl!4v1704243075008!5m2!1spl!2spl",
"1m18!1m12!1m3!1d16855.670593291772!2d16.897372411798987!3d52.40159460614486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b365fd5a499%3A0xb3e19447bd6f5862!2sZamek%20Cesarski!5e0!3m2!1spl!2spl!4v1704243143066!5m2!1spl!2spl",
"1m18!1m12!1m3!1d3344.4729415129245!2d16.945830605164932!3d52.40312347604533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47045b85e236103b%3A0x8030a1c59859cfa9!2sCentrum%20Wyk%C5%82adowe%20PP!5e0!3m2!1spl!2spl!4v1704243192330!5m2!1spl!2spl"]

const locations = ["Matyi 2, 61-586 Poznań", "Kolejowa 29, 60-718 Poznań", "Półwiejska 42, 61-888 Poznań", "Święty Marcin 80/82, 61-809 Poznań", "Piotrowo 2, 60-965 Poznań"]

const sponsors = ['https://thumbs.dreamstime.com/b/projekt-wektora-czarnego-logo-nike-czarny-z-czarnym-sport-gotowy-do-druku-kompozycji-183282273.jpg', 'https://creativeheads.pl/wp-content/uploads/2019/10/logo-adidas-koniczyna.png', 'https://i.etsystatic.com/23511185/r/il/e056a3/2384976935/il_fullxfull.2384976935_56zr.jpg', 'https://www.graphicmore.com/wp-content/uploads/2016/04/Coca-Cola-Logo-Design.jpg', 'https://mlhbij2pllfp.i.optimole.com/cb:3a0g~f2eb/w:300/h:300/q:mauto/ig:avif/f:best/https://liviotargi.pl/wp-content/uploads/2021/05/Pepsi-logo.png'];


function generateSponsors(sourceList, minLength, maxLength) {
    const result = [];
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * sourceList.length);
        result.push(sourceList[randomIndex]);
    }
    return result;
}

function generateRandomDate() {
    const now = new Date();
    const minDate = new Date(now.getTime());
    const maxDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
    return randomDate.toISOString().slice(0, 19).replace('T', ' ');
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function generateRandomNickname() {
    const adjectives = ['Happy', 'Sunny', 'Funny', 'Clever', 'Cool', 'Daring', 'Witty'];
    const nouns = ['Explorer', 'Guru', 'Champion', 'Master', 'Ninja', 'Pioneer', 'Magician'];

    const adjective = getRandomElement(adjectives);
    const noun = getRandomElement(nouns);

    return `${adjective}${noun}`;
}

function generateRandomDisciplineName() {
    const disciplines = [
        'Football', 'Basketball', 'Tennis', 'Soccer', 'Baseball',
        'Volleyball', 'Swimming', 'Golf', 'Cycling', 'Running',
        'Chess', 'Badminton', 'Table Tennis', 'Boxing', 'Martial Arts',
        'Gymnastics', 'Hiking', 'Skating', 'Surfing', 'Climbing'
    ];
    const randomIndex = Math.floor(Math.random() * disciplines.length);
    return disciplines[randomIndex];
}

function generateRandomCompetitionName() {
    const adjectives = ['Fierce', 'Swift', 'Epic', 'Glorious', 'Mighty', 'Daring', 'Vibrant', 'Spirited'];
    const nouns = ['Challenge', 'Showdown', 'Clash', 'Battle', 'Tournament', 'Contest', 'Rumble', 'Championship'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomAdjective} ${randomNoun}`;
}

function generateRandomIntegers(x, min, max) {
    if (x > max - min + 1 || max < min) {
        throw new Error("Invalid range or count of integers");
    }
    const result = [];
    while (result.length < x) {
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!result.includes(randomInt)) {
            result.push(randomInt);
        }
    }
    return result;
}


async function createTableIfNotExists() {
    const deleteTableQuery = `DROP TABLE IF EXISTS tournaments CASCADE;`

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS tournaments (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            discipline VARCHAR(255) NOT NULL, 
            date_time TIMESTAMP NOT NULL,
            submission_date TIMESTAMP NOT NULL,
            location VARCHAR(255) NOT NULL,
            map_embedding VARCHAR(255),
            participants_limit INT NOT NULL,
            curr_participants INT NOT NULL,
            sponsor_logos TEXT[],
            creator VARCHAR(255) NOT NULL,
            creator_id INTEGER NOT NULL,
            seeded BOOLEAN NOT NULL
        );
    `;

    try {
        await db.none(deleteTableQuery);
        await db.none(createTableQuery);
        console.log('Correct tournaments.');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

async function generateDataset() {
    await createTableIfNotExists();

    const tournaments = [];

    for (let i = 0; i < 5; i++) {
        const randnumber = generateRandomNumber(10, 90);
        const randLocNumber = generateRandomNumber(0, 4);
        const randDate = generateRandomDate();
        const submissionDate = new Date();
        const tournament = {
            name: generateRandomCompetitionName(),
            discipline: generateRandomDisciplineName(), 
            date_time: randDate,
            submission_date: submissionDate.toISOString().slice(0, 19).replace('T', ' '),
            location: locations[randLocNumber],
            map_embedding: map_embeddings[randLocNumber], 
            participants_limit: randnumber,
            curr_participants:  Math.floor(Math.random() * randnumber),
            sponsor_logos: generateSponsors(sponsors, 1, 20),
            creator: generateRandomNickname(),
            creator_id: generateRandomNumber(1, 10),
            seeded: false
        };
        tournaments.push(tournament);
    }

    const cs = new pgp.helpers.ColumnSet(['name', 'discipline', 'date_time', 'submission_date', 'location', 'map_embedding', 'participants_limit', 'curr_participants', 'sponsor_logos', 'creator', 'creator_id', 'seeded'], { table: 'tournaments' });
    const insertQuery = pgp.helpers.insert(tournaments, cs);

    try {
        await db.none(insertQuery);
        console.log('Correct tournaments.');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

async function generateUserDataset() {
    const deleteTableQuery = `DROP TABLE IF EXISTS users CASCADE;`
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL, 
            surname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            token VARCHAR(255),
            expiration TIMESTAMP,
            password_hash VARCHAR(255) NOT NULL,
            salt VARCHAR(255) NOT NULL, 
            confirmed BOOLEAN NOT NULL,
            recovery_password_token VARCHAR(255)
        );
    `;

    const users = [];

    for (let i = 0; i < 100; i++) {
        const user = {
            name: generateRandomNickname(),
            surname: generateRandomNickname(),
            email: generateRandomNickname() + '@gmail.com',
            token: null,
            expiration: null,
            password_hash: generateRandomString(10),
            salt: generateRandomString(10),
            confirmed: true,
            recovery_password_token: null
        };
        users.push(user);
    }

    const cs = new pgp.helpers.ColumnSet(['name', 'surname', 'email', 'token', 'expiration', 'password_hash', 'salt', 'confirmed', 'recovery_password_token'], { table: 'users' });
    const insertQuery = pgp.helpers.insert(users, cs);

    try {
        await db.none(deleteTableQuery);
        await db.none(createTableQuery);
        await db.none(insertQuery);
        console.log('Correct users.');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

async function generateParticipations() {
    const deleteTableQuery = `DROP TABLE IF EXISTS participants CASCADE;`;
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS participants (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) NOT NULL,
            tournament_id INTEGER REFERENCES tournaments(id) NOT NULL,
            license INTEGER NOT NULL,
            ranking INTEGER NOT NULL,
            seed INTEGER,
            CONSTRAINT unique_participation_license UNIQUE (tournament_id, license),
            CONSTRAINT unique_participation_ranking UNIQUE (tournament_id, ranking)
        );
    `;

    const participants = []
    const tournaments = await db.any('SELECT * FROM tournaments');

    tournaments.forEach(tournament=> {
        const number_of_participants = tournament.curr_participants
        const users = generateRandomIntegers(number_of_participants, 1, 100)
        for (let i = 0; i < number_of_participants; i++) {
            const participation = {
                user_id: users[i],
                tournament_id: tournament.id,
                license: users[i],
                ranking: users[i],
                seed: null
            };
            participants.push(participation);
        }
    })

    const cs = new pgp.helpers.ColumnSet(['user_id', 'tournament_id', 'license', 'ranking', 'seed'], { table: 'participants' });
    const insertQuery = pgp.helpers.insert(participants, cs);

    try {
        await db.none(deleteTableQuery);
        await db.none(createTableQuery);
        await db.none(insertQuery);
        console.log('Correct participants.');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

async function generateMatches() {
    const deleteTableQuery = `DROP TABLE IF EXISTS matches CASCADE;`;
    const createTableQuery = `CREATE TABLE IF NOT EXISTS matches (
        id SERIAL PRIMARY KEY,
        user_id1 INTEGER REFERENCES users(id) NOT NULL,
        user_ranking1 INTEGER NOT NULL,
        user_id2 INTEGER REFERENCES users(id),
        user_ranking2 INTEGER,
        tournament_id INTEGER REFERENCES tournaments(id) NOT NULL,
        round INTEGER NOT NULL,
        winner1 INTEGER REFERENCES users(id),
        winner2 INTEGER REFERENCES users(id),
        complete BOOLEAN NOT NULL
    )`;
    try {
        await db.none(deleteTableQuery);
        await db.none(createTableQuery);
        console.log('Correct matches.');
    } catch (error) {
        console.error('Error creating table:', error);
    }

}

async function generateAll() {
    await generateDataset();
    await generateUserDataset();
    await generateParticipations();
    await generateMatches();
    pgp.end();
}

generateAll();