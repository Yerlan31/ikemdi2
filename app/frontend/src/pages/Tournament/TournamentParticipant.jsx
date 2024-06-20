import React from 'react';
import Header from "../../components/Header";
import ParticipantList from "../../components/Match/ParticipantList";

const TournamentParticipant = () => {
    return (
        <div>
            <Header page="Участники Турнира"/>
            <ParticipantList/>
        </div>
    );
};

export default TournamentParticipant;
