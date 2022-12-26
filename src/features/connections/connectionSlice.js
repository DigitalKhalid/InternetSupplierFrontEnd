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
    error: '',
}

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

export const getAllConnections = createAsyncThunk('connection/getAllConnections', ()=>{
    const url = getListURL('connectionapirelated')
    return axios
    .get(url)
    .then((response) => response.data)
})

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    extraReducers: (builder) =>{
        builder.addCase(getAllConnections.pending, (state) => {
            state.loading = true
        })
     
        builder.addCase(getAllConnections.fulfilled, (state, action) => {
            state.loading = false
            state.connections = action.payload
            state.error = ''
        })

        builder.addCase(getAllConnections.rejected, (state, action) => {
            state.loading = false
            state.connections = []
            state.error = action.error.message
        })
    },
})

export default connectionSlice.reducer