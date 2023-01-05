import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = process.env.REACT_APP_HOST

const initialState = {
    loading: false,
    catagories: [],
    catagory: {
        id: '',
        title: ''
    },
    error: '',
}

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}


export const getAllCatagories = createAsyncThunk('catagory/getAllCatagories', async (filters) => {
    let url = ''
    if (filters) {
        url = `${host}catagoryapi/${filters}`
    } else {
        url = `${host}catagoryapi/`
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader,
    })
    const json = await response.json()
    return json
})

const catagorySlice = createSlice({
    name: 'catagory',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAllCatagories.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAllCatagories.fulfilled, (state, action) => {
            state.loading = false
            state.catagories = action.payload
            state.error = ''
        })

        builder.addCase(getAllCatagories.rejected, (state, action) => {
            state.loading = false
            state.catagories = ''
            state.error = action.error.message
        })
    },
})

export default catagorySlice.reducer;