import { createMovie, getMovies, updateMovie, deleteMovie } from '../controllers/movie.controller.js';
import authJwt from '../middleware/authJwt.js';

const movieRoutes = function (app) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
        next();
    });

    app.get('/api/movies', getMovies);

    app.post('/api/movies', [authJwt.verifyToken], createMovie);

    app.put('/api/movies/:id', [authJwt.verifyToken], updateMovie);

    app.delete('/api/movies/:id', [authJwt.verifyToken], deleteMovie);
};

export default movieRoutes;
