import { useEffect, useState } from "react"
import { updateOne, storeProducts } from "../../store"

function FavoritesUpdate({id}){

    const [some, setSome] = useState(false)

    useEffect(() => {
        setSome(storeProducts.getState().products.favorites.some((item) => item.id === id))
        const unsubscribe = storeProducts.subscribe(() => {
            setSome(storeProducts.getState().products.favorites.some((item) => item.id === id))
        })
        return () => {
            unsubscribe()
        }
    }, [])
    

    return <>
        <div className={`likebutton arbuttons ${some ? 'remove' : 'add'}`} onClick={() => updateOne(some ? 'remove' : 'add', 'favorites', id, 0)}>
        </div>
    </>
}

export default FavoritesUpdate