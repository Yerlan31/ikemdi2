import React from 'react';
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";
import MatchForm from "../../components/Match/MatchForm";

const MatchCreate = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const history = useNavigate();
    if (!user || user?.role !== 'admin') {
        history('/');
    }

    return (
        <div>
            <Header
                page="СОЗДАТЬ МАТЧА"
            />
            <MatchForm/>
        </div>
    );
};

export default MatchCreate;
