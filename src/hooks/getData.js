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

    storeProducts.subscribe(() => {
        setRefetch(!refetch)
    })

    return {
        data: data,
        loading: loading,
    }
}

export default useGetData