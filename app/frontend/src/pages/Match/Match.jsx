import React from 'react';
import Header from "../../components/Header";
import MatchProfile from "../../components/Match/Match";

const Match = () => {
    return (
        <div>
            <Header
                page="МАТЧ"
            />
            <MatchProfile />
        </div>
    );
};

export default Match;
