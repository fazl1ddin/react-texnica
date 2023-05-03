import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storeUser } from ".";
import config from "../api/config";

export const Checks = createAsyncThunk(
    'result/Checks',
    async (state, {dispatch, getState}) => {
        let user = storeUser.getState().user.user
        if(user){
            let res;
            await fetch(config.baseUrl + '/check-module', {method: 'POST', body: JSON.stringify({arr: state.arr, user_id: user._id, module: state.module})})
            .then(result => result.json())
            .then(result => res = result)
            return res
        } else {
            const products = localStorage.getItem('products')
            if(products){
                return JSON.parse(products)
            } else {
                return {}
            }
        }
    }
)

export const result = createSlice({
    name: 'result',
    initialState: {
        cart: [],
        favorites: [],
        viewed: [],
        compare: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(Checks.pending, (state) => {
                state.loading = true
            })
            .addCase(Checks.fulfilled, (state, action) => {
                Object.entries(action.payload).forEach(([key, value], index) => {
                    state[key] = value
                })
                state.loading = false
            })
            .addCase(Checks.rejected, (state, action) => {
                state.loading = false
                console.log(action.error);
            })
    }
})

export const check = createSlice({
    name: 'check',
    initialState: {
        cart: [],
        favorites: [],
        viewed: [],
        compare: [],
    },
    reducers: {
        push(state, payloads){
            const {module, id} = payloads.payload
            state[module].push(id)
        }
    }
})

export const { push } = check.actions