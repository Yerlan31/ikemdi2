import React, { useState, useEffect } from 'react';
import {requestData} from '../../services/requests';
import {useNavigate, useParams} from 'react-router-dom';
import '../../styles/components/NewsProfile.css';

const NewsProfile = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    const history  = useNavigate();

    useEffect(() => {
        requestData(`/news/${parseInt(id)}`).then((response) => {
            setNews(response);
        });
    }, [id]);

    if (!news) return <div>Loading...</div>;

    return (
        <div className="athlete-profile">
            <img src={news.imageUrl} alt={news.title} />
            <h2>{news.title}</h2>
            <p>{news.content}</p>
            {user.role === 'admin' && <button type="submit" className="edit-button"  data-testid="header__show_matches_btn" onClick={() => history(`/news/edit/${news.id}`)}>
                Изменить
            </button>}
        </div>
    );
};

export default NewsProfile;
