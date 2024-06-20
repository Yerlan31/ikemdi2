import React from 'react';
import Header from "../../components/Header";
import MatchList from "../../components/Match/MatchesList";
import MatchHeader from "../../components/Match/MatchHeader";

const Matches = () => {
    return (
        <div>
            <Header
                page="МАЧТЫ"
            />
            <MatchHeader/>
            <MatchList />
        </div>
    );
};

export default Matches;
