import { configureStore, compose, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./modules/user.module";
import snackbarReducer from "./modules/snackbar.module";
import loadingReducer from "./modules/loading.module";
import createWebStorage from "redux-persist/lib/storage/createWebStorage"
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export const mainReducer = combineReducers({
  users: userReducer,
  snackbar: snackbarReducer,
  loading: loadingReducer,
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(
  { key: "root", storage, whitelist: ["users"], version: 1 },
  mainReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});




export const makeStore = () => {
  return configureStore({
    reducer: {
      language: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
}

/* 
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage(); */

export const persistor = persistStore(store);
/* export const persistor = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage(); */
/* export const persistor = persistStore(store); */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
