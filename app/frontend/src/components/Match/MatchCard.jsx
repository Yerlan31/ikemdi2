import React, { useState, useEffect } from 'react';
import '../../styles/components/MatchCard.css';
import { requestData } from "../../services/requests";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const MatchCard = ({ match }) => {
    const { id, athlete1Id, athlete2Id, athlete1Score, athlete2Score, inProgress, isFinished } = match;
    const [firstAthlete, setFirstAthlete] = useState(null);
    const [secondAthlete, setSecondAthlete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const firstAthleteResponse = await requestData(`/athletes/${athlete1Id}`);
                setFirstAthlete(firstAthleteResponse);

                const secondAthleteResponse = await requestData(`/athletes/${athlete2Id}`);
                setSecondAthlete(secondAthleteResponse);
            } catch (error) {
                console.log('Error fetching athletes:', error);
            }
        };

        fetchAthletes();
    }, [athlete1Id, athlete2Id]);

    const matchStatus = () => {
        if (isFinished) {
            return 'Finished';
        } else if (inProgress) {
            return 'In Progress';
        } else {
            return 'Not Started';
        }
    };

    const getWinnerClass = (athleteId) => {
        if (!isFinished) return '';
        return athlete1Score > athlete2Score && athleteId === athlete1Id
            ? 'winner'
            : athlete2Score > athlete1Score && athleteId === athlete2Id
                ? 'winner'
                : '';
    };

    return (
        <div className="match-card" onClick={() => navigate(`/match/${id}`)}>
            <div className={`athlete-details`}>
                <img src={firstAthlete?.imageUrl} alt={firstAthlete?.name} className="athlete-img" />
                <div className="athlete-name">
                    <h3>{firstAthlete?.name} {getWinnerClass(athlete1Id) && <FontAwesomeIcon icon={faTrophy} className="winner-trophy" />}</h3>
                </div>
            </div>
            <div className="score-section">
                <span className="score">{athlete1Score} - {athlete2Score}</span>
            </div>
            <div className={`athlete-details`}>
                <img src={secondAthlete?.imageUrl} alt={secondAthlete?.name} className="athlete-img" />
                <div className="athlete-name">
                    <h3>{secondAthlete?.name} {getWinnerClass(athlete2Id) && <FontAwesomeIcon icon={faTrophy} className="winner-trophy" />}</h3>
                </div>
            </div>
            <div className="match-status">
                <p>Status: {matchStatus()}</p>
            </div>
            <div className="match-status">
                <p>Start at: {match?.startAt}</p>
            </div>
        </div>
    );
};

export default MatchCard;
