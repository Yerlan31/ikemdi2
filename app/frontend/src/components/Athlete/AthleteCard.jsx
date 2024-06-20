import React from 'react';
import '../../styles/components/AthleteCard.css';

const AthleteCard = ({ athlete, handler }) => {
    return (
        <div className="athlete-card" onClick={() => handler(athlete.id)}>
            <img src={athlete.imageUrl} alt={athlete.name} />
            <h3>FIO: {athlete.name}</h3>
            <p>Age: {athlete.age}</p>
            <p>Weight Category: {athlete.weight_category}</p>
            <p>City: {athlete.city}</p>
        </div>
    );
};

export default AthleteCard;
