import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './Routing';
import AuthRoute from '../AuthRoute';
import Login from '../Pages/Clients/Login';
import UserRegister from '../Components/Clients/Login/Register';

const PublicRoutes = () => {
    const { PUBLIC } = ROUTES;
    return (<Routes>
        <Route path='/' element={<AuthRoute requireAuth={false} />}>
            <Route path={PUBLIC.LOGIN} element={<Login />} />
            <Route path={PUBLIC.SIGN_UP} element={<UserRegister />} />
            <Route path="*" element={<Navigate to={PUBLIC.LOGIN} replace />} />
            <Route path="" element={<Navigate to={PUBLIC.LOGIN} replace />} />
        </Route>
    </Routes>);
}

export default PublicRoutes;