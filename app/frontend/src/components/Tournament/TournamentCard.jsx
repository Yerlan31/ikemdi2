import React from 'react';
import '../../styles/components/AthleteCard.css';

const TournamentCard = ({ tournament, handler }) => {
    return (
        <div className="athlete-card" onClick={() => handler(tournament.id)}>
            <h3>{tournament.title}</h3>
            <p>{tournament.description?.substring(0, 50)}...</p>
            <p><strong>Start:</strong> {new Date(tournament.startAt).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(tournament.endAt).toLocaleString()}</p>
        </div>
    );
};

export default TournamentCard;
111