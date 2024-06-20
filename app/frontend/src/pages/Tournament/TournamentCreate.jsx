import React from 'react';
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";
import TournamentsForm from "../../components/Tournament/TournamentsForm";

const TournamentCreate = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const history = useNavigate();
    if (!user || user?.role !== 'admin') {
        history('/');
    }

    return (
        <div>
            <Header
                page="СОЗДАТЬ ТУРНИР"
            />
            <TournamentsForm/>
        </div>
    );
};

export default TournamentCreate;
