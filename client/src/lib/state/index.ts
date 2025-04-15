import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateProps {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: InitialStateProps = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

/**
 * @description This is the global slice of the state
 * @function setIsSidebarCollapsed
 * @function setIsDarkMode
 * @description These functions will set the isSidebarCollapsed or isDarkMode states to true or false
 * @param {boolean} action.payload
 * @description This action represents the type that we have and that allows us to determine and pass in a value for a sidebar collapsed or dark mode
 * @example anytime we use this particular function we will update sidebar collapse or dark mode
 */
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },

    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode } = globalSlice.actions;

export default globalSlice.reducer;
