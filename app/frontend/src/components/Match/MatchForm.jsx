import React, { useState, useEffect } from 'react';
import { createMatch, requestData, updateMatch } from '../../services/requests';
import '../../styles/components/AthleteForm.css';
import { useParams } from "react-router-dom"; // Import the CSS file

const MatchForm = ({ match }) => {
    const { id } = useParams();
    const [athlete1Id, setAthlete1Id] = useState(match ? match.athlete1Id : '');
    const [athlete2Id, setAthlete2Id] = useState(match ? match.athlete2Id : '');
    const [athlete1Score, setAthlete1Score] = useState(match ? match.athlete1Score : '');
    const [athlete2Score, setAthlete2Score] = useState(match ? match.athlete2Score : '');
    const [round, setRound] = useState(match ? match.round : '');
    const [startAt, setStartAt] = useState(match ? match.startAt : '');
    const [youtubeLink, setYoutubeLink] = useState(match ? match.youtubeLink : '');
    const [inProgress, setInProgress] = useState(match ? match.inProgress : false);
    const [isFinished, setIsFinished] = useState(match ? match.isFinished : false);
    const [athleteWon, setAthleteWon] = useState(match ? match.athleteWon : null);
    const [errorMessage, setErrorMessage] = useState('');
    const [athletes, setAthletes] = useState([]);

    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const response = await requestData('/athletes');
                setAthletes(response);
            } catch (error) {
                console.error('Error fetching athletes:', error);
            }
        };

        fetchAthletes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reqBody = {
            tournamentId: id,
            athlete1Id,
            athlete2Id,
            athlete1Score,
            athlete2Score,
            round,
            youtubeLink,
            startAt,
            inProgress,
            isFinished,
            athleteWon
        };

        try {
            if (match) {
                await updateMatch(match.id, reqBody);
            } else {
                await createMatch(reqBody);
            }

            setAthlete1Id('');
            setAthlete2Id('');
            setAthlete1Score('');
            setAthlete2Score('');
            setRound('');
            setYoutubeLink('');
            setStartAt('');
            setInProgress(false);
            setIsFinished(false);
            setAthleteWon('');
        } catch (error) {
            console.error("Error saving match:", error);
        }
    };

    return (
        <form className="athlete-form" onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div>
                <label>Athlete 1:</label>
                <select value={athlete1Id} onChange={(e) => setAthlete1Id(e.target.value)}>
                    <option value="">Select Athlete 1</option>
                    {athletes?.map((athlete) => (
                        <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Athlete 2:</label>
                <select value={athlete2Id} onChange={(e) => setAthlete2Id(e.target.value)}>
                    <option value="">Select Athlete 2</option>
                    {athletes?.map((athlete) => (
                        <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Athlete 1 Score:</label>
                <input type="number" value={athlete1Score} onChange={(e) => setAthlete1Score(e.target.value)} />
            </div>
            <div>
                <label>Athlete 2 Score:</label>
                <input type="number" value={athlete2Score} onChange={(e) => setAthlete2Score(e.target.value)} />
            </div>
            <div>
                <label>Round:</label>
                <input type="number" value={round} onChange={(e) => setRound(e.target.value)} />
            </div>
            <div>
                <label>YouTube Link:</label>
                <input type="text" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
            </div>
            <label>
                Дата начала:
                <input
                    type="datetime-local"
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                    required
                />
            </label>
            <div>
                <label>In Progress:</label>
                <input
                    type="checkbox"
                    checked={inProgress}
                    onChange={(e) => setInProgress(e.target.checked)}
                />
            </div>
            <div>
                <label>Is Finished:</label>
                <input
                    type="checkbox"
                    checked={isFinished}
                    onChange={(e) => setIsFinished(e.target.checked)}
                />
            </div>
            <div>
                <label>Winner:</label>
                <select value={athleteWon} onChange={(e) => setAthleteWon(e.target.value)}>
                    <option value="">Select Winner</option>
                    {athletes?.map((athlete) => (
                        <option key={athlete.id} value={athlete.id}>{athlete.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default MatchForm;
