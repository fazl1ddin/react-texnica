import { useEffect, useState } from "react";
import config from "../api/config";

function useGetContents(ids, path) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await fetch(config.baseUrl + path, {
                method: "POST",
                body: JSON.stringify({
                    arr: ids
                }),
            })
            .then((result) => result.json())
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((e) => console.log(e));
        })();
    }, []);

    return [data, loading];
}

export default useGetContents