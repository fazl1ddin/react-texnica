import { useEffect, useState } from "react";
import "../css/Profile.css";
import { Link, useSearchParams } from "react-router-dom";
import Input from "../components/Input/Input";
import useGetData from "../hooks/getData";
import config from "../api/config";
import useGetDWP from "../hooks/getDWP";
import Pagination from "../components/Pagination/Pagination";
import { logout } from "../store";

const tabs = [
  {
    stateTab: "allData",
    title: "Общие сведения",
  },
  {
    stateTab: "personData",
    title: "Личные данные",
  },
  {
    stateTab: "historyShop",
    title: "История покупок",
  },
  {
    path: "/favorites",
    title: "Избранное",
  },
  {
    stateTab: "changePass",
    title: "Сменить пароль",
  },
];

const initialInputs = [
  {
    title: "Имя",
    placeholder: "Имя",
    type: "text",
    pattern: /[0-9\\.,:]/,
    name: "name",
    value: "",
  },
  {
    title: "Адрес",
    placeholder: "Адрес",
    type: "text",
    pattern: /[0-9\\.,:]/,
    name: "address",
    value: "",
  },
  {
    title: "Эл. почта",
    placeholder: "Эл. почта",
    type: "email",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    name: "mail",
    value: "",
  },
  {
    title: "Предпочитаемый способ оплаты",
    placeholder: "Предпочитаемый способ оплаты",
    type: "select",
    name: "typePay",
    value: "",
    options: [],
  },
  {
    title: "Телефон",
    placeholder: "Телефон",
    name: "phone",
    pattern: /\+7 \(\d{3}\) \d{3} \d{2} \d{2}/,
    type: "phone",
    value: "",
  },
  {
    title: "Предпочитаемый способ доставки",
    placeholder: "Предпочитаемый способ доставки",
    type: "select",
    name: "typeDeliv",
    value: "",
    options: [{ title: "asfafaf", value: "afasfa" }],
  },
  {
    title: "Город",
    placeholder: "Город",
    name: "city",
    type: "text",
    value: "",
  },
  {
    title: "Аватар",
    placeholder: "Аватар",
    name: "avatar",
    type: "file",
    value: "",
  },
  {
    title: "Индекс",
    placeholder: "Индекс",
    name: "index",
    type: "number",
    value: "",
  },
];

const passputs = [
  {
    title: "Введите старый пароль",
    name: "oldPassword",
    value: "",
    pattern: /^.{8,}$/,
    valid: 0,
    placeholder: "Введите старый пароль",
    type: "password",
    visible: false,
  },
  {
    title: "Введите новый пароль",
    name: "newPassword",
    value: "",
    pattern: /^.{8,}$/,
    valid: 0,
    placeholder: "Введите новый пароль",
    type: "password",
    visible: false,
  },
  {
    title: "Повторите новый пароль",
    name: "rePassword",
    value: "",
    pattern: /^.{8,}$/,
    valid: 0,
    placeholder: "Повторите новый пароль",
    type: "password",
    visible: false,
  },
];

