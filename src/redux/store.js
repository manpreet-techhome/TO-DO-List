import reducers from "./reducers/index";
import storage from 'redux-persist/lib/storage';
import persistReducer from "redux-persist/es/persistReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const persistConfig = {
  key:"root",
  version:1,
  storage
};
const persistedReducer = persistReducer(persistConfig,reducers)

const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;
