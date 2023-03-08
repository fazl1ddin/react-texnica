import { useState } from "react"
import { useSome, updateOne, some } from "../../store"

function CardUpdate({id}){

    useSome(id)

    return <>
        <div className="cart">
            <a href="">Купить в 1 клик</a>
            <div className={`cartbutton arbuttons ${some(id) ? 'remove' : 'add'}`} onClick={() => updateOne(some(id) ? 'remove' : 'add', 'cart', id, 1)}>
            </div>
        </div>
    </>
}

export default CardUpdate