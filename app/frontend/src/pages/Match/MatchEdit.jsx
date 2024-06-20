import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";
import {requestData} from "../../services/requests";
import MatchForm from "../../components/Match/MatchForm";

const MatchEdit = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const history = useNavigate();
    const [match, setMatch] = useState(null);

    useEffect(() => {
        requestData(`/match/${parseInt(user.id)}`).then((response) => {
            setMatch(response);
        });
    }, []);

    if (!match) return <div>Loading...</div>;



    if (!user || user?.role !== 'admin') {
        history('/');
    }


    return (
        <div>
            <Header
                page="РЕДАКТИРОВАТЬ МАТЧА"
            />
            <MatchForm match={match} />
        </div>
    );
};

export default MatchEdit;
