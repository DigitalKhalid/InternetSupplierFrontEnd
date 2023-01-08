import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = process.env.REACT_APP_HOST

const initialState = {
    loading: false,
    orders: [],
    order: '',
    orderSerial: 0,
    error: '',
}

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

const defaultOrderData = {
    id: '',
    date_created: '',
    order_id: '',
    connection: '',
    value: '0',
    status: 'Pending'
}

// export const generateScheduledOrders = createAsyncThunk('order/generateDefaultOrder', async () => {
//     const url = `${host}orderapi/`

//     const scheduledConnections = []

//     for (let index = 0; index < scheduledConnections.length; index++) {
//         const connection = scheduledConnections[index];

//         const body = { ...defaultOrderData, 'connection': connection }

//         await fetch(url, {
//             method: 'POST',
//             headers: requestHeader,
//             body: JSON.stringify(body),
//         })
//     }
// })

export const getOrderSerial = createAsyncThunk('order/generateDefaultOrder', async () => {
    const url = `${host}orderserialapi`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            }
        });

        if (response.ok) {
            const json = await response.json();
            const orderSerial = Math.max(...json.map(o => (o.id))) + 1
            return orderSerial
        }

    } catch (error) {
        return error
    }
})


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        updateOrderSerial: (state, action) => {
            state.orderSerial = action.payload
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(generateScheduledOrders.pending, (state) => {
        //     state.loading = true
        // })

        // builder.addCase(generateScheduledOrders.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.order = action.payload
        //     state.error = ''
        // })

        // builder.addCase(generateScheduledOrders.rejected, (state, action) => {
        //     state.loading = false
        //     state.order = ''
        //     state.error = action.error.message
        // })

        builder.addCase(getOrderSerial.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getOrderSerial.fulfilled, (state, action) => {
            state.loading = false
            state.orderSerial = action.payload
            state.error = ''
        })

        builder.addCase(getOrderSerial.rejected, (state, action) => {
            state.loading = false
            state.orderSerial = ''
            state.error = action.payload
        })
    },
})

export default orderSlice.reducer;
export const { updateOrderSerial } = orderSlice.actions