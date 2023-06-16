import { useState } from "react"
import config from "../api/config"
import { getRealPrice, getSpace } from "../store"

function useGetAP(page, perPage){
    const [data, setData] = useState([])
    const [filtersChecks, setFiltersChecks] = useState({})
    const [loading, setLoading] = useState(true)

    useState(() => {
        (async () => {
            await fetch(config.baseUrl + '/products', {method: 'POST', body: JSON.stringify(
                {
                    page, perPage
                }
            )})
            .then(result => result.json())
            .then(result => {
                setData(result)
                setLoading(false)
            })
            .catch(e => console.log(e))
        })()
    }, [page, perPage])

    return [
        {
            data: data.map((item, index) => ({
                ...item,
                space: getSpace(item),
                realPrice: getRealPrice(item)
            })),
            filtersChecks: filtersChecks
        }
    , loading, page, perPage]
}

export default useGetAP