import { createSlice, current } from "@reduxjs/toolkit"
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
            state.user = action.payload
            state.loading = false
        })
    }
})

export default state
export const {setUser} = state.actions