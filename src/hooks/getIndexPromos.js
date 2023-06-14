import { useEffect, useState } from "react";
import config from "../api/config";
import { getRealPrice, getSpace } from "../store";

function useGetIndexPromos() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await fetch(config.baseUrl + '/get-index-promos', { method: 'GET' })
            .then(result => result.json())
            .then(result => {
                setData(result)
                setLoading(false)
            })
            .catch(e => console.log(e))
        })()
    }, [])

    return [data, loading]
}

export default useGetIndexPromos