import { useEffect, useState } from "react";
import { updateOne, storeProducts, storeCartState } from "../../store";
import { Link } from "react-router-dom";
import { setCartStateKey } from "../../store/cart";

function CardUpdate({ id }) {
  const [some, setSome] = useState(false);

  useEffect(() => {
    setSome(
      storeProducts.getState().products.cart.some((item) => item.id === id)
    );
    const unsubscribe = storeProducts.subscribe(() => {
      setSome(
        storeProducts.getState().products.cart.some((item) => item.id === id)
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="cart">
        <Link
          to={"/cart"}
          onClick={() => {
              updateOne(some ? "" : "add", "cart", id, 1);
              storeCartState.dispatch(setCartStateKey({key: "tovari", value: "end"}))
              storeCartState.dispatch(setCartStateKey({key: "delivery", value: "middle"}))
          }}
        >
          Купить в 1 клик
        </Link>
        <div
          className={`cartbutton arbuttons ${some ? "remove" : "add"}`}
          onClick={() => updateOne(some ? "remove" : "add", "cart", id, 1)}
        ></div>
      </div>
    </>
  );
}

export default CardUpdate;
