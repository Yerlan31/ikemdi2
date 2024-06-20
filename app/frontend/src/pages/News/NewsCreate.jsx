import React from 'react';
import Header from "../../components/Header";
import {useNavigate} from "react-router-dom";
import NewsForm from "../../components/News/NewsForm";

const NewsCreate = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const history = useNavigate();
    if (!user || user?.role !== 'admin') {
        history('/');
    }

    return (
        <div>
            <Header
                page="СОЗДАТЬ НОВОСТИ"
            />
            <NewsForm/>
        </div>
    );
};

export default NewsCreate;
