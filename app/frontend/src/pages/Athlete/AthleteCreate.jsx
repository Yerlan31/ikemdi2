import React from 'react';
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";
import AthleteForm from "../../components/Athlete/AthleteForm";

const AthleteCreate = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const history = useNavigate();
    if (!user || user?.role !== 'admin') {
        history('/');
    }

    return (
        <div>
            <Header
                page="СОЗДАТЬ ДЗЮДОИСТА"
            />
            <AthleteForm/>
        </div>
    );
};

export default AthleteCreate;
