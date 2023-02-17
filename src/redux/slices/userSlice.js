import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0,
  loggedUser: {},
};
export const userSlice = createSlice({
  name: "user_slice",
  initialState: initialState,
  reducers: {
    handleNext: (state) => {
      state.activeStep += 1;
    },
    handleBack: (state) => {
      state.activeStep -= 1;
    },
    handleLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    }
  },
});

export const getActiveStep = (state) => state.userReducer.activeStep;
export const getLoggedUser = (state) => state.userReducer.loggedUser;
export const { handleNext, handleBack, handleLoggedUser } = userSlice.actions;
export default userSlice.reducer;
