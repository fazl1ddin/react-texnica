import { useEffect, useState } from 'react'
import config from '../api/config'

function useGetData(path, method, typeRes, body = null){

    const [data, setData] = useState(typeRes)
    const [loading, setLoading] = useState(true)

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
    }, [])

    return {
        data: data,
        loading: loading,
    }
}

export default useGetData