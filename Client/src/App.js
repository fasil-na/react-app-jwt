import React, { useState, useEffect } from 'react';
import PublicRoutes from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from './container/auth.slice';
import { API_URL } from 'config/endpoints';
import { get } from './config';

function App() {
  const dispatch = useDispatch();
  const { isAdmin, token } = useSelector((state) => state.authState);
  const [loading, setLoading] = useState(true);
  const [authCompleted, setAuthCompleted] = useState(false);

  // Fetch profile details and set isAdmin value in local storage
  const fetchProfileDetails = async () => {
    try {
      const response = await get(API_URL.PROFILE_LIST);
      return response?.isAdmin?.toString();
    } catch (error) {
      console.log('error', error);
      return null;
    }
  };

  const loadTokenFromLocalStorage = async () => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    if (token) {
      let isAdminValue = isAdmin;

      if (
        isAdmin === null ||
        isAdmin === undefined ||
        isAdmin === 'null' ||
        isAdmin === 'undefined'
      ) {
        isAdminValue = await fetchProfileDetails();
        localStorage.setItem('isAdmin', isAdminValue);
      }

      dispatch(authAction.setLogin({
        token,
        isAdmin: isAdminValue,
      }));
    }

    setAuthCompleted(true); // Set authCompleted to true once the authentication process is complete
  };

  useEffect(() => {
    loadTokenFromLocalStorage();
  }, []);

  useEffect(() => {
    if (authCompleted) {
      setLoading(false); // Set loading to false once authCompleted is true
    }
  }, [authCompleted]);

  if (loading) {
    // Display a loading component while authentication is in progress
    return <div>Loading...</div>;
  }

  return (
    <>
      {token && isAdmin !== null ? (
        <PrivateRoute />
      ) : (
        <PublicRoutes />
      )}
    </>
  );
}

export default App;
