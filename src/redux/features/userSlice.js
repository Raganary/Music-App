import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeUser:null,
  liked_songs:[],
  activePass:null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        login: (state, action) => {
            state.activeUser = action.payload;
        },
        logout: (state) => {
            state.activeUser = null;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
