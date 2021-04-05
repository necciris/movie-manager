import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROLES } from '../../../util/constants';

const MovieTableRow = ({ user, movie, handleDelete }) => {
    return (
        <TableRow key={movie._id}>
            <TableCell align='left'>{movie.title}</TableCell>
            <TableCell align='left'>{movie.yearReleased}</TableCell>
            <TableCell align='left'>{movie.rating}</TableCell>
            {user && (
                <TableCell align='Right'>
                    <IconButton component={Link} to={`/movie/edit/${movie._id}`}>
                        <Edit />
                    </IconButton>
                    {user.roles.includes(ROLES.MANAGER) && (
                        <IconButton onClick={() => handleDelete(movie._id)}>
                            <Delete color='error' />
                        </IconButton>
                    )}
                </TableCell>
            )}
        </TableRow>
    );
};

export default MovieTableRow;
