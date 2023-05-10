import { useEffect, useState } from "react"
import { storeProducts } from "../store"
import config from "../api/config"

function useGetPAC(only){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

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
                        setData(result.map((item, index) => {
                            if(products[index].id === item._id){
                                return {
                                    ...item,
                                    get realPrice(){
                                        return item.price - (item.price * item.sale / 100)
                                    }
                                }
                            }
                            return item
                        }))
                        setLoading(false)
                    })
                }
            )() 
        }
    }, [products, only])

    return {
        data,
        loading,
        products
    }
}

export default useGetPAC