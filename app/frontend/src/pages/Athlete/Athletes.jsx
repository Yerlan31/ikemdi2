import React from 'react';
import AthleteList from "../../components/Athlete/AthleteList";
import Header from "../../components/Header";

const Athletes = () => {
    return (
        <div>
            <Header
                page="ДЗЮДОИСТЫ"
            />
            <AthleteList />
        </div>
    );
};

export default Athletes;
