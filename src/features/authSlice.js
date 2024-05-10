import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userToken: null,
    loading: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.userToken = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
   
  },
});

export const { setToken,setLoading } = authSlice.actions;

export const selectUserToken = (state) => state.auth.userToken;
export const selectLoading = (state) => state.auth.loading;

export default authSlice.reducer;
