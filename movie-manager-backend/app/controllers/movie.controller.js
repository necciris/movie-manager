import Movie from '../models/movie.model.js';

export const getMovies = (req, res) => {
    Movie.find((err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(data);
    });
};

export const getMoviesById = (req, res) => {
    const id = req.params.id;

    Movie.findById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(data);
    });
};

export const createMovie = (req, res) => {
    const movie = req.body;

    Movie.create(movie, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(data);
    });
};

export const updateMovie = async (req, res) => {
    const movie = req.body;
    const id = req.params.id;

    Movie.findByIdAndUpdate(id, { ...movie }, { new: true }, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(data);
    });
};

export const deleteMovie = async (req, res) => {
    const id = req.params.id;

    Movie.findByIdAndDelete(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send({ message: 'delete successfully' });
    });
};
