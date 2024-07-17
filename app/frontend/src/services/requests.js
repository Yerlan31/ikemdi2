import axios from 'axios';

const api = axios.create({
  baseURL: `http://91.147.92.130:3001`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
  api.defaults.withCredentials = false;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};


export const getAllAthletes = () => {
  return api.get('/athletes');
};

export const getAthleteById = (id) => {
  return api.get(`/athletes/${id}`);
};

export const createAthlete = (athlete) => {
  return api.post('/athletes', athlete);
};

export const createNews = (news) => {
  return api.post('/news', news);
};

export const updateNews = (id, news) => {
  return api.patch(`/news/${id}`, news);
};

export const createMatch = (match) => {
  return api.post('/match', match);
};

export const updateMatch = (id, match) => {
  return api.patch(`/match/${id}`, match);
};

export const createTournament = (tournament) => {
  return api.post('/tournament', tournament);
};

export const updateTournament= (id, tournament) => {
  return api.patch(`/tournament/${id}`, tournament);
};

export const updateAthlete = (id, athlete) => {
  return api.patch(`/athletes/${id}`, athlete);
};

export const deleteAthlete = (id) => {
  return api.delete(`/athletes/${id}`);
};


export default api;
