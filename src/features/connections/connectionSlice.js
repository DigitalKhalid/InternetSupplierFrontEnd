import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getListURL from "../../functions/URLs";
import axios from 'axios';

const host = process.env.REACT_APP_HOST

// const blankFields = {
//     id: '',
//     customer: '',
//     connection_id: getConnectionID(),
//     installation_date: new Date().toISOString().slice(0, 10),
//     package: '',
//     status: 'Inactive',
//     new: 'True'
// }

const initialState = {
    loading: false,
    connections: [],
    expiredConnections: [],
    error: '',
}

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

export const updateExpiredConnectionStatus = createAsyncThunk('connection/updateExpiredConnectionStatus', async () => {
    const url = `${host}activeexpiredconnectionapi/`

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader,
    });

    const json = await response.json();
    if (response.ok) {
        let connection = ''

        for (let index = 0; index < json.length; index++) {
            const con = json[index];
            connection = ({ 'id': con.id, 'status': 'Inactive' })

            // Update connection status to server
            const url = `${host}connectionapi/${connection.id}/`

            const response = await fetch(url, {
                method: 'PATCH',
                headers: requestHeader,
                body: JSON.stringify(connection)
            });

            // Generate order for this connection
            
        }
        return json;
    }
})

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateExpiredConnectionStatus.pending, (state) => {
            state.loading = true
        })

        builder.addCase(updateExpiredConnectionStatus.fulfilled, (state, action) => {
            state.loading = false
            state.expiredConnections = action.payload
            state.error = ''
        })

        builder.addCase(updateExpiredConnectionStatus.rejected, (state, action) => {
            state.loading = false
            state.expiredConnections = []
            state.error = action.error.message
        })
    },
})

export default connectionSlice.reducer