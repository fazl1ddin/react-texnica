import { useEffect, useState } from "react"
import config from "../api/config"
import { getRealPrice, getSpace } from "../store"

function useGetAP(page, perPage){
    const [data, setData] = useState([])
    const [filtersChecks, setFiltersChecks] = useState({})
    const [loading, setLoading] = useState(true)
    const [allength, setAllength] = useState(0)

    useEffect(() => {
        (async () => {
            setLoading(true)
            await fetch(config.baseUrl + '/products', {method: 'POST', body: JSON.stringify(
                {
                    page, perPage
                }
            )})
            .then(result => result.json())
            .then(result => {
                setLoading(false)
                setData(result.products)
                setFiltersChecks(result.filtersChecks)
                setAllength(result.allength)
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
            filtersChecks,
            allength
        }
    , loading, page, perPage]
}

export default useGetAP