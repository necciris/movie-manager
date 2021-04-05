import {
    Button,
    Container,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    withStyles,
} from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../shared/context/AuthProvider';
import MoviesService from '../../shared/services/movie-service';
import MovieTableRow from './MovieTableRow/MovieTableRow';

const useStyle = makeStyles((theme) => ({
    Container: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
    },
    create__button: {
        marginBottom: theme.spacing(2),
        textAlign: 'right',
    },
    table: {
        minWidth: 650,
    },
}));

const Home = () => {
    const classes = useStyle();
    const [movies, setMovies] = useState([]);
    const [{ user }] = useAuthContext();

    console.log(user);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await MoviesService.getMovies();
            setMovies(data);
        };

        fetchData();
    }, []);

    const handleDelete = (id) => {
        MoviesService.deleteMovie(id)
            .then(() => {
                const newMovies = movies.filter((movie) => movie._id !== id);
                setMovies(newMovies);
            })
            .catch((err) => alert(err));
    };

    const TableHeaderCell = withStyles((theme) => ({
        root: {
            fontWeight: 600,
        },
    }))(TableCell);

    const tableBodyContent =
        movies.length > 0 ? (
            <>
                {movies?.map((movie) => (
                    <MovieTableRow key={movie._id} movie={movie} handleDelete={handleDelete} user={user} />
                ))}
            </>
        ) : (
            <TableRow>
                <TableCell>No Data</TableCell>
            </TableRow>
        );

    return (
        <Container className={classes.Container}>
            <Typography variant='h3' gutterBottom>
                Movies List
            </Typography>
            <Button variant='contained' color='primary' className={classes.create__button} component={Link} to='/movie/create'>
                Create Movies
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell align='left'>Title</TableHeaderCell>
                            <TableHeaderCell align='left'>Year Released</TableHeaderCell>
                            <TableHeaderCell align='left'>Rating</TableHeaderCell>
                            {user && <TableHeaderCell align='Right'></TableHeaderCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>{tableBodyContent}</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Home;
