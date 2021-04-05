import { AppBar, Button, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuthContext } from '../../shared/context/AuthProvider';
import authService from '../../shared/services/auth.service';

const useStyle = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}));

const Header = () => {
    const classes = useStyle();
    const [{ user }, dispatch] = useAuthContext();
    const history = useHistory();

    const handleAuthentication = () => {
        if (user) {
            authService.logout();
            dispatch({
                type: 'SET_USER',
                user: null,
            });
            history.push('/');
        }
    };

    return (
        <AppBar position='sticky' color='primary' className={classes.header}>
            <Container className={classes.container}>
                <Button component={Link} to='/' color='inherit'>
                    <Typography variant='subtitle1'>Movies Manager</Typography>
                </Button>
                <Button component={Link} to={!user && '/login'} color='inherit'>
                    <Typography variant='subtitle1' onClick={handleAuthentication}>
                        {user ? `${user.username} Sign Out` : 'Sign In'}
                    </Typography>
                </Button>
            </Container>
        </AppBar>
    );
};

export default Header;
