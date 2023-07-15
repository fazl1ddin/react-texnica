import { useEffect, useState } from "react";
import config from "../api/config";

function useGetAddress(cityId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cityId) {
      (async () => {
        setLoading(true);
        await fetch(config.baseUrl + "/address-shops", {
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
      })();
    }
  }, [cityId]);

  return [data, loading];
}

export default useGetAddress;
