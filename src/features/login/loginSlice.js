import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const host = process.env.REACT_APP_HOST

const initialState = {
    loading: false,
    users: [],
    user: '',
    error: '',
    credentials: {
        username: '',
        password: '',
    }
}

const requestHeader = {
    'Content-Type': 'application/json',
}


export const getAuthToken = createAsyncThunk('login/getAuthToken', async (data) => {
    const url = `${host}gettoken/`

    const response = await fetch(url, {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify(data)
    })

    const json = await response.json()
    if (response.ok) {
        localStorage.setItem('authtoken', json.token)
        localStorage.setItem('userid', json.user_id)
        localStorage.setItem('useremail', json.email)
        localStorage.setItem('username', data.username)
        return json
    } else {
        return response.errors.message
    }
})

export const getAllUsers = createAsyncThunk('login/getAllUsers', async (filters) => {
    let url = ''
    if (filters) {
        url = `${host}userapi/${filters}`
    } else {
        url = `${host}userapi/`
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader,
    })

    if (response.ok) {
        const json = await response.json()
        return json
    } else {
        return response.errors.message
    }
})

export const updateUser = createAsyncThunk('login/updateUser', async (data) => {
    const url = `${host}userapi/${data.user_id}`

    const response = await fetch(url, {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const json = await response.json()
        return json
    } else {
        return response.errors.message
    }
})

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        updateCredentials: (state, action) => {
            state.credentials.username = action.payload.username
            state.credentials.password = action.payload.password
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAuthToken.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAuthToken.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })

        builder.addCase(getAuthToken.rejected, (state, action) => {
            state.loading = false
            state.user = []
            state.error = action.error.message
        })

        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })

        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error = action.error.message
        })
    },
})

export default loginSlice.reducer
export const { updateCredentials } = loginSlice.actions