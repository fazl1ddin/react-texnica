import { useState } from "react"
import { useSome, updateOne, some, storeCheck, storeResultCheck } from "../../store"
import { Checks } from "../../store/check"

function CardUpdate({id}){

    useSome(id)

    storeCheck.subscribe(() => {
        if((Date.now() - storeCheck.getState().check.lastUpdated) > 1500) storeResultCheck.dispatch(Checks({arr: storeCheck.getState().check.checks, module: 'cart'}))
    })

    return <>
        <div className="cart">
            <a href="">Купить в 1 клик</a>
            <div className={`cartbutton arbuttons ${some(id) ? 'remove' : 'add'}`} onClick={() => updateOne(some(id) ? 'remove' : 'add', 'cart', id, 1)}>
            </div>
        </div>
    </>
}

export default CardUpdate