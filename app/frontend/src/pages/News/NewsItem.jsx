import React from 'react';
import Header from "../../components/Header";
import NewsProfile from "../../components/News/NewsProfile";

const NewsItem = () => {
    return (
        <div>
            <Header
                page="НОВОСТИ"
            />
            <NewsProfile />
        </div>
    );
};

export default NewsItem;
