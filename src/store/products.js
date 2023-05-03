import { createSlice, current } from "@reduxjs/toolkit";

const state = createSlice({
    name: 'products',
    initialState: {
        allProducts: [],
        cart: [],
        favorites: [],
        compare: [],
        viewed: [],
    },
    reducers: {
        add(state, payloads){
            const {module, id, count} = payloads.payload
            state[module].push({ id, count})
        },
        remove(state, payloads){
            const {module, id} = payloads.payload
            state[module] = state[module].filter(product => product.id != id)
        },
        changeCount(state, payloads){
            const {id, value} = payloads.payload
                const index = state.cart.findIndex(product => product.id == id)
                state.cart[index].count = value
        },
        setModule(state, payloads){
            const {data} = payloads.payload
            if(data){
                Object.keys(current(state)).forEach((item) => {
                    if(item !== 'allProducts'){
                        state[item] = data[item]
                    }
                })
            }
        }
    }
})

export default state
export const actions = state.actions
export const { setModule, changeCount } = state.actions