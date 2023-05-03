import { useState } from "react"
import { useSome, updateOne, some, storeCheck, storeResultCheck } from "../../store"
import { Checks } from "../../store/check"

function CardUpdate({id}){

    const [some, setSome] = useState(false)

    useSome('cart', id)

    storeResultCheck.subscribe(() => {
        setSome(storeResultCheck.getState().result['cart'].some(item => item.id === id))
    })

    return <>
        <div className="cart">
            <a href="">Купить в 1 клик</a>
            <div className={`cartbutton arbuttons ${some ? 'remove' : 'add'}`} onClick={() => updateOne(some ? 'remove' : 'add', 'cart', id, 1)}>
            </div>
        </div>
    </>
}

export default CardUpdate