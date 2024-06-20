import React, { useState, useEffect } from 'react';
import { requestData } from '../../services/requests';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/components/AthleteProfile.css';

const TournamentProfile = () => {
    const { id } = useParams();
    const [tournament, setTournament] = useState(null);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const navigate = useNavigate();

    useEffect(() => {
        requestData(`/tournament/${parseInt(id)}`).then((response) => {
            setTournament(response);
        });
    }, [id]);

    if (!tournament) return <div>Loading...</div>;


    return (
        <div className="athlete-profile">
            <h2>{tournament.title}</h2>
            <p>{tournament.description}</p>
            <p><strong>Start:</strong> {new Date(tournament.startAt).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(tournament.endAt).toLocaleString()}</p>
            <p><strong>Contacts:</strong> {tournament.contacts}</p>
            {tournament.yandexLocation && <div className="yandex-container" dangerouslySetInnerHTML={{ __html: tournament.yandexLocation }} />}
            {user.role === 'admin' && user.id === tournament.userId &&  (
                <button
                    type="submit"
                    className="edit-button"
                    onClick={() => navigate(`/tournament/edit/${id}`)}
                >
                    Изменить
                </button>
            )}
        </div>
    );
};

export default TournamentProfile;