function Profile({ user }) {
  const [params, setParams] = useSearchParams();
  const [active, setActive] = useState(
    params.has("active") ? params.get("active") : "allData"
  );
  const [inputs, setInputs] = useState([
    ...initialInputs.map((item) => {
      if (user[item.name]) {
        item.value = user[item.name];
      }
      return item;
    }),
  ]);
  const [passinputs, setPassinputs] = useState([...passputs]);
  const [dis, setDis] = useState(true);
  const [typePays, tLoading] = useGetData("/type-pays", []);
  const [page, setPage] = useState(
    Number(params.has("index") ? params.get("index") : 1)
  );

  useEffect(() => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("active", active || 'allData')
    setParams(newSearchParams);
  }, [active]);

  useEffect(() => {
    setActive(params.get("active"))
  }, [params])

  useEffect(() => {
    if (tLoading === false) {
      setInputs((prevstate) =>
        prevstate.map((item, index) => {
          if (item.name === "typePay") {
            return {
              ...item,
              options: typePays,
            };
          }
          return item;
        })
      );
    }
  }, [tLoading]);

  useEffect(() => {
    if (passinputs[1].value !== "" && passinputs[2].value !== "") {
      setDis(!(passinputs[1].value === passinputs[2].value));
    }
  }, [passinputs]);

  const [{ data: orders, allength, productsL }, loading] = useGetDWP(
    "/user-orders",
    page,
    6,
    { userId: user._id }
  );
  let tab = (
    <div className="allData">
      <h2>{user.name}</h2>
      <div className="profileADO">
        <div className="profileAvatar">
          {user.photo ? (
            <img src="" alt="" />
          ) : (
            <div
              style={{
                border: "1px solid black",
                width: "100%",
                height: "100%",
              }}
            >
              :(
            </div>
          )}
        </div>
        <div className="profileDO">
          <p>Дата регистрации: {user.dateReg}</p>
          <p>Заказов: {productsL}</p>
        </div>
      </div>
      <div className="profileText">
        Добро пожаловать в панель управления. Здесь вы можете{" "}
        <span>изменить свои регистрационные данные</span> и <span>cменить пароль</span>.
        Зарегистрированные пользователи имеют доступ к <span>истории заказов</span>{" "}
        и возможность <span>добавлять в избранное товары для будущих покупок</span>.
      </div>
    </div>
  );

  switch (active) {
    case "personData":
      tab = (
        <div className="personData">
          {inputs.map((item, index) => (
            <Input
              key={index}
              {...item}
              validator={false}
              setState={setInputs}
            />
          ))}
          <button
            className="zakazat ready"
            onClick={async () => {
              const form = new FormData();
              inputs.forEach((item, index) => {
                form.append(item.name, item.value);
              });
              await fetch(config.baseUrl + "/update-profile", {
                method: "POST",
                body: form,
              });
            }}
          >
            Сохранить
          </button>
        </div>
      );
      break;
    case "historyShop":
      tab = (
        <div className="historyShop">
          <h1>История покупок</h1>
          {loading ? (
            <>asfasag</>
          ) : (
            orders.map((item, index) => (
              <div key={index}>
                <p>
                  Заказ #{Math.abs(productsL * -1 + index + 6 * (page - 1))} от 
                  {new Intl.DateTimeFormat("ru", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  }).format(item.date)}
                </p>
                <p>
                  {item.products.length} товара на сумму {item.price} ₽
                </p>
                <p data-status={item.status}>
                  {item.status === 0
                    ? "Заказан"
                    : item.status === 1
                    ? "В процессе"
                    : "Выполнен"}
                </p>
              </div>
            ))
          )}
          <Pagination length={allength} setPage={setPage} />
        </div>
      );
      break;
    case "changePass":
      tab = (
        <div className="changePass">
          {passinputs.map((item, index) => (
            <Input
              key={index}
              {...item}
              validator={true}
              setState={setPassinputs}
            />
          ))}
          <button
            className={`zakazat ${dis ? "" : "ready"} mt-20`}
            disabled={dis}
            onClick={async () => {
              let form = {};
              passinputs.forEach((item) => {
                form[item.name] = item.value;
              });
              form.userId = user._id;
              await fetch(config.baseUrl + "/change-password", {
                method: "POST",
                body: JSON.stringify(form),
              });
            }}
          >
            Сохранить изменения
          </button>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="profile">
      <div className="window">
        <h1>Общие сведения</h1>
        <div className="profileTabs">
          <div className="profileTabButtons">
            {tabs.map((item, index) =>
              item.path === undefined ? (
                <div
                  key={index}
                  onClick={() => {
                    setActive(item.stateTab);
                  }}
                  className={active === item.stateTab ? "active" : undefined}
                >
                  {item.title}
                </div>
              ) : (
                <Link key={index} to={item.path}>
                  {item.title}
                </Link>
              )
            )}
            <p onClick={logout}>Выйти</p>
          </div>
          <div className="profileTabContent">{tab}</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
