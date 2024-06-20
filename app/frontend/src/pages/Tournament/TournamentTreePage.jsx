import React from 'react';
import Header from "../../components/Header";
import MatchesTree from "../../components/Match/MatchesTree";

const TournamentTreePage = () => {
    return (
        <div>
            <Header page="Дерево Турниров"/>
            <MatchesTree/>
        </div>
    );
};

export default TournamentTreePage;
