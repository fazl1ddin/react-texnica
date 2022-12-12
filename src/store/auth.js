import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../api/config";

const Auth = createAsyncThunk(
    'user/Auth',
    async (obj) => {
        let user;
        await fetch(config.baseUrl + '/login', {method: 'POST', body: JSON.stringify(obj)})
        .then(result => result.json())
        .then(result => {
            user = result
        })
        if(user.message){
            throw user
        } else {
            return user
        }
    }
)

export default Auth