import { createSlice } from "@reduxjs/toolkit"

const state = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser(state, payload){
            state = payload
            console.log(state);
        }
    }
})

export default state
export const {setUser} = state.actions