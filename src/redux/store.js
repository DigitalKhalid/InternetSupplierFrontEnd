import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from '../features/connections/connectionSlice';
import loginReducer from '../features/login/loginSlice';
import orderReducer from '../features/orders/orderSlice';
import catagorySlice from "../features/productcatagory/catagorySlice";
import unitSlice from "../features/units/unitSlice";
import settingSlice from "../features/settings/settingSlice";
import dashboardSlice from "../features/dashboard/dashboardSlice";

const store = configureStore({
  reducer: {
    connection: connectionReducer,
    login: loginReducer,
    order: orderReducer,
    catagory: catagorySlice,
    unit: unitSlice,
    setting: settingSlice,
    dashboard: dashboardSlice,
  }
})

export default store;