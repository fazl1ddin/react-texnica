import { useEffect, useState } from "react"
import { updateOne, storeProducts } from "../../store"
import { Link } from "react-router-dom"

function ProductImage({id, srcs}){

    const [some, setSome] = useState(false)

    useEffect(() => {
        setSome(storeProducts.getState().products.viewed.some((item) => item.id === id))
        const unsubscribe = storeProducts.subscribe(() => {
            setSome(storeProducts.getState().products.viewed.some((item) => item.id === id))
        })
        return () => {
            unsubscribe()
        }
    }, [])
    

    return <>
        <Link to={`/product/${id}`}>
            <div className="sigveiWrap">
                <img onClick={() => !some && updateOne('add', 'viewed', id)} src={`${srcs[0]}`} className='sigvei' />
            </div>
        </Link>
    </>
}

export default ProductImage