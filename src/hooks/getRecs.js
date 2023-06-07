import { useEffect, useState } from "react";

function useGetRecs() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await 
        })()
    }, [])

    return [data, loading]
}