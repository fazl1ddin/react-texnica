import { useEffect, useState } from "react"

function useGetASh() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                await fetch(config.baseUrl + '/adress-shops', { method: 'GET' })
                    .then(res => res.json())
                    .then(result => {
                        setData(result)
                        setLoading(false)
                    })
            }
        )()
    }, [])

    return [data, loading]
}

export default useGetASh