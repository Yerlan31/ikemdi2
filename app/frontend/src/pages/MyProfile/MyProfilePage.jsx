import React from 'react';
import Header from "../../components/Header";
import MyProfile from "../../components/MyProfile/MyProfile";

const MyProfilePage = () => {
    return (
        <div>
            <Header
                page="Мой Профиль"
            />
            <MyProfile />
        </div>
    );
};

export default MyProfilePage;
