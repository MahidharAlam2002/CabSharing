import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    var auth =false; // determine if authorized, from context or however you're doing it
    if(sessionStorage.getItem('sometoken')){
        auth =true;
    }
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;