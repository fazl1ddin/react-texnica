import { useEffect, useState } from "react";
import config from "../api/config";

function useGetComments(url, cityId) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function refetch() {
    setLoading(true);
    const comments = await fetch(config.baseUrl + url, {
      method: "post",
      body: JSON.stringify({
        cityId,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        setData(result);
        setLoading(false);
        return result;
      })
      .catch((e) => console.log(e));
    const usernames = await fetch(config.baseUrl + "/get-user-data", {
      method: "post",
      body: JSON.stringify({
        userId: comments.map((item) => item.userId),
        keys: ["name"],
      }),
    }).then((result) => result.json());
    setData((prev) =>
      prev.map((item) => {
        const username = usernames.find((e) => e._id === item.userId);
        if (username !== undefined) {
          return {
            name: username.name,
            ...item,
          };
        }
        return item
      })
    );
  }

  useEffect(() => {
    if (cityId) {
      refetch();
    }
  }, [cityId]);

  return [data, loading, refetch];
}

export default useGetComments;
