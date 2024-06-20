import React, { useEffect, useState } from 'react';
import { requestData } from '../../services/requests';
import '../../styles/components/MatchesTree.css';
import { useParams } from "react-router-dom";

const MatchTree = () => {
    const { id } = useParams();
    const [matches, setMatches] = useState([]);
    const [athletes, setAthletes] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await requestData(`/matches/tournament/${id}`);
                setMatches(response);

                const athletes_arr = new Set();
                response.forEach(match => {
                    athletes_arr.add(match.athlete1Id);
                    athletes_arr.add(match.athlete2Id);
                });

                const athletePromises = [...athletes_arr].map(athleteId =>
                    requestData(`/athletes/${athleteId}`)
                );

                const athletesResponses = await Promise.all(athletePromises);
                setAthletes(athletesResponses);

            } catch (error) {
                console.error('Error fetching matches or athletes:', error);
            }
        };

        fetchMatches();
    }, [id]);

    const groupMatchesByRound = (matches) => {
        const rounds = {};
        matches.forEach((match) => {
            if (!rounds[match.round]) {
                rounds[match.round] = [];
            }
            rounds[match.round].push(match);
        });
        return rounds;
    };

    const rounds = groupMatchesByRound(matches);
    const roundNumbers = Object.keys(rounds).sort((a, b) => a - b);

    if (athletes.length < 1 || matches.length < 1) return <>Loading...</>;

    const getAthlete = (id) => athletes.find(athlete => athlete.id === id);

    // Calculate the maximum number of matches in any round
    const maxMatches = Math.max(...roundNumbers.map(round => rounds[round].length));

    return (
        <div className="match-tree">
            {roundNumbers.map((round) => {
                const roundMatchCount = rounds[round].length;
                const paddingTop = (maxMatches - roundMatchCount); // Adjust as needed
                return (
                    <div className="round" key={round} style={{ paddingTop: `${paddingTop * 10}%` }}>
                        <div className="matches">
                            {rounds[round].map((match) => {
                                const athlete1 = getAthlete(match.athlete1Id);
                                const athlete2 = getAthlete(match.athlete2Id);
                                return (
                                    <div className="match" key={match.id}>
                                        <div className={`athlete`}>
                                            {athlete1?.name} ({match.athlete1Score})
                                            {match.athleteWon && match.athleteWon === match.athlete1Id ? <i className="fas fa-trophy winner-trophy"></i> : ''}
                                        </div>
                                        <div className="vs">vs</div>
                                        <div className={`athlete`}>
                                            {athlete2?.name} ({match.athlete2Score})
                                            {match.athleteWon && match.athleteWon === match.athlete2Id ? <i className="fas fa-trophy winner-trophy"></i> : ''}
                                        </div>
                                        <div>{match.startAt}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MatchTree;
