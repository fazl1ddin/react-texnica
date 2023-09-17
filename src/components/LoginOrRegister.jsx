import { useEffect, useState } from "react";
import * as img from "../img/index";
import { storeProducts, storeUser } from "../store";
import { setModule } from "../store/products";
import Input from "./Input/Input";
import config from "../api/config";
import { setUser } from "../store/user";
import { message } from "../utils/message";

const initialSingUp = [
  {
    title: "Имя",
    name: "name",
    value: "",
    pattern: /[0-9\\.,:]/,
    valid: 0,
    placeholder: "Имя",
    type: "text",
    validator: true,
  },
  {
    title: "Эл. почта",
    name: "mail",
    value: "",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    valid: 0,
    placeholder: "Эл. почта",
    type: "email",
    validator: true,
  },
  {
    title: "Номер телефона",
    name: "phone",
    value: "",
    pattern: /\+7 \(\d{3}\) \d{3} \d{2} \d{2}/,
    valid: 0,
    placeholder: "+7 (___) ___ __ __",
    type: "phone",
    validator: true,
  },
  {
    title: "Пароль",
    name: "password",
    value: "",
    pattern: /^.{8,}$/,
    valid: 0,
    placeholder: "Пароль",
    type: "password",
    visible: false,
    validator: true,
  },
];

const initialLogin = [
  {
    title: "Эл. почта или телефон",
    name: "iden",
    value: "",
    pattern: /[0-9\\.,:]/,
    valid: 0,
    placeholder: "Эл. почта или телефон",
    type: "text",
  },
  {
    title: "Пароль",
    placeholder: "Пароль",
    name: "password",
    value: "",
    pattern: /[0-9\\.,:]/,
    valid: 0,
    type: "password",
  },
];

