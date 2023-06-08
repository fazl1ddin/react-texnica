import { useEffect, useState } from "react";
import config from "../api/config";
import { getRealPrice, getSpace } from "../store";

function useGetRecs() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await fetch(config.baseUrl + '/get-rec', { method: 'GET' })
            .then(result => result.json())
            .then(result => {
                setData(result)
                setLoading(false)
            })
            .catch(e => console.log(e))
        })()
    }, [])

    return [data.map((item, index) => ({
        ...item,
        space: getSpace(item),
        realPrice: getRealPrice(item)
    })), loading]
}

export default useGetRecs