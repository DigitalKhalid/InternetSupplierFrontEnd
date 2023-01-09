import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const host = process.env.REACT_APP_HOST

const initialState = {
    loading: false,
    error: '',
    connections: {
        connections_archived: 10,
        connections_inactive: 20,
        connections_active: 30,
    },
    payments: {
        payment_today: 0,
        payment_this_month: 0,
        payment_this_year: 0,
    }
}


export const getConnectionsDashboard = createAsyncThunk('dashboard/getConnectionsDashboard', async () => {
    const url = `${host}connectiondashboardapi/`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        })

        if (response.ok) {
            const json = await response.json()
            return json[0]
        }
        return response.statusText
    } catch (error) {
        return error.message
    }

})

export const getPaymentsDashboard = createAsyncThunk('dashboard/getPaymentsDashboard', async () => {
    const url = `${host}paymentdashboardapi/`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        })

        if (response.ok) {
            const json = await response.json()
            return json[0]
        }
        return response.statusText
    } catch (error) {
        return error.message
    }

})

const dashboardSlice = createSlice({
    name: 'login',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getConnectionsDashboard.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getConnectionsDashboard.fulfilled, (state, action) => {
            state.loading = false
            state.connections.connections_archived = action.payload.archived_count
            state.connections.connections_active = action.payload.active_count
            state.connections.connections_inactive = action.payload.inactive_count
            state.error = ''
        })

        builder.addCase(getConnectionsDashboard.rejected, (state, action) => {
            state.loading = false
            state.connections.connections_archived = 0
            state.connections.connections_active = 0
            state.connections.connections_inactive = 0
            state.error = action.error.message
        })

        builder.addCase(getPaymentsDashboard.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getPaymentsDashboard.fulfilled, (state, action) => {
            state.loading = false
            state.payments.payment_today = action.payload.payment_today
            state.payments.payment_this_month = action.payload.payment_this_month
            state.payments.payment_this_year = action.payload.payment_this_year
            state.error = ''
        })

        builder.addCase(getPaymentsDashboard.rejected, (state, action) => {
            state.loading = false
            state.payments.payment_today = 0
            state.payments.payment_this_month = 0
            state.payments.payment_this_year = 0
            state.error = action.error.message
        })
    },
})

export default dashboardSlice.reducer