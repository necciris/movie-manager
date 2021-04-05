import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/movies';

const getMovies = () => {
    return axios.get(API_URL);
};

const getMoviesById = (id) => {
    return axios.get(API_URL + `/${id}`);
};

const createMovie = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
};

const editMovie = (id, data) => {
    return axios.put(API_URL + `/${id}`, data, {
        headers: authHeader(),
    });
};

const deleteMovie = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
};

const MoviesService = {
    getMovies,
    getMoviesById,
    createMovie,
    editMovie,
    deleteMovie,
};

export default MoviesService;
