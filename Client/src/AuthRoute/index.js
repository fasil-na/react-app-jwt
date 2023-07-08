import { Navigate, Outlet, useLocation } from "react-router-dom";
import { DEFAULT_PAGE, ROUTES } from "../Routes/Routing";
import { useSelector } from "react-redux";

const AuthRoute = (props) => {
    const { PUBLIC } = ROUTES;
    const { requireAuth } = props;

    const token = useSelector((state) => state.authState.token);

    const isLoggedIn = !!token;
    const location = useLocation();

    if (requireAuth) {
        return isLoggedIn ? <Outlet /> : <Navigate to={PUBLIC.LOGIN} state={{ from: location }} replace />;
    } else {
        return isLoggedIn ? <Navigate to={DEFAULT_PAGE} state={{ from: location }} replace /> : <Outlet />;
    }
}

export default AuthRoute;