import React, { useState, useEffect } from 'react';
import { requestData } from '../../services/requests';
import { useNavigate } from "react-router-dom";
import "../../styles/components/AthleteList.css";
import NewsCard from "./NewsCard";

const NewsList = () => {
    const [news, setNews] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        requestData('/news').then((response) => {
            setNews(response);
        });
    }, []);

    const handleClickNewsCard = (id) => {
        history(`/news/${id}`);
    }

    if (!news) return <div>Loading...</div>;

    return (
        <div className="athlete-list">
            {news.map((news_item) => (
                <NewsCard key={news_item.id} news={news_item} handler={handleClickNewsCard} />
            ))}
        </div>
    );
};

export default NewsList;
