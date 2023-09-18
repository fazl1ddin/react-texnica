import { useEffect, useState } from "react"
import { updateOne, storeProducts } from "../../store"
import { Link } from "react-router-dom"

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
            <Link to={"/cart"} onClick={() => updateOne(some ? 'remove' : 'add', 'cart', id, 1 )}>Купить в 1 клик</Link>
            <div className={`cartbutton arbuttons ${some ? '' : 'add'}`} onClick={() => updateOne(some ? 'remove' : 'add', 'cart', id, 1 )}>
            </div>
        </div>
    </>
}

export default CardUpdate