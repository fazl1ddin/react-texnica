import { useEffect, useState } from "react";
import { storeProducts } from "../store";
import config from "../api/config";

function useGetPAF() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(storeProducts.getState().products.favorites);

  storeProducts.subscribe(() => {
    setProducts(storeProducts.getState().products.favorites);
  });

  useEffect(() => {
    if (products.length) {
      (async () => {
        setLoading(true)
        await fetch(config.baseUrl + "/product", {
          method: "POST",
          body: JSON.stringify({
            arr: products.map((item) => ({ _id: item.id })),
            only: false
          }),
        })
          .then((result) => result.json())
          .then((result) => {
            setData(
              result.map((item, index) => {
                if (products[index].id === item._id) {
                  return {
                    ...item,
                    get realPrice() {
                      return item.price - (item.price * item.sale) / 100;
                    },
                  };
                }
                return item;
              })
            );
          });
        setLoading(false);
      })();
    }
  }, [products]);

  return {
    data,
    loading,
    products,
  };
}

export default useGetPAF;
