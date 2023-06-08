import { useEffect, useState } from "react"
import { updateOne, storeProducts } from "../../store"

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
            <a href="">Купить в 1 клик</a>
        </div>
    </>
}

export default CardUpdateLong