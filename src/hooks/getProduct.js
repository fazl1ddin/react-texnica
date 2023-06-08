import { useEffect, useState } from "react";
import config from "../api/config";
import { getRealPrice, getSpace } from "../store";

function useGetProduct(id){
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await fetch(config.baseUrl + '/product', { method: 'POST', body: JSON.stringify({arr: [id]}) })
            .then(result => result.json())
            .then(result => {
                setData(result[0])
                setLoading(false)
            })
            .catch(e => console.log(e))
        })()
    }, [])

    return [{
        ...data,
        space: getSpace(data),
        realPrice: getRealPrice(data)
    }, loading]
}

export default useGetProduct