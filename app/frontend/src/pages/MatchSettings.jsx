import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import CreateNewMatch from '../components/Game/CreateNewGame';
import EditMatch from '../components/Game/EditGame';
import Header from '../components/Header';
import Loading from '../components/Loading';
import api, {requestData, setToken} from '../services/requests';
import '../styles/pages/matchSettings.css';
import NewsBtn from "../components/News/NewsBtn";
import AthleteBtn from "../components/Athlete/AthleteBtn";
import NewsCreateBtn from "../components/News/NewsCreateBtn";

const MatchSettings = () => {
    const [judoka, setJudoka] = useState([]);
    const [homeJudokaScore, setHomeJudokaScore] = useState('0');
    const [awayJudokaScore, setAwayJudokaScore] = useState('0');
    const [homeJudoka, setHomeJudoka] = useState('');
    const [awayJudoka, setAwayJudoka] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const storage = JSON.parse(localStorage.getItem('user'));

            if (!storage) return navigate('/');

            const {token} = storage;

            setToken(token);
            api.get('/login/validate')
                .then(() => setIsAuthenticated(true))
                .catch(() => navigate('/'));
        })();
    }, [navigate]);

    useEffect(() => {
        const endpoint = '/judoka';

        const {token} = JSON.parse(localStorage.getItem('user')) || {token: ''};
        if (token !== '') {
            setToken(token);
        }
        if (!judoka.length) {
            requestData(endpoint)
                .then((response) => {
                    setJudoka(response);
                })
                .catch((error) => console.log(error));
        }
    });

    const getJudoka = (judokaName, homeOrAway) => {
        const {id} = judoka.find(({name}) => name === judokaName);
        if (homeOrAway === 'homeJudoka') {
            setHomeJudoka(id);
        } else {
            setAwayJudoka(id);
        }
    };

    const createMatch = async (inProgress) => {
        const body = {
            homeJudoka: +homeJudoka,
            awayJudoka: +awayJudoka,
            homeJudokaScore: +homeJudokaScore,
            awayJudokaScore: +awayJudokaScore,
            inProgress,
        };

        const {data} = await api.post('/matches', body);
        return data;
    };

    const updateMatch = async (id, updateScores) => {
        await api.patch(`/matches/${id}`, {...updateScores});
    };

    const finishMatch = async (id) => {
        await api.patch(`/matches/${id}/finish`);
    };

    if (!isAuthenticated) return <Loading/>;

    if (location.state) {
        const {
            id,
            judokaHome: homeJudokaState,
            homeJudokaScore,
            judokaAway: awayJudokaState,
            awayJudokaScore,
        } = location.state;
        return (
            <>
                <Header
                    page="РЕДАКТИРОВАТЬ МАТЧ"
                    FirstNavigationLink={MatchesBtn}
                    ThirdNavigationLink={NewsBtn}
                    FourthNavigationLink={AthleteBtn}
                    FiveNavigationLink={user?.role === 'admin' ? NewsCreateBtn : undefined}
                    logged={isAuthenticated}
                    setLogin={setIsAuthenticated}
                />
                <EditMatch
                    homeJudoka={[homeJudokaState]}
                    awayJudoka={[awayJudokaState]}
                    homeJudokaScore={homeJudokaScore}
                    awayJudokaScore={awayJudokaScore}
                    idMatch={id}
                    updateMatch={updateMatch}
                    finishMatch={finishMatch}
                    getJudoka={getJudoka}
                />
            </>
        );
    }

    return (
        <>
            <Header
                page="ДОБАВИТЬ МАТЧ"
            />
            <CreateNewMatch
                setHomeJudokaScore={setHomeJudokaScore}
                setAwayJudokaScore={setAwayJudokaScore}
                judoka={judoka}
                getJudoka={getJudoka}
                createMatch={createMatch}
                finishMatch={finishMatch}
            />
        </>
    );
};

export default MatchSettings;
