import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storeUser } from ".";
import config from "../api/config";

export const Checks = createAsyncThunk(
    'result/Checks',
    async (state, {dispatch, getState}) => {
        let user_id = storeUser.getState().user.user._id
        let res;
        await fetch(config.baseUrl + '/check-module', {method: 'POST', body: JSON.stringify({arr: state.arr, user_id, module: state.module})})
        .then(result => result.json())
        .then(result => res = result)
        return res
    }
)

export const result = createSlice({
    name: 'result',
    initialState: {
        result: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(Checks.pending, (state) => {
                state.loading = true
            })
            .addCase(Checks.fulfilled, (state, action) => {
                state.result = action.payload
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
        checks: [],
        lastUpdated: Date.now()
    },
    reducers: {
        push(state, payloads){
            state.checks.push(payloads.payload)
            state.lastUpdated = Date.now()
        }
    }
})

export const { push } = check.actions