import { Button, Container, makeStyles, MenuItem, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import MoviesService from '../../shared/services/movie-service';
import { Ratings } from '../../util/constants';

const useStyle = makeStyles((theme) => ({
    Container: {
        marginTop: theme.spacing(3),
        // textAlign: 'center',
    },
    form: {
        margin: theme.spacing(2),
    },
    margin: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const EditMovie = () => {
    const classes = useStyle();
    const history = useHistory();
    const [movie, setMovie] = useState({
        title: '',
        yearReleased: '',
        rating: '',
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    data: { title, yearReleased, rating },
                } = await MoviesService.getMoviesById(id);
                setMovie({
                    title: title,
                    yearReleased: yearReleased,
                    rating: rating,
                });
            } catch (error) {
                alert(error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async () => {
        try {
            await MoviesService.editMovie(id, movie);
            history.push('/');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Container className={classes.Container}>
            <Typography variant='h3' gutterBottom>
                Edit Movie
            </Typography>
            <form className={classes.form}>
                <TextField
                    className={classes.margin}
                    required
                    fullWidth
                    id='title'
                    label='Title'
                    value={movie.title}
                    onChange={(e) => setMovie({ ...movie, title: e.target.value })}
                />

                <TextField
                    className={classes.margin}
                    required
                    fullWidth
                    id='yearReleased'
                    label='Year Released'
                    type='number'
                    value={movie.yearReleased}
                    onChange={(e) => setMovie({ ...movie, yearReleased: e.target.value })}
                />
                <TextField
                    className={classes.margin}
                    required
                    fullWidth
                    id='rating'
                    select
                    label='Select'
                    value={movie.rating}
                    onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
                    helperText='Please select rating'
                >
                    {Ratings.map((rating, idx) => (
                        <MenuItem key={idx} value={rating}>
                            {rating}
                        </MenuItem>
                    ))}
                </TextField>
            </form>
            <Button variant='contained' color='primary' onClick={handleSubmit}>
                Submit
            </Button>
            <Button variant='contained' color='default' onClick={() => history.push('/')}>
                Back
            </Button>
        </Container>
    );
};

export default EditMovie;
