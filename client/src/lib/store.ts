/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/lib/state";
import { api } from "@/lib/state/api";

/**
 * Redux Store
 * @description This is the main Redux store for the application. It combines all the reducers and sets up middleware.
 * Can be used for any Next.js application.
 * @see https://redux-toolkit.js.org/api/configureStore
 */
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/**
 * @description this will basically set up our local storage state
 */
/* REDUX PERSISTENCE */
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

/**
 * @description persisting our data in local storage
 */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"],
};

/**
 * @description this will combine our reducers
 * @description global we use for all the state
 * @description every time we make an api call, we will save it to our reduce with redux toolkit query
 * @see https://redux-toolkit.js.org/api/createSlice
 */
const rootReducer = combineReducers({
  global: globalReducer, // this is the global slice of the state
  [api.reducerPath]: api.reducer, // this is the reducer for the api slice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * @description here we store all of our state
 * @returns {Store} - The Redux store
 */
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
