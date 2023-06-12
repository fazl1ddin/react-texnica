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

    useEffect(() => {
        if(!loading){
            (async () => {
                let newComments = []
                for (let index = 0; index < data?.comments?.length; index++) {
                    newComments[index] = data?.comments?.[index]?.userId;
                }
                await fetch(config.baseUrl + '/get-user-data', { method: 'POST', body: JSON.stringify({userId: newComments, keys: ['name']}) })
                .then(result => result.json())
                .then(result => {
                    setData({
                        ...data,
                        comments: data.comments.map((item, index) => ({
                            ...item,
                            ...result[index]
                        }))
                    })
                    setLoading(false)
                })
            })()
        }
        
    }, [loading])

    return [{
        ...data,
        space: getSpace(data),
        realPrice: getRealPrice(data)
    }, loading, setData]
}

export default useGetProduct