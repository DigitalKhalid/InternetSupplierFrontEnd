import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = process.env.REACT_APP_HOST

const initialState = {
    loading: false,
    units: [],
    unit: {
        id: '',
        title: '',
        value:''
    },
    error: '',
}

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}


export const getAllUnits = createAsyncThunk('unit/getAllUnits', async (filters) => {
    let url = ''
    if (filters) {
        url = `${host}unitapi/${filters}`
    } else {
        url = `${host}unitapi/`
    }
    
    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader,
    })
    const json = await response.json()
    return json
})

const unitSlice = createSlice({
    name: 'unit',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllUnits.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAllUnits.fulfilled, (state, action) => {
            state.loading = false
            state.units = action.payload
            state.error = ''
        })

        builder.addCase(getAllUnits.rejected, (state, action) => {
            state.loading = false
            state.units = ''
            state.error = action.error.message
        })
    },
})

export default unitSlice.reducer;