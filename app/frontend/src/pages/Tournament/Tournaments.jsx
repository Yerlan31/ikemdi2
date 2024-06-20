import React from 'react';
import Header from "../../components/Header";
import TournamentsList from "../../components/Tournament/TournamentsList";

const Tournaments = () => {
    return (
        <div>
            <Header page="Турниры"/>
            <TournamentsList/>
        </div>
    );
};

export default Tournaments;
