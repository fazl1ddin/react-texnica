import { useEffect, useState } from "react";
import config from "../api/config";
import { storeProducts } from "../store";

function useGetData(path, typeRes) {
  const [data, setData] = useState(typeRes);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetch(config.baseUrl + path, { method: "GET" })
        .then((result) => result.json())
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((e) => console.log(e));
    })();
  }, [refetch]);

  return [data, loading];
}

export default useGetData;
