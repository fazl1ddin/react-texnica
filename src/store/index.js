import { configureStore } from "@reduxjs/toolkit";
import products, { actions, setModule } from './products';
import contents, { ok } from './contents';
import user, { setUser } from './user';
import { check, Checks, push, result } from './check';
import { AiFillStar } from 'react-icons/ai'
import { useEffect, useState } from "react";
import config from "../api/config";
import { useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        products: products.reducer,
        contents: contents.reducer,
        user: user.reducer,
    },
})

export const storeUser = configureStore({
    reducer: {
        user: user.reducer
    }
})

export const storeProducts = configureStore({
    reducer: {
        products: products.reducer
    }
})

export const storeResultCheck = configureStore({
    reducer: {
        result: result.reducer
    }
})

export const storeCheck = configureStore({
    reducer: {
        check: check.reducer
    }
})

export function useSome(id){
    let arr = []
    storeCheck.subscribe(() => {
        arr = storeCheck.getState().check.checks
    })
    if(!arr.includes(id)) storeCheck.dispatch(push(id))
}

export function some(id){
    let arr = []
    storeResultCheck.subscribe(() => {
        arr = storeResultCheck.getState().result.result
    })
    return arr.includes(id)
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

export function updateOne(method, module, id, count){
    const type = storeUser.getState().user.user
    if(type){
        (async () => {
            const userId = storeUser.getState().user.user._id
            let res;
            await fetch(config.baseUrl + '/update-user', { 
                method: 'PUT',
                body: JSON.stringify(
                    {
                        id: userId,
                        module,
                        data: {id, count}
                    }
                ),
            })
            .then(result => result.json())
            .then(result => res = result)
            if(res.message === 'User succesfully updated'){
                storeUser.dispatch(setUser({user: res.user}))
                storeProducts.dispatch(setModule({data: res.user}))
            } else {

            }
        })()
    } else {
        const data = JSON.parse(localStorage.getItem('products'))
        data[module].push({ id, count})
        localStorage.setItem('products', JSON.stringify(data))
        storeProducts.dispatch(actions[method]({module, id, count}))
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