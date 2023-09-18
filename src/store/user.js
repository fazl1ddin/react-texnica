import { createSlice } from "@reduxjs/toolkit"
import Auth from "./auth";

const user = createSlice({
    name: 'user',
    initialState: {
        loading: true,
        user: undefined
    },
    reducers: {
        clearUser(state){
            state.user = undefined
            state.loading = false
        },
        setUser(state, payloads){
            const {user} = payloads.payload
            state.user = user
            state.loading = false
        },
        setLoading(state){
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(Auth.pending, (state) => {
            state.loading = true
        })
        .addCase(Auth.fulfilled, (state, action) => {
            if(action.payload.token){
                localStorage.setItem('token', action.payload.token)
            }
            state.user = action.payload.user
            state.loading = false
        })
        .addCase(Auth.rejected, (state, action) => {
            state.loading = false
            console.log(action.error);
        })
    }
})

export default user
export const {clearUser, setUser, setLoading} = user.actions