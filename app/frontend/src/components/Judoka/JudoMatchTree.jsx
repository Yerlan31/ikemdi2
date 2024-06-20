// components/JudoMatchTree.js
import React, {useEffect, useState} from 'react';
import '../../styles/components/JudoMatchTree.css';
import {requestData} from "../../services/requests";
import Loading from "../Loading";

const TournamentBracket = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const getGames = async (endpoint) => {
        try {
            const response = await requestData(endpoint);
            setMatches(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGames('/matches');
    }, []);

    if (loading) {
        return <Loading />;
    }

    const getMatchById = (id) => matches.find(match => match.id === id);

    const renderMatch = (match, level = 0) => {
        if (!match) return null;

        const {athlete1, athlete2, athlete1Score, athlete2Score, inProgress, nextMatchId} = match;
        const nextMatch = getMatchById(nextMatchId);

        return (
            <div className="match" key={match.id} style={{marginLeft: level * 20}}>
                <div className="match-info">
                    <div className="athlete">
                        {athlete1 ? `${athlete1.name} (Score: ${athlete1Score})` : 'TBD'}
                    </div>
                    <div className="athlete">
                        {athlete2 ? `${athlete2.name} (Score: ${athlete2Score})` : 'TBD'}
                    </div>
                    <div className={`status ${inProgress ? 'in-progress' : 'completed'}`}>
                        {inProgress ? 'In Progress' : 'Completed'}
                    </div>
                </div>
                {nextMatch && (
                    <div className="next-match">
                        {renderMatch(nextMatch, level + 1)}
                    </div>
                )}
            </div>
        );
    };

    const initialMatches = matches.filter(match => !match.nextMatchId);

    return (
        <div className="tournament-bracket">
            {initialMatches.map(match => renderMatch(match))}
        </div>
    );
};

export default TournamentBracket;

