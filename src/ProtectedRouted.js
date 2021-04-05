import React, { useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router';
import CreateMovie from './components/Movie/CreateMovie';
import EditMovie from './components/Movie/EditMovie';
import { useAuthContext } from './shared/context/AuthProvider';

const ROUTES = {
    EDITMOVIE: '/movie/edit/:id',
    CREATEMOVIE: '/movie/create',
};

const ProtectedRouted = () => {
    const [status, setStatus] = useState('initial');
    const [{ user }] = useAuthContext();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            history.replace(`/login?returnurl=${location.pathname}`);
        }
        setStatus('success');
    }, [user, history, location.pathname]);

    if (status !== 'success') {
        return <div>Loading</div>;
    }
    return (
        <>
            <Route exact path={ROUTES.EDITMOVIE}>
                <EditMovie />
            </Route>
            <Route exact path={ROUTES.CREATEMOVIE}>
                <CreateMovie />
            </Route>
        </>
    );
};

ProtectedRouted.routes = Object.values(ROUTES);

export default ProtectedRouted;
