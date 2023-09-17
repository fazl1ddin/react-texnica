import { useEffect, useState } from "react"
import { updateOne, storeProducts } from "../../store"

function CardUpdate({id}){

    const [some, setSome] = useState(false)

    useEffect(() => {
        setSome(storeProducts.getState().products.cart.some((item) => item.id === id))
        const unsubscribe = storeProducts.subscribe(() => {
            setSome(storeProducts.getState().products.cart.some((item) => item.id === id))
        })
        return () => {
            unsubscribe()
        }
    }, [])
    

    return <>
        <div className="cart">
            <a href="">Купить в 1 клик</a>
            <div className={`cartbutton arbuttons ${some ? 'remove' : 'add'}`} onClick={() => updateOne(some ? 'remove' : 'add', 'cart', id, 1 )}>
            </div>
        </div>
    </>
}

export default CardUpdate