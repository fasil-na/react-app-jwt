import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    category: '',
}

const categorySlice = createSlice({
    name: 'category',
    initialState: INITIAL_STATE,
    reducers: {
        setCategory(state, action) {
           state.category = action.payload;
        },
    }
});

export const categoryAction = categorySlice.actions;

export default categorySlice.reducer;