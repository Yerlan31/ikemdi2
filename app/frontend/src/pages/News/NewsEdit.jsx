import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import {useNavigate, useParams} from "react-router-dom";
import NewsForm from "../../components/News/NewsForm";
import {requestData} from "../../services/requests";

const NewsEdit = () => {
    const {id} = useParams();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const history = useNavigate();
    const [news, setNews] = useState(null);

    useEffect(() => {
        requestData(`/news/${parseInt(id)}`).then((response) => {
            setNews(response);
        });
    }, []);

    if (!news) return <div>Loading...</div>;



    if (!user || user?.role !== 'admin') {
        history('/');
    }

    return (
        <div>
            <Header
                page="РЕДАКТИРОВАТЬ НОВОСТИ"
            />
            <NewsForm newsItem={news} />
        </div>
    );
};

export default NewsEdit;
