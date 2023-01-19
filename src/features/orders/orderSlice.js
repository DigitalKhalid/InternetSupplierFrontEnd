import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = process.env.REACT_APP_HOST

const initialState = {
    loading: false,
    orders: [],
    order: '',
    orderSerial: 0,
    error: '',
}

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
        return error.message
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