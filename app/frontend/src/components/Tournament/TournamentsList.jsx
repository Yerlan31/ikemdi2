import React, { useState, useEffect } from 'react';
import { requestData } from '../../services/requests';
import {useNavigate, useParams} from "react-router-dom";
import "../../styles/components/AthleteList.css";
import TournamentCard from "./TournamentCard";

const TournamentsList = () => {
    const [tournament, setTournament] = useState([]);
    const history = useNavigate();
    const { id} = useParams();

    useEffect(() => {
        if (id) {
            requestData(`/tournaments/${parseInt(id)}`).then((response) => {
                setTournament(response);
            });
        } else {
            requestData('/tournaments').then((response) => {
                setTournament(response);
            });
        }
    }, [id]);

    const handleClickNewsCard = (id) => {
        history(`/tournament/${id}`);
    }

    if (!tournament) return <div>Loading...</div>;

    return (
        <div className="athlete-list">
            {tournament.map((tournament_item) => (
                <TournamentCard key={tournament_item.id} tournament={tournament_item} handler={handleClickNewsCard} />
            ))}
        </div>
    );
};

export default TournamentsList;
