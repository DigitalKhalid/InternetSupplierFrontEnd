import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from '../features/connections/connectionSlice';
import loginReducer from '../features/login/loginSlice';
import orderReducer from '../features/orders/orderSlice';

const store = configureStore({
  reducer: {
    connection: connectionReducer,
    login: loginReducer,
    order: orderReducer,
  }
})

export default store;