function LoginOrRegister({ state }) {
  const [login, setLogin] = useState([...initialLogin]);

  const [singUp, setSingUp] = useState([...initialSingUp]);

  async function submitLogin() {
    const obj = Object.fromEntries(
      login.map((item) => [item.name, item.value])
    );
    // login.forEach((item, index) => {
    //   obj[item.name] = item.value;
    // });
    try {
      const result = await fetch(config.baseUrl + "/login", {
        method: "POST",
        body: JSON.stringify({ logType: "pass", obj }),
      }).then((res) => res.json());
      if (result.user) {
        setLogin(initialLogin);
        storeUser.dispatch(setUser(result));
        storeProducts.dispatch(setModule({ data: result.user }));
        localStorage.setItem("token", result.token);
        closeModal("singIn");
      } else if (result.message) {
        message(result.message);
      } else {
        message("Ne predvidennaya oshibka");
      }
    } catch (error) {
      console.log(error);
      if (localStorage.getItem("products")) {
        storeProducts.dispatch(
          setModule({ data: JSON.parse(localStorage.getItem("products")) })
        );
      } else {
        localStorage.setItem("products", JSON.stringify({}));
      }
    }
    // dispatch(Auth({logType: 'pass', obj}))
    // await fetch(config.baseUrl + "/login", {
    //   method: "POST",
    //   body: JSON.stringify({ logType: "pass", obj }),
    // })
    //   .then((result) => result.json())
    //   .then((result) => {
    //     if (result.user) {
    // setLogin(initialLogin);
    // storeUser.dispatch(setUser(result));
    // storeProducts.dispatch(setModule({ data: result.user }));
    // localStorage.setItem("token", result.token);
    //     }
    //   })
    //   .catch((e) => {
    //     if (localStorage.getItem("products")) {
    //       storeProducts.dispatch(
    //         setModule({ data: JSON.parse(localStorage.getItem("products")) })
    //       );
    //     } else {
    //       localStorage.setItem("products", JSON.stringify({}));
    //     }
    //   });
    // closeModal("singIn");
  }

  async function submitSingUp() {
    const obj = Object.fromEntries(
      singUp.map((item) => [item.name, item.value])
    );
    // login.forEach((item, index) => {
    //   obj[item.name] = item.value;
    // });
    try {
      const result = await fetch(config.baseUrl + "/sing-up", {
        method: "POST",
        body: JSON.stringify(obj),
      }).then(async (res) => {
        return {
          data: await res.json(),
          status: res.status
        }
      });
      if (result.data.user) {
        setSingUp(initialSingUp);
        storeUser.dispatch(setUser(result.data));
        storeProducts.dispatch(setModule({ data: result.data.user }));
        localStorage.setItem("token", result.data.token);
        closeModal("singIn");
      } else if (result.status === 422) {
        message(result.data.message);
        setSingUp(prev => prev.map((item) => {
          if (result.data.errors[item.name]) {
            return {
              ...item,
              valid: 2,
              value: ""
            }
          }
          return item
        }))
      } else if (result.data.message) {
        message(result.data.message);
      } else {
        message("Ne predvidennaya oshibka");
      }
    } catch (error) {
      console.log(error);
      if (localStorage.getItem("products")) {
        storeProducts.dispatch(
          setModule({ data: JSON.parse(localStorage.getItem("products")) })
        );
      } else {
        localStorage.setItem("products", JSON.stringify({}));
      }
    }
    // dispatch(Auth({logType: 'pass', obj}))
    // const res = await fetch(config.baseUrl + "/sing-up", {
    //   method: "POST",
    //   body: JSON.stringify(obj),
    // })
    //   .then((result) => result.json())
    //   .then((result) => {
    //     if (result.user) {
    //       setSingUp(initialSingUp);
    //       storeUser.dispatch(setUser(result));
    //       storeProducts.dispatch(setModule({ data: result.user }));
    //       localStorage.setItem("token", result.token);
    //     }
    //   })
    //   .catch((e) => {
    // if (localStorage.getItem("products")) {
    //   storeProducts.dispatch(
    //     setModule({ data: JSON.parse(localStorage.getItem("products")) })
    //   );
    // } else {
    //   localStorage.setItem("products", JSON.stringify({}));
    // }
    //   });
    // closeModal("singUp");
  }

  const [modal, setModal] = state;

  useEffect(() => {
    if (modal !== " ") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modal]);

  function closeModal(id) {
    const element = document.querySelector("#" + id);
    element.animate(
      [
        {
          transform: "scale(1)",
        },
        {
          transform: "scale(0.1)",
        },
      ],
      {
        duration: 300,
      }
    );
    setTimeout(() => setModal(" "), 300);
  }

  return (
    <div
      className={`forModal ${modal === " " ? "w-0h-0" : ""}`}
      onClick={() =>
        modal !== " " && closeModal(modal === "login" ? "singIn" : "singUp")
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`centerWrap ${modal === "login" ? "singIn" : ""}`}
        id="singIn"
      >
        <div className="modalTitle">
          <h2>Вход</h2>
          <div className="x" onClick={() => closeModal("singIn")}>
            <img src={img.x} alt="" />
          </div>
        </div>
        <div className="modalBody">
          <form>
            {login.map((item) => {
              return <Input key={item.name} {...item} setState={setLogin} />;
            })}
            <p className="">Забыли пароль?</p>
            <div>
              <input type="checkbox" name="save" id="save" />
              <label htmlFor="save">Запомнить меня</label>
            </div>
            <button
              type="button"
              className={`${
                login.every((item) => Boolean(item.value)) ? "ready" : ""
              }`}
              onClick={submitLogin}
            >
              Войти
            </button>
            <p className="alsoa" onClick={() => setModal("singUp")}>
              Зарегистрироваться
            </p>
          </form>
        </div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`centerWrap ${modal === "singUp" ? "singUp" : ""}`}
        id="singUp"
      >
        <div className="modalTitle">
          <h2>Регистрация</h2>
          <div className="x">
            <img alt="" src={img.x} onClick={() => closeModal("singUp")} />
          </div>
        </div>
        <div className="modalBody">
          <form>
            {singUp.map((item) => {
              return <Input key={item.name} {...item} setState={setSingUp} />;
            })}
            <p>
              Регистрируясь, вы соглашаетесь с&nbsp;
              <span className="alsoa">пользовательским соглашением</span>
            </p>
            <button
              className={`${
                singUp.every((item) => item.valid === 1) ? "ready" : ""
              }`}
              disabled={!singUp.every((item) => item.valid === 1)}
              type="button"
              onClick={submitSingUp}
            >
              Зарегистрироваться
            </button>
            <p className="alsoa" onClick={() => setModal("login")}>
              Войти
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginOrRegister;
