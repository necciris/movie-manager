import React, { useContext, useEffect, useReducer } from 'react';
import AuthReducer, { AuthInitialState } from '../reducer/AuthReducer';
import authService from '../services/auth.service';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, AuthInitialState);

    useEffect(() => {
        if (authService.getCurrentUser()) {
            dispatch({
                type: 'SET_USER',
                user: authService.getCurrentUser(),
            });
        }
    }, []);

    return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
