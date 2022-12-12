import { createSlice } from "@reduxjs/toolkit"
import Auth from "./auth";

const state = createSlice({
    name: 'user',
    initialState: {
        loading: true,
        user: undefined
    },
    reducers: {
        setUser(state, payload){
            state = payload
            console.log(state);
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

export default state
export const {setUser} = state.actions