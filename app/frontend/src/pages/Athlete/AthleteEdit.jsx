import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import AthleteForm from "../../components/Athlete/AthleteForm";
import {requestData} from "../../services/requests";

const AthleteEdit = () => {
    const {id} = useParams();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const history = useNavigate();
    const [athlete, setAthlete] = useState();
    if (!user || user?.role !== 'admin') {
        history('/');
    }

    useEffect(() => {
        requestData(`/athletes/${parseInt(id)}`).then(res => {
            requestData(`/me/${parseInt(res.userId)}`).then(res => {
                setAthlete(res);
            })
        });
    }, []);

    if (!athlete) return <>Loading....</>
    return (
        <div>
            <Header
                page="СОЗДАТЬ ДЗЮДОИСТА"
            />
            <AthleteForm athlete={athlete}/>
        </div>
    );
};

export default AthleteEdit;
