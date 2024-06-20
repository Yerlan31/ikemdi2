import React from 'react';
import '../../styles/components/MatchHeader.css';
import {useNavigate, useParams} from "react-router-dom";

const MatchHeader = () => {
    const history = useNavigate();
    const {id} = useParams();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    return (
        <div className="match-header">
            <div className="header-buttons">
                <button onClick={() => history(`/tournament/info/${id}`)} className="btn create-match-btn">Информация о Турнире</button>
                {user?.role === 'admin' && <button onClick={() => history(`/match/create/${id}`)} className="btn create-match-btn">Создать Матч</button>}
                <button onClick={() => history(`/tournament/participant/${id}`)} className="btn view-participants-btn">Участники</button>
                <button onClick={() => history(`/tournament/tree/${id}`)} className="btn view-participants-btn">Дерево</button>
            </div>
        </div>
    );
};

export default MatchHeader;
