import { useEffect, useState } from 'react'
import config from '../api/config'
import { storeProducts } from '../store'

function useGetData(path, method, typeRes){

    const [data, setData] = useState(typeRes)
    const [loading, setLoading] = useState(true)
    const [refetch, setRefetch] = useState(false)
    
    useEffect(() => {
        (async () => {
            await fetch(config.baseUrl + path, { method: method.toUpperCase() })
            .then(result => result.json())
            .then(result => {
                setData(result)
                setLoading(false)
            })
            .catch(e => console.log(e))
        })()
    }, [refetch])

    return {
        data: data.map((item, index) => ({
            ...item,
            every: item.every.map((product, index) => ({
                ...product,
                get space(){
                    const formatter = new Intl.NumberFormat('ru')
                    return formatter.format(this.price * this.sale / 100)
                },
                get realPrice(){
                    const formatter = new Intl.NumberFormat('ru')
                    return formatter.format(this.price - (this.price * this.sale / 100))
                },
            }))
        })),
        loading,
    }
}

export default useGetData