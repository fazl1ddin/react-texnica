import { configureStore } from "@reduxjs/toolkit";
import products from './products';
import contents, { ok } from './contents';
import user from './user';
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useState } from "react";
import config from "../api/config";

export const store = configureStore({
    reducer: {
        products: products.reducer,
        contents: contents.reducer,
        user: user.reducer
    }
})

export function some(module, id){
    return store.getState()['products'][module].some(item => item.id == id)
}

export function contentById(module, id){
    return store.getState()['contents'][module].find(item => item.id == id)
}

export function useFindById(ids){

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await fetch(config.baseUrl + '/product', { method: 'POST', body: JSON.stringify(ids.map(item => ({_id: item.id}))) })
            .then(result => result.json())
            .then(result => {
                setData(result)
                setLoading(false)
            })
            .catch(e => console.log(e))
        })()
    }, [])

    return {
        data: data.length ? data.map((item) => ({
            ...item,
            get realPrice(){
                return item.price - (item.price * item.sale / 100)
            },
            count: 1
        })) : [],
        loading
    }
}

export function stars(rate){
    const arr = []
    for(let index = 0; index < rate; index++){
        arr[index] = (
            <AiFillStar key={index} className="rateStars"/>
        )
    }
    return arr
}