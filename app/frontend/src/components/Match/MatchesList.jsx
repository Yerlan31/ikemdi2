import React, { useState, useEffect } from 'react';
import MatchCard from './MatchCard';
import '../../styles/components/MatchList.css';
import { requestData } from "../../services/requests";
import { useParams } from "react-router-dom";

const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await requestData(`/matches/tournament/${parseInt(id)}`);
                setMatches(response);
            } catch (error) {
                console.log('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, [id]);

    return (
        <div className="match-list">
            {matches?.map((match) => (
                <MatchCard key={match.id} match={match} />
            ))}
        </div>
    );
};

export default MatchList;
