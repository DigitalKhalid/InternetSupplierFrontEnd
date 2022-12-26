import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from '../features/connections/connectionSlice';
import loginReducer from '../features/login/loginSlice';

const store = configureStore({
  reducer: {
    connection: connectionReducer,
    login: loginReducer,
  }
})

export default store;