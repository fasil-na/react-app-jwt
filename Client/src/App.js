
import React from 'react';
import PublicRoutes from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from './container/auth.slice';


function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authState);

  const loadTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    if (token) {
      const payloadVal = {
        token,
        isAdmin
      }
      dispatch(authAction.setLogin(payloadVal));
    }
  };

  loadTokenFromLocalStorage();

  return (
    <>
      {token ?
        (<PrivateRoute />) : (<PublicRoutes />)}
    </>
  );
}

export default App;



