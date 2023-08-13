import { useEffect, useState } from "react";
import config from "../api/config";

function useGetDWP(path, page, perPage, body) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allength, setAllength] = useState(0);
  const [productsL, setProductsL] = useState(0)

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetch(config.baseUrl + path, {
        method: "POST",
        body: JSON.stringify({
          page,
          perPage,
          ...body
        }),
      })
        .then((result) => result.json())
        .then((result) => {
          setLoading(false);
          setData(result.data);
          setAllength(result.allength);
          setProductsL(result.productsL)
        })
        .catch((e) => console.log(e));
    })();
  }, [page, perPage]);

  return [
    {
      data,
      allength,
      productsL
    },
    loading,
    page,
    perPage,
  ];
}

export default useGetDWP;
