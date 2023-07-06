import { useEffect, useState } from "react"
import config from "../api/config"

function useGetFCh() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            setLoading(true)
            await fetch(config.baseUrl + '/filter-checks', {method: 'GET'})
            .then(result => result.json())
                .then(result => {
                setLoading(false)
                setData(result)
            })
            .catch(e => console.log(e))
        })()
    }, [])

    return [data, loading]
}

export default useGetFCh