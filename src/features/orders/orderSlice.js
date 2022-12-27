import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import store from '../../redux/store'

const host = process.env.REACT_APP_HOST
// const reduxStore = store.getState()

const initialState = {
    loading: false,
    orders: [],
    order: '',
    error: '',
}

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

// const getAllOrders = async () => {
//     const url = `${host}orderapirelated`

//     const response = await fetch(url, {
//         method: 'GET',
//         headers: requestHeader
//     });

//     const json = await response.json();
//     return json;
// }

// const getOrderID = () => {
//     const orders = getAllOrders();
//     let serial = Math.max(...orders.map(o => (o.id))) + 1
//     const orderID = 'CPCL-' + serial.toString().padStart(5, '0')
//     return orderID
// }

const defaultOrderData = {
    id: '',
    date_created: '',
    // order_id: getOrderID(),
    connection: '',
    value: '0',
    status: 'Pending'
}

export const generateScheduledOrders = createAsyncThunk('order/generateDefaultOrder', async () => {
    const url = `${host}orderapi/`

    const scheduledConnections = []

    for (let index = 0; index < scheduledConnections.length; index++) {
        const connection = scheduledConnections[index];
        
        const body = {...defaultOrderData, 'connection': connection}
    
        await fetch(url, {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify(body),
        })
    }
})

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(generateScheduledOrders.pending, (state) => {
            state.loading = true
        })

        builder.addCase(generateScheduledOrders.fulfilled, (state, action) => {
            state.loading = false
            state.order = action.payload
            state.error = ''
        })

        builder.addCase(generateScheduledOrders.rejected, (state, action) => {
            state.loading = false
            state.order = ''
            state.error = action.error.message
        })
    },
})

export default orderSlice.reducer;