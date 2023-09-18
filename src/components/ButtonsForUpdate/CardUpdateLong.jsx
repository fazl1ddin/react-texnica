import { useEffect, useState } from "react"
import { updateOne, storeProducts } from "../../store"
import { Link } from "react-router-dom"

function CardUpdateLong({id}){

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
                <div className={`bought cartbutton arbuttons ${some ? 'remove' : 'add'}`} onClick={() => updateOne(some ? 'remove' : 'add', 'cart', id, 1 )}>
                    <p>В корзину</p>
                </div>
            <Link to={"/cart"} onClick={() => updateOne(some ? '' : 'add', 'cart', id, 1 )}>Купить в 1 клик</Link>
        </div>
    </>
}

export default CardUpdateLong