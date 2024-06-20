import React, { useState, useEffect } from 'react';
import { requestData} from '../../services/requests';
import '../../styles/components/AthleteProfile.css';
import {Link, useNavigate} from "react-router-dom";

const MyProfile = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const [athlete, setAthlete] = useState(null);
    const history = useNavigate();
    useEffect(() => {
        requestData(`/me/${parseInt(user.id)}`).then((response) => {
            setAthlete(response.athlete);
        });
    }, [user]);

    if (!athlete) return <div>Loading...</div>;

    return (
        <div className="athlete-profile">
            <img src={athlete.imageUrl} alt={athlete.name} />
            <h2>FIO: {athlete.name}</h2>
            <p>Age: {athlete.age}</p>
            <p>Weight Category: {athlete.weightCategory}</p>
            <p>City: {athlete.city}</p>
            <p>Achievements: {athlete.achievements}</p>
            <button type="submit" className="edit-button"  data-testid="header__show_matches_btn" onClick={() => history("/profile/edit")}>
                Изменить
            </button>
        </div>
    );
};

export default MyProfile;
