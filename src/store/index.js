import { configureStore } from "@reduxjs/toolkit";
import products from './products';
import contents, { ok } from './contents';
import user from './user';
import { AiFillStar } from 'react-icons/ai'

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

export function findById(id){
    return store.getState()['products'].allProducts.find(item => item.id == id)
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