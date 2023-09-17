import { createSlice } from "@reduxjs/toolkit"

const cart = createSlice({
    name: "cartState",
    initialState: {
        tovari: "start",
        delivery: "start",
        cash: "start",
        recipient: "start",
    },
    reducers: {
        setCartStateKey(state, payloads) {
            state[payloads.payload.key] = payloads.payload.value
        }
    }
})

export default cart
export const {setCartStateKey} = cart.actions