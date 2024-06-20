import React from 'react';
import '../../styles/components/NewsCard.css';

const NewsCard = ({ news, handler }) => {
    return (
        <div className="athlete-card" onClick={() => handler(news.id)}>
            <div className="athlete-img-container">
                <img src={news.imageUrl} alt={news.title} />
            </div>
            <h3>{news.title}</h3>
            <p>{news.content?.substring(0, 25)}<br/>{news.content?.substring(25, 50)}...</p>
        </div>
    );
};

export default NewsCard;
