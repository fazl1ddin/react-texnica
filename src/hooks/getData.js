import { useEffect, useState } from 'react'
import config from '../api/config'

function useGetData(path, method, typeRes, body = null){

    const [data, setData] = useState(typeRes)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetcher().then(result => {
            setData(result)
            setLoading(false)
        }).catch(e => {
            console.log(e);
            setLoading(false)
        })
    }, [])

    function fetcher(){
        return new Promise((res, rej) => {
            fetch(config.baseUrl + path, { method: 'GET' })
            .then(result => result.json())
            .then(result => {
                res(result)
            }).catch(e => {
                rej(e)
            })
        })
    }

    return {
        data: data,
        loading: loading,
    }
}

export default useGetData