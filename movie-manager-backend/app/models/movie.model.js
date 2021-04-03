import mongoose from 'mongoose';

const Movie = mongoose.model(
    'Movie',
    mongoose.Schema({
        title: String,
        yearReleased: Number,
        rating: String,
    })
);

export default Movie;
