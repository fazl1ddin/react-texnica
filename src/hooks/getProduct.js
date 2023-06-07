import { useEffect, useState } from "react";
import config from "../api/config";

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
        get space(){
            const formatter = new Intl.NumberFormat('ru')
            return formatter.format(this.price * this.sale / 100)
        },
        get realPrice(){
            const formatter = new Intl.NumberFormat('ru')
            return formatter.format(this.price - (this.price * this.sale / 100))
        }
    }, loading]
}

export default useGetProduct