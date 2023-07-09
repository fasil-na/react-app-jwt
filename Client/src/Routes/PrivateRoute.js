import React from 'react';
import { ROUTES } from './Routing';
import AuthRoute from '../AuthRoute';
import { useSelector } from 'react-redux';
import AdminHome from '../Pages/Admin/Home';
import ClientHome from '../Pages/Clients/Home';
import UserProfile from 'Pages/Clients/UserProfile/UserProfile';
import { Navigate, Route, Routes } from 'react-router-dom';
import ClientList from 'Pages/Clients/ClientList/ClientList';
import { NotFound } from 'Pages/NotFound';

const PrivateRoute = () => {
    const { PRIVATE } = ROUTES;
    const { isAdmin, token } = useSelector((state) => state.authState);

    return (<Routes>
        <Route path='/' element={<AuthRoute requireAuth={true} />}>
            <Route index element={<Navigate to={PRIVATE.DASHBOARD} replace />} />
            {isAdmin === 'true' ? (
                <>
                    <Route path={PRIVATE.DASHBOARD} element={<AdminHome />} />
                    <Route path={PRIVATE.ADMIN_ROUTE.CLIENT_LIST} element={<ClientList />} />
                    <Route path={PRIVATE.NOT_FOUND} element={<NotFound />} />
                </>
            ) : (
                <>
                    <Route path={PRIVATE.DASHBOARD} element={<ClientHome />} />
                    <Route path={PRIVATE.USER_ROUTE.USER_PROFILE} element={<UserProfile />} />
                    <Route path={PRIVATE.NOT_FOUND} element={<NotFound />} />
                </>
            )}
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="" element={<Navigate to={PRIVATE.DASHBOARD} replace />} />
    </Routes>);
};

export default PrivateRoute;
