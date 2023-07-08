import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    token: '',
    isAdmin: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        setLogin(state, action) {
            state.token = action.payload.token;
            state.isAdmin = action.payload.isAdmin
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('isAdmin', action.payload.isAdmin);
        },
        setLogout(state, action) {
            state.token = '';
            state.isAdmin = undefined
            localStorage.clear();
        },
    }
});

export const authAction = authSlice.actions;

export default authSlice.reducer;