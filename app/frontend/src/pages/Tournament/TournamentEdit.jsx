import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";
import {requestData} from "../../services/requests";
import TournamentsForm from "../../components/Tournament/TournamentsForm";

const TournamentEdit = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const history = useNavigate();
    const [tournament, setTournament] = useState(null);

    useEffect(() => {
        requestData(`/tournament/${parseInt(user.id)}`).then((response) => {
            setTournament(response);
        });
    }, []);

    if (!tournament) return <div>Loading...</div>;



    if (!user || user?.role !== 'admin') {
        history('/');
    }

    return (
        <div>
            <Header
                page="РЕДАКТИРОВАТЬ ТУРНИР"
            />
            <TournamentsForm tournament={tournament} />
        </div>
    );
};

export default TournamentEdit;
