import React, { useEffect, useState } from 'react';
import '../../styles/components/MatchProfile.css';
import { requestData } from "../../services/requests";
import { useNavigate, useParams } from "react-router-dom";

const MatchProfile = () => {
    const { id } = useParams();
    const [match, setMatch] = useState(null);
    const [athlete1, setAthlete1] = useState(null);
    const [athlete2, setAthlete2] = useState(null);
    const [winner, setWinner] = useState(null);
    const history = useNavigate();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const matchResponse = await requestData(`/match/${id}`);
                setMatch(matchResponse);

                const athlete1Response = await requestData(`/athletes/${matchResponse.athlete1Id}`);
                setAthlete1(athlete1Response);

                const athlete2Response = await requestData(`/athletes/${matchResponse.athlete2Id}`);
                setAthlete2(athlete2Response);

                if (matchResponse.athleteWon) {
                    const winnerResponse = await requestData(`/athletes/${matchResponse.athleteWon}`);
                    setWinner(winnerResponse);
                }
            } catch (error) {
                console.error('Error fetching match or athletes:', error);
            }
        };

        fetchMatch();
    }, [id]);

    if (!match || !athlete1 || !athlete2) {
        return <div>Loading...</div>;
    }

    return (
        <div className="match-profile">
            <div className="youtube-container" dangerouslySetInnerHTML={{ __html: match.youtubeLink }} />
            <div className="athletes-info">
                <div className={`athlete-card ${winner && winner.id === athlete1.id ? 'winner' : ''}`} onClick={() => history(`/athletes/${athlete1.id}`)}>
                    <img src={athlete1.imageUrl} alt={athlete1.name} className="athlete-avatar" />
                    <div className="athlete-details">
                        <h3>
                            {athlete1.name} {winner && winner.id === athlete1.id && <i className="fas fa-trophy winner-trophy"></i>}
                        </h3>
                        <p><strong>Age:</strong> {athlete1.age}</p>
                        <p><strong>Weight Category:</strong> {athlete1.weightCategory}</p>
                        <p><strong>City:</strong> {athlete1.city}</p>
                    </div>
                </div>
                <div className="score-section">
                    <span className="athlete-score">{match.athlete1Score}</span>
                    <span className="vs">vs</span>
                    <span className="athlete-score">{match.athlete2Score}</span>
                </div>
                <div className={`athlete-card ${winner && winner.id === athlete2.id ? 'winner' : ''}`} onClick={() => history(`/athletes/${athlete2.id}`)}>
                    <img src={athlete2.imageUrl} alt={athlete2.name} className="athlete-avatar" />
                    <div className="athlete-details">
                        <h3>
                            {athlete2.name} {winner && winner.id === athlete2.id && <i className="fas fa-trophy winner-trophy"></i>}
                        </h3>
                        <p><strong>Age:</strong> {athlete2.age}</p>
                        <p><strong>Weight Category:</strong> {athlete2.weightCategory}</p>
                        <p><strong>City:</strong> {athlete2.city}</p>
                    </div>
                </div>
            </div>
            <div className="winner-info">
                <h3>
                    Start At: {match.startAt}
                </h3>
            </div>
            {winner && (
                <div className="winner-info">
                    <h3>
                        <i className="fas fa-trophy"></i> Winner: {winner.name}
                    </h3>
                </div>
            )}
            {user.role === 'admin' && (
                <button
                    className="edit-button"
                    onClick={() => history(`/match/edit/${id}`)}
                >
                    Изменить
                </button>
            )}
        </div>
    );
};

export default MatchProfile;
