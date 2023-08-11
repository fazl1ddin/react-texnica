import { useState } from "react";
import "../css/Profile.css";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";

const tabs = [
  {
    path: "/profile",
    stateTab: "allData",
    title: "Общие сведения",
  },
  {
    path: "/profile",
    stateTab: "personData",
    title: "Личные данные",
  },
  {
    path: "/profile",
    stateTab: "historyShop",
    title: "История покупок",
  },
  {
    path: "/favorites",
    title: "Избранное",
  },
  {
    path: "/profile",
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

function Profile({ user }) {
  const [active, setActive] = useState("personData");
  const [inputs, setInputs] = useState([
      ...initialInputs.map((item) => {
          if (user[item.name]) {
            item.value = user[item.name]
          }
          return item
    }),
  ]);
  const orders = 0;
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
          <p>Заказов: {orders}</p>
        </div>
      </div>
      <div className="profileText">
        Добро пожаловать в панель управления. Здесь вы можете{" "}
        <a>изменить свои регистрационные данные</a> и <a>cменить пароль</a>.
        Зарегистрированные пользователи имеют доступ к <a>истории заказов</a>{" "}
        и возможность <a>добавлять в избранное товары для будущих покупок</a>.
      </div>
    </div>
  );

  switch (active) {
    case "personData":
      tab = (
        <div className="personData">
          {inputs.map((item, index) => (
            <Input key={index} {...item} setState={setInputs} />
          ))}
              <button className="zakazat ready" onClick={async () => {
                  fetch('asfaf.com', {method: "POST", body: JSON.stringify(inputs)})
              }}>Сохранить</button>
        </div>
      );
      break;
    default:
      break;
  }
  
    console.log(inputs);

  return (
    <div className="profile">
      <div className="window">
        <h1>Общие сведения</h1>
        <div className="profileTabs">
          <div className="profileTabButtons">
            {tabs.map((item, index) =>
              item.path === "/profile" ? (
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
          </div>
          <div className="profileTabContent">{tab}</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
