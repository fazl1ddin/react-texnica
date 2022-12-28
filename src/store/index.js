import { configureStore } from "@reduxjs/toolkit";
import products from './products';
import contents, { ok } from './contents';
import user from './user';
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useState } from "react";
import config from "../api/config";
import { useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        products: products.reducer,
        contents: contents.reducer,
        user: user.reducer
    },
})

export function some(module, id){
    return false 
}

export function contentById(module, id){
    return undefined 
}

export function useFindById(module){

    const state = useSelector(state => state.products[module])
    const user = useSelector(state => state.user)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            if(state.length){
                (async () => {
                    await fetch(config.baseUrl + '/product', { method: 'POST', body: JSON.stringify(state.map(item => ({_id: item.id}))) })
                    .then(result => result.json())
                    .then(result => {
                        if(result.length) {
                            setData(
                                result.map((item, index) => ({
                                    ...item,
                                    get realPrice(){
                                        return item.price - (item.price * item.sale / 100)
                                    },
                                    count: state[index]?.count ? state[index].count : 1
                            })))
                        }
                        setLoading(false)
                    })
                    .catch(e => console.log(e))
                })()
            } else {
                setLoading(false)
                setData([])
            }
    }, [state, user])

    return {
        data,
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