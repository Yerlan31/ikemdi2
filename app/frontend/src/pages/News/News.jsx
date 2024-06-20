import React from 'react';
import Header from "../../components/Header";
import NewsList from "../../components/News/NewsList";

const News = () => {
    return (
        <div>
            <Header
                page="НОВОСТИ"
            />
            <NewsList />
        </div>
    );
};

export default News;
