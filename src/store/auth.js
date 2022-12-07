import { createSlice } from "@reduxjs/toolkit"
import config from "../api/config"

const state = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, payload){
            state = payload
            console.log(state);
        }
    }
})

export default state

export function ULWF(obj){
    (async function(){
        await fetch(config.baseUrl + '/login', {method: 'POST', body: JSON.stringify(obj)}).then(result => result.json()).then(result => {
            if(result.token){
                localStorage.setItem('token', result.token)
                state.actions.setUser(result.user)
            }
        })
    })()
}

export function SUWF(obj){
    (async function(){
        await fetch(config.baseUrl + '/sing-up', {method: 'POST', body: JSON.stringify(obj)}).then(result => result.json()).then(result => console.log(result))
    })()
}