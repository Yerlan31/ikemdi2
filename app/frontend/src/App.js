import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Auth/Login';
import './styles/app.css';
import Athlete from "./pages/Athlete/Athlete";
import Athletes from "./pages/Athlete/Athletes";
import NewsItem from "./pages/News/NewsItem";
import News from "./pages/News/News";
import NewsCreate from "./pages/News/NewsCreate";
import AthleteCreate from "./pages/Athlete/AthleteCreate";
import MyProfilePage from "./pages/MyProfile/MyProfilePage";
import EditMyProfile from "./pages/MyProfile/EditMyProifle";
import NewsEdit from "./pages/News/NewsEdit";
import Tournaments from "./pages/Tournament/Tournaments";
import TournamentCreate from "./pages/Tournament/TournamentCreate";
import TournamentEdit from "./pages/Tournament/TournamentEdit";
import MatchList from "./components/Match/MatchesList";
import Matches from "./pages/Match/Matches";
import Match from "./pages/Match/Match";
import MatchCreate from "./pages/Match/MatchCreate";
import Tournament from "./pages/Tournament/Tournament";
import MatchEdit from "./pages/Match/MatchEdit";
import AthleteEdit from "./pages/Athlete/AthleteEdit";
import TournamentParticipant from "./pages/Tournament/TournamentParticipant";
import TournamentTreePage from "./pages/Tournament/TournamentTreePage";

function App() {
  return (
    <Routes>
      <Route path="match/:id" element={ <Match /> } />
      <Route path="/matches" element={ <MatchList /> } />
      <Route path="/match/create/:id" element={ <MatchCreate /> } />
      <Route path="/match/edit/:id" element={ <MatchEdit /> } />

      <Route path="/leaderboard" element={ <Leaderboard /> } />

      <Route path="/my/profile" element={ <MyProfilePage /> } />
      <Route path="/profile/edit" element={ <EditMyProfile /> } />


      <Route path="/news" element={<News />} />
      <Route path="/news/create" element={<NewsCreate />} />
      <Route path="/news/edit/:id" element={<NewsEdit />} />
      <Route path="/news/:id" element={<NewsItem />} />

      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/tournaments/:id" element={<Tournaments />} />
      <Route path="/tournament/create" element={<TournamentCreate />} />
      <Route path="/tournament/edit/:id" element={<TournamentEdit />} />
      <Route path="/tournament/:id" element={<Matches />} />
      <Route path="/tournament/info/:id" element={<Tournament />} />
      <Route path="/tournament/participant/:id" element={<TournamentParticipant />} />
      <Route path="/tournament/tree/:id" element={<TournamentTreePage />} />

      <Route path="/athelete/create" element={<AthleteCreate />} />
      <Route path="/athletes" exact element={<Athletes/>} />
      <Route path="/athletes/edit/:id"  element={<AthleteEdit />} />
      <Route path="/athletes/:id" element={<Athlete/>} />

      <Route path="/login" element={ <Login /> } />

      <Route exact path="/" element={ <Navigate to="/leaderboard" /> } />
    </Routes>
  );
}

export default App;
