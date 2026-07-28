// PrivateRoute.jsx is a route guard component: it renders its children only
// if the user is signed in (per auth-helper.js), otherwise it redirects to
// /signin and remembers where the user was trying to go.
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import auth from './auth-helper';
const PrivateRoute = ({ children, ...rest }) => {
    const location = useLocation();

    return auth.isAuthenticated() ? (
        children
    ) : (
        // state={{ from: location }} lets the signin page redirect back
        // here after a successful login.
        <Navigate
            to="/signin"
            state={{ from: location }}
            replace
        />
    );
};
export default PrivateRoute;
