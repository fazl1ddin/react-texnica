import { useState } from "react";
import * as img from "../img/index";
import { storeProducts, storeUser } from "../store";
import { setModule } from "../store/products";
import Input from "./Input/Input";
import config from "../api/config";
import { setUser } from "../store/user";

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
    let obj = {};
    login.forEach((item, index) => {
      obj[item.name] = item.value;
    });
    // dispatch(Auth({logType: 'pass', obj}))
    await fetch(config.baseUrl + "/login", {
      method: "POST",
      body: JSON.stringify({ logType: "pass", obj }),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.user) {
          setLogin(initialLogin);
          storeUser.dispatch(setUser(result));
          storeProducts.dispatch(setModule({ data: result.user }));
          localStorage.setItem("token", result.token);
        }
      })
      .catch((e) => {
        if (localStorage.getItem("products")) {
          storeProducts.dispatch(
            setModule({ data: JSON.parse(localStorage.getItem("products")) })
          );
        } else {
          localStorage.setItem("products", JSON.stringify({}));
        }
      });
    setModal(" ");
  }

  async function submitSingUp() {
    let obj = {};
    singUp.forEach((item, index) => {
      obj[item.name] = item.value;
    });
    // dispatch(Auth({logType: 'pass', obj}))
    await fetch(config.baseUrl + "/sing-up", {
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.user) {
          setSingUp(initialSingUp);
          storeUser.dispatch(setUser(result));
          storeProducts.dispatch(setModule({ data: result.user }));
          localStorage.setItem("token", result.token);
        }
      })
      .catch((e) => {
        if (localStorage.getItem("products")) {
          storeProducts.dispatch(
            setModule({ data: JSON.parse(localStorage.getItem("products")) })
          );
        } else {
          localStorage.setItem("products", JSON.stringify({}));
        }
      });
    setModal(" ");
  }

  const [modal, setModal] = state;
  return modal !== " " ? (
    <div
      className="forModal"
      onClick={(e) => {
        setModal(" ");
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`centerWrap ${modal === "login" ? "singIn" : "singUp"}`}
      >
        {modal === "login" ? (
          <>
            <div className="modalTitle">
              <h2>Вход</h2>
              <div className="x" onClick={() => setModal(" ")}>
                <img src={img.x} alt="" />
              </div>
            </div>
            <div className="modalBody">
              <form>
                {login.map((item) => (
                  <Input key={item.name} {...item} setState={setLogin} />
                ))}
                <a href="">Забыли пароль?</a>
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
                <a onClick={() => setModal("singUp")}>Зарегистрироваться</a>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="modalTitle">
              <h2>Регистрация</h2>
              <div className="x">
                <img src={img.x} onClick={() => setModal(" ")} />
              </div>
            </div>
            <div className="modalBody">
              <form>
                {singUp.map((item) => (
                  <Input key={item.name} {...item} setState={setSingUp} />
                ))}
                <p>
                  Регистрируясь, вы соглашаетесь с&nbsp;
                  <a href="">пользовательским соглашением</a>
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
                <a onClick={() => setModal("login")}>Войти</a>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
}

export default LoginOrRegister;
