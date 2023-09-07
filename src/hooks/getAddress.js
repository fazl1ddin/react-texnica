import { useEffect, useState } from "react";
import config from "../api/config";

function useGetAddress(url, cityId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refetch(){
    setLoading(true);
    await fetch(config.baseUrl + url, {
      method: "post",
      body: JSON.stringify({
        cityId,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (cityId) {
      refetch()
    }
  }, [cityId]);

  return [data, loading, refetch];
}

export default useGetAddress;
