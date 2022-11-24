import { useEffect, useState } from 'react'
import config from '../api/config'

function useGetData(path, method, typeRes, body = null){

    const [data, setData] = useState(typeRes)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetcher().then(result => {
            setData(JSON.parse(result))
            setLoading(false)
        }).catch(e => {
            console.log(e);
            setLoading(false)
        })
    }, [])

    function fetcher(){
        return new Promise((res, rej) => {
            const req = new XMLHttpRequest
            req.open(method, config.baseUrl + path)

            req.onload = () => {
                res(req.response)
            }
            
            req.onerror = () => {
                rej(req.status)
            }

            req.send(body)
        })
    }

    return {
        data: data,
        loading: loading,
    }
}

export default useGetData