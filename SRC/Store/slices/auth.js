import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  fcmToken: null,
  isVerified: false,
  userWalkThrough: false,
  isGoalCreated: false,
  isMileage: false,
  checkin :false
};

const AuthSlice = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setUserToken(state, action) {
      state.token = action?.payload?.token;
    },

    SetFCMToken(state, action) {
      state.fcmToken = action?.payload?.fcmToken;
    },
    setUserLogin(state, action) {
      state.token = action?.payload;
    },
    setUserLogoutAuth(state, action) {
      state.token = null;
      state.fcmToken = null;
    },
    setWalkThrough(state, action) {
      state.userWalkThrough = action.payload;
    },
    setMilageRing(state, action) {
      state.isMileage = action.payload;
    },
    setUserCheckin(state, action) {
      state.checkin = action.payload;
      console.log(
        '🚀 ~ setUserCheckin ~ action.payload: ================>',
        action.payload,
      );
    },
  },
});

export const {
  setUserLogin,
  setUserLogoutAuth,
  setUserToken,
  SetFCMToken,
  setWalkThrough,
  setMilageRing,
  setUserCheckin
} = AuthSlice.actions;

export default AuthSlice.reducer;
