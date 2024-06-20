import React from 'react';
import Header from "../../components/Header";
import TournamentProfile from "../../components/Tournament/TournamentProfile";

const Tournament = () => {
    return (
        <div>
            <Header
                page="Турнир"
            />
            <TournamentProfile />
        </div>
    );
};

export default Tournament;
