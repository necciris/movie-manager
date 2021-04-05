import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import { Lock, Person } from '@material-ui/icons';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import InputPassword from '../../shared/components/Input/InputPassword';
import AuthService from '../../shared/services/auth.service';
import { useAuthContext } from '../../shared/context/AuthProvider';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    login__logo: {
        margin: '20px auto',
        objectFit: 'contain',
        width: 200,
    },
    login__container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    grid: {
        marginBottom: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyle();
    const history = useHistory();
    const location = useLocation();
    const [{ user }, dispatch] = useAuthContext();
    const params = new URLSearchParams(location.search); // ?returnurl=/asd

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (user) {
        history.push('/');
    }

    const signIn = (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            alert('Plese enter username and password ');
            return;
        }
        AuthService.login(username, password)
            .then((data) => {
                dispatch({
                    type: 'SET_USER',
                    user: data,
                });
                history.push(params.get('returnurl') || '/');
            })
            .catch((error) => alert(error));
    };

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.login__container}>
                <Typography component='h1' variant='h3'>
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2} alignItems='flex-end' className={classes.grid}>
                        <Grid item xs={1}>
                            <Person />
                        </Grid>
                        <Grid item xs={11}>
                            <TextField
                                id='username'
                                label='Username'
                                margin='normal'
                                name='username'
                                autoComplete='email'
                                autoFocus
                                fullWidth
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Lock />
                        </Grid>
                        <Grid item xs={11}>
                            <InputPassword onChange={(e) => setPassword(e.target.value)} value={password} required={true} />
                        </Grid>
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='secondary' className={classes.submit} onClick={signIn}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to='/signup' variant='body2'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;
