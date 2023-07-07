import { useEffect, useState } from "react"
import { getSpace, storeProducts } from "../store"
import { getRealPrice } from '../store/index'
import config from "../api/config"

function useGetPAC(only){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState(storeProducts.getState().products.compare)

    storeProducts.subscribe(() => {
        setProducts(storeProducts.getState().products.compare)
    })

    useEffect(() => {
        if(products.length){
           (
                async () => {
                    await fetch(config.baseUrl + '/product', { method: 'POST', body: JSON.stringify({
                        arr: products.map(item => ({_id: item.id})),
                        only
                    })})
                    .then(result => result.json())
                    .then(result => {
                        setLoading(false)
                        setData(result.map((item, index) => {
                            if(products[index].id === item._id){
                                return {
                                    ...item,
                                    realPrice: getRealPrice(item),
                                    space: getSpace(item)
                                }
                            }
                            return item
                        }))
                    })
                }
            )() 
        } else {
            setLoading(false)
            setData([])
        }
    }, [products, only])

    return {
        data,
        loading,
        products
    }
}

export default useGetPAC