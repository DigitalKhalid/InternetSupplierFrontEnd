import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = process.env.REACT_APP_HOST

const initialState = {
    loading: false,
    settings: '',
    error: '',
}

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}


export const getSettings = createAsyncThunk('setting/getSettings', async () => {
    const url = `${host}settingsapi/`

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
})


export const updateSettings = createAsyncThunk('setting/updateSettings', async (data) => {
    const url = `${host}settingsapi/1/`

    const response = await fetch(url, {
        method: 'PATCH',
        headers:  {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('authtoken')
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const json = await response.json()
        return json
    }
})

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        updateSettingsState: (state, action) => {
            state.settings = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSettings.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getSettings.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
            state.error = ''
        })

        builder.addCase(getSettings.rejected, (state, action) => {
            state.loading = false
            state.settings = ''
            state.error = action.error.message
        })

        builder.addCase(updateSettings.pending, (state) => {
            state.loading = true
        })

        builder.addCase(updateSettings.fulfilled, (state, action) => {
            state.loading = false
            state.settings = action.payload
            state.error = ''
        })

        builder.addCase(updateSettings.rejected, (state, action) => {
            state.loading = false
            state.settings = ''
            state.error = action.error.message
        })
    },
})

export default settingSlice.reducer;
export const { updateSettingsState } = settingSlice.actions