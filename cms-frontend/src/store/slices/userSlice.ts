import { createSlice } from "@reduxjs/toolkit";

// export const getProfile = createAsyncThunk('user/getProfile', async () => {
//   const response = await Client.get('/profile');
//   return response;
// });

const initialState = {
  profile: null,
  isLoggedIn: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {},
});

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;

// Extract and export each action creator by name
export const { login, logout } = actions;
// Export the reducer, either as a default or named export
export default reducer;
