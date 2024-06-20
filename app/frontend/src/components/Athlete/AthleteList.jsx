import React, { useState, useEffect } from 'react';
import { getAllAthletes } from '../../services/requests';
import AthleteCard from './AthleteCard';
import { useNavigate } from "react-router-dom";
import "../../styles/components/AthleteList.css";

const AthleteList = () => {
    const [athletes, setAthletes] = useState([]);
    const history = useNavigate();
    useEffect(() => {
        getAllAthletes().then((response) => {
            setAthletes(response.data);
        });
    }, []);

    const handleClickAthleteCard = (id) => {
        history(`/athletes/${id}`);
    }

    return (
        <div className="athlete-list">
            {athletes.map((athlete) => (
                <AthleteCard key={athlete.id} athlete={athlete} handler={handleClickAthleteCard} />
            ))}
        </div>
    );
};

export default AthleteList;
