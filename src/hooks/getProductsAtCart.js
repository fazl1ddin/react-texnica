import { useEffect, useState } from "react"
import { getRealPrice, getSpace, storeProducts } from "../store"
import config from "../api/config"

function useGetPAC(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState(storeProducts.getState().products.cart)

    storeProducts.subscribe(() => {
        setProducts(storeProducts.getState().products.cart)
    })

    useEffect(() => {
        if(products.length){
           (
                async () => {
                    await fetch(config.baseUrl + '/product', {
                        method: 'POST', body: JSON.stringify({
                            arr: products.map(item => ({ _id: item.id }))
                        })
                    })
                    .then(result => result.json())
                    .then(result => {
                        setData(result.map((item, index) => {
                            if(products[index].id === item._id){
                                return {
                                    ...item,
                                    count: products[index].count,
                                    realPrice: getRealPrice(item),
                                    space: getSpace(item)
                                }
                            }
                            return item
                        }))
                        setLoading(false)
                    })
                }
            )() 
        }
    }, [products])

    return {
        data,
        loading,
        products
    }
}

export default useGetPAC