import React, { useState, useEffect } from 'react';
import { getAthleteById } from '../../services/requests';
import {useNavigate, useParams} from 'react-router-dom';
import '../../styles/components/AthleteProfile.css';

const AthleteProfile = () => {
    const { id } = useParams();
    const [athlete, setAthlete] = useState(null);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const history = useNavigate();

    useEffect(() => {
        getAthleteById(parseInt(id)).then((response) => {
            setAthlete(response.data);
        });
    }, [id]);

    if (!athlete) return <div>Loading...</div>;

    return (
        <div className="athlete-profile">
            <img src={athlete.imageUrl} alt={athlete.name} />
            <h2>FIO: {athlete.name}</h2>
            <p>Age: {athlete.age}</p>
            <p>Weight Category: {athlete.weightCategory}</p>
            <p>City: {athlete.city}</p>
            <p>Achievements: {athlete.achievements}</p>
            {user.role === 'admin' && <button type="submit" className="edit-button" data-testid="header__show_matches_btn" onClick={() => history(`/athletes/edit/${athlete.id}`)}>
                Изменить
            </button>}
        </div>
    );
};

export default AthleteProfile;
