import { useEffect, useState } from "react"
import { updateOne, storeProducts } from "../../store"

function CompareUpdate({id}){

    const [some, setSome] = useState(false)

    useEffect(() => {
        setSome(storeProducts.getState().products.compare.some((item) => item.id === id))
        const unsubscribe = storeProducts.subscribe(() => {
            setSome(storeProducts.getState().products.compare.some((item) => item.id === id))
        })
        return () => {
            unsubscribe()
        }
    }, [])
    

    return <>
        <div className={`comparebutton arbuttons ${some ? 'remove' : 'add'}`} onClick={() => updateOne(some ? 'remove' : 'add', 'compare', id, 1 )}>
        </div>
    </>
}

export default CompareUpdate