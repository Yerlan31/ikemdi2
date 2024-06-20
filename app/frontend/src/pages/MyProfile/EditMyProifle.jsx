import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import {requestData} from "../../services/requests";
import AthleteForm from "../../components/Athlete/AthleteForm";

const EditMyProfile = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    const [athlete, setAthlete] = useState(null);

    useEffect(() => {
        requestData(`/me/${parseInt(user.id)}`).then((response) => {
            setAthlete(response);
        });
    }, []);

    if (!athlete) return <div>Loading...</div>;

    return (
        <div>
            <Header
                page="Изменить Профиль"
            />
            <AthleteForm athlete={athlete}/>
        </div>
    );
};

export default EditMyProfile;
