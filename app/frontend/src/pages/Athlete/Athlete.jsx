import React from 'react';
import AthleteProfile from '../../components/Athlete/AthleteProfile';
import Header from "../../components/Header";


const Athlete = () => {
    return (
        <div>
            <Header
                page="ПРОФИЛЬ ДЗЮДОИСТА"
            />
            <AthleteProfile />
        </div>
    );
};

export default Athlete;
