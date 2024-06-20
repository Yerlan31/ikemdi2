import React, {useState, useEffect} from 'react';
import {requestData} from '../../services/requests';
import AthleteCard from '../Athlete/AthleteCard';
import {useNavigate, useParams} from "react-router-dom";
import "../../styles/components/AthleteList.css";

const ParticipantList = () => {
    const {id} = useParams();
    const [athletes, setAthletes] = useState([]);
    const history = useNavigate();
    useEffect(() => {
        requestData(`matches/tournament/${parseInt(id)}`).then((response) => {
            const athletes_arr = [];
            for (let match in response) {
                athletes_arr.push(response[0].athlete1Id);
                athletes_arr.push(response[0].athlete2Id);
            }
            const athletes_set = new Set(athletes_arr);
            for (let athlete of athletes_set) {
                requestData(`/athletes/${athlete}`).then(res => setAthletes(prevState => {
                    return [...prevState, res]
                }));
            }
        });
    }, []);

    const handleClickAthleteCard = (id) => {
        history(`/athletes/${id}`);
    }

    if (athletes.length < 1) return <>Loading...</>

    return (
        <div className="athlete-list">
            {athletes.map((athlete) => (
                <AthleteCard key={athlete.id} athlete={athlete} handler={handleClickAthleteCard}/>
            ))}
        </div>
    );
};

export default ParticipantList;
