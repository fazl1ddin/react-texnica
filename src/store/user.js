import { createSlice } from "@reduxjs/toolkit"
import { store } from ".";
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
})

export default user
export const {clearUser, setUser, setLoading} = user.actions