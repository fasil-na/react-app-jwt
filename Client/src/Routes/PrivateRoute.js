import React from 'react';
import { ROUTES } from './Routing';
import AuthRoute from '../AuthRoute';
import { useSelector } from 'react-redux';
import AdminHome from '../Pages/Admin/Home';
import ClientHome from '../Pages/Clients/Home';
import UserProfile from 'Pages/Clients/UserProfile/UserProfile';
import { Navigate, Route, Routes } from 'react-router-dom';

const PrivateRoute = () => {
    const { PRIVATE } = ROUTES;
    const { isAdmin } = useSelector((state) => state.authState);


    return (<Routes>
        <Route path='/' element={<AuthRoute requireAuth={true} />}>
            <Route index element={<Navigate to={PRIVATE.DASHBOARD} replace />} />
            <Route path={PRIVATE.DASHBOARD} element={isAdmin === 'true' ? <AdminHome /> : <ClientHome />} />
            <Route path={PRIVATE.USER_PROFILE} element={<UserProfile />} />
        </Route>
        <Route path="*" element={<Navigate to={PRIVATE.DASHBOARD} replace />} />
        <Route path="" element={<Navigate to={PRIVATE.DASHBOARD} replace />} />
    </Routes>);
};

export default PrivateRoute;
