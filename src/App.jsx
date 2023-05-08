import React from "react";
import './css/App.css';
import * as img from './img/index';
import { Link, Route, Routes } from "react-router-dom";
import IndexMain from './views/IndexMain';
import { useState } from "react";
import DropDown from './contexts/dropDown'
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Product from "./views/Product";
import Viewed from './views/Viewed';
import Favorites from './views/Favorites';
import Compare from './views/Compare';
import Cart from './views/Cart';
import AboutUs from './views/AboutUs';
import Warranty from './views/Warranty';
import NewContent from "./views/New";
import News from "./views/News";
import Promo from "./views/Promo";
import Promos from "./views/Promos";
import Catalog from "./views/Catalog";
import { clearUser, setLoading, setUser } from "./store/user";
import { useEffect } from "react";
import LoginButton from "./components/Loaders/LoginButton";
import Auth from "./store/auth";
import { useRef } from "react";
import { setModule } from "./store/products";
import config from "./api/config";
import { storeProducts, storeResultCheck, storeUser } from "./store";
import RouterDots from "./components/RouterDots/RouterDots";

const DropDownElem = styled.ul`
    &.open {
        height: ${props => props.elementHeight}px;
    }
`

const droProfile = [
    {
        path: '/profile',
        stateTab: 'allData',
        title: 'Общие сведения'
    },
    {
        path: '/profile',
        stateTab: 'personData',
        title: 'Личные данные'
    },
    {
        path: '/profile',
        stateTab: 'historyShop',
        title: 'История покупок'
    },
    {
        path: '/favorites',
        title: 'Избранное'
    },
    {
        path: '/profile',
        stateTab: 'changePass',
        title: 'Сменить пароль'
    },
]

function App(){
    const dispatch = useDispatch()

    const forNavDrop = useRef()

    const [navHeight, setNavHeight] = useState(0)

    const forProfileDrop = useRef()

    const [modules, setModules] = useState({})

    const [profileHeight, setProfileHeight] = useState(0)

    const [loadingState, setLoadingState] = useState(true)

    const [Suzer, setSuzer] = useState(undefined)

    const [loading, setLoading] = useState(true)

    const [droProfileB, setDroProfile] = useState(false)

    const [dropDown, setDropDown] = useState(false)

    const [modal, setModal] = useState(' ')

    const [login, setLogin] = useState([
        {
            title: 'Эл. почта или телефон',
            name: 'iden',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        },
        {
            title: 'Пароль',
            name: 'password',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        }
    ])

    const [singUp, setSingUp] = useState([
        {
            title: 'Имя',
            name: 'name',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        },
        {
            title: 'Эл. почта',
            name: 'mail',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        },
        {
            title: 'Номер телефона',
            name: 'phone',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        },
        {
            title: 'Пароль',
            name: 'password',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        }
    ])

    useEffect(() => {
        if(localStorage.getItem('token')){
            (
                async () => {
                    await fetch(config.baseUrl + '/login', {method: 'POST', body: JSON.stringify({
                        logType: 'token',
                        token: localStorage.getItem('token')
                    })})
                    .then(result => result.json())
                    .then(result => {
                        if(result.message){
                            localStorage.removeItem('token')
                            setLoadingState(false)
                        } else {
                            storeUser.dispatch(setUser(result))
                            storeProducts.dispatch(setModule({data: result.user}))
                            setLoadingState(false)
                        }
                    })
                    .catch(error => {
                        if(error){
                            console.log(error);
                        }
                    })
                }
            )()
        } else {
            if(!localStorage.getItem('products')){
                localStorage.setItem('products', JSON.stringify({
                    allProducts: [],
                    cart: [],
                    favorites: [],
                    compare: [],
                    viewed: [],
                }))
            }
            storeProducts.dispatch(setModule({
                data: localStorage.getItem('products') && JSON.parse(localStorage.getItem('products'))
            }))
            setLoading(false)
            setLoadingState(false)
        }
    }, [])

    storeUser.subscribe(() => {
        const {loading, user} = storeUser.getState().user
        setLoading(loading)
        setSuzer(user)
    })

    storeProducts.subscribe(() => {
        setModules(storeProducts.getState().products)
    })

    useEffect(() => {
        if(forNavDrop.current){
            setNavHeight(Number(forNavDrop.current.offsetHeight))
        }
    }, [forNavDrop.current])

    useEffect(() => {
        if(forProfileDrop.current){
            setProfileHeight(Number(forProfileDrop.current.offsetHeight))
        }
    }, [forProfileDrop.current])

    return (<>
    {modal != ' ' ? modal == 'login' ? <div className="forModal">
        <div className="centerWrap singIn">
            <div className="modalTitle">
                <h2>Вход</h2>
                <div className="x" onClick={() => setModal(' ')}>
                    <img src={img.x}/>
                </div>
            </div>
            <div className="modalBody">
                <form>
                    {
                        login.map((item, index) => <React.Fragment key={item.name}>
                            <label htmlFor={item.name}>{item.title}</label>
                            <input type="text" value={item.value} name="text" id={item.name} onChange={e => {
                                setLogin(login.map((item, i) => {
                                    if(index == i) return {
                                        ...item,
                                        value: e.target.value,
                                        valid: item.pattern.test(item.value),
                                    }
                                    return item
                                }))
                            }}/>
                        </React.Fragment>)
                    }
                    <a href="">Забыли пароль?</a>
                    <div>
                        <input type="checkbox" name="save" id="save" />
                        <label htmlFor="save">Запомнить меня</label>
                    </div>
                    <button type="button" onClick={async () => {
                        let obj = {};
                        login.forEach((item, index) => {
                            obj[item.name] = item.value
                        })
                        // dispatch(Auth({logType: 'pass', obj}))
                        await fetch(config.baseUrl + '/login', {method: 'POST', body: JSON.stringify({logType: 'pass', obj})})
                        .then(result => result.json())
                        .then(result => {
                            if(result.user){
                                storeUser.dispatch(setUser(result))
                                storeProducts.dispatch(setModule({data: result.user}))
                                localStorage.setItem('token', result.token)
                            }
                        })
                        .catch(e => {
                            if(localStorage.getItem('products')){
                                dispatch(setModule({data: JSON.parse(localStorage.getItem('products'))}))
                            } else {
                                localStorage.setItem('products', JSON.stringify({}))
                            }
                        })
                        setModal(' ')
                    }}>Войти</button>
                    <a onClick={() => setModal('singUp')}>Зарегистрироваться</a>
                </form>
            </div>
        </div>
    </div> : <div className="forModal">
        <div className="centerWrap singUp">
            <div className="modalTitle">
                <h2>Регистрация</h2>
                <div className="x">
                    <img src={img.x} onClick={() => setModal(' ')}/>
                </div>
            </div>
            <div className="modalBody">
                <form>
                    {
                        singUp.map((item, index) => <React.Fragment key={item.name}>
                            <label htmlFor={item.name}>{item.title}</label>
                            <input type="text" value={item.value} id={item.name} onChange={e => {
                                setSingUp(singUp.map((item, i) => {
                                    if(index == i) return {
                                        ...item,
                                        value: e.target.value,
                                        valid: item.pattern.test(item.value),
                                    }
                                    return item
                                }))
                            }}/>
                        </React.Fragment>)
                    }
                    <p>Регистрируясь, вы соглашаетесь с&nbsp;<a href="">пользовательским соглашением</a></p>
                    <button type="button" onClick={() => {}}>Зарегистрироваться</button>
                    <a onClick={() => setModal('login')}>Войти</a>
                </form>
            </div>
        </div>
    </div> : null}
    <div className="headerNav">
        <div className="window">
            <div className="headerNavContent">
                <Link to='/' className="headerNavLogo">
                    <img src={img.logo}/>
                </Link>
                <div className="headerNavContacts">
                    <p>+7 (812) 660-50-54</p>
                    <p className="center-margin-20">+7 (958) 111-95-03</p>
                    <p className="c-838">Пн-вс: с 10:00 до 21:00</p>
                </div>
                <div className="headerNavSearch">
                    {
                        Suzer !== undefined ? (
                            <DropDownElem elementHeight={6 * profileHeight} className={`profileDrop ${droProfileB ? 'open' : ''}`}>
                                <ul>
                                    {
                                        droProfile.map(item => (
                                            <li key={item.title}>
                                                <Link to={item.path} state={item.stateTab}>
                                                    {
                                                        item.title
                                                    }
                                                </Link>
                                            </li>
                                        ))
                                    }
                                    <li ref={forProfileDrop}>
                                        <a onClick={() => {
                                            localStorage.removeItem('token')
                                            storeUser.dispatch(clearUser())
                                            setDroProfile(false)
                                            if(localStorage.getItem('products')){
                                                dispatch(setModule({data: JSON.parse(localStorage.getItem('products'))}))
                                            } else {
                                                localStorage.setItem('products', JSON.stringify({
                                                    cart: Suzer.cart,
                                                    favorites: Suzer.favorites,
                                                    viewed: Suzer.viewed,
                                                    compare: Suzer.compare
                                                }))
                                            }
                                        }}>
                                            Выйти
                                        </a>
                                    </li>
                                </ul>
                            </DropDownElem>
                        ) : null
                    }
                    <button className="sbutton">
                        <img src={img.searchIcon}/>
                        Поиск
                    </button>
                    <RouterDots loading={loadingState} routers={modules}/>
                    {loading ? <LoginButton></LoginButton> : Suzer ? <div onClick={() => {
                        setDroProfile(!droProfileB)
                    }}>
                        <div style={{width: 100,  display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <img src={img.profile} alt="" />
                        </div>
                    </div> 
                    : <button className="headerButton" onClick={() => setModal('login')}>Войти</button>}
                </div>
            </div>
        </div>
    </div>
    <div className="navbar">
        <div className="window">
            <div className="navbarContent">
                <div className="navbarContentBox">
                    <Link to="/" className="maiNiz">
                        <img src={img.mainNiz}/>
                        <p>Главная</p>
                    </Link>
                    <div className="dropdownCatalog" onClick={() => setDropDown(!dropDown)}>
                        <img src={img.menuIcon} alt=""/>
                        <p>Каталог<span> товаров</span></p>
                    </div>
                    <Link to="/cart" className="cartNiz dota">
                        <img src={img.cartNiz}/>
                        <span className="dotspan" v-if="length('cart') !== 0"></span>
                        <p>Корзина</p>
                    </Link>
                    <div className="searchNiz">
                        <img src={img.searchIconNiz}/>
                        <p>Поиск</p>
                    </div>
                    <div className="moreNiz">
                        <img src={img.more}/>
                        <span className="dotyellow" v-if="(length('cart') + length('compare') + length('favorites')) !== 0"></span>
                        <p>Ещё</p>
                    </div>
                </div>
                    <DropDownElem elementHeight={11 * navHeight} className={`dropdownElem ${dropDown ? 'open' : ''}`}>
                        <div className="title">
                            <h1>Каталог</h1>
                            <button>&#215;</button>
                        </div>
                        <li ref={forNavDrop}>
                            <a href="">
                                <img src={img.iconMenu1} alt=""/>
                                Гироскутеры
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={img.iconMenu2} alt=""/>
                                Электросамокаты
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={img.iconMenu3} alt=""/>
                                Моноколеса
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={img.iconMenu4} alt=""/>
                                Сигвеи и мини-сигвеи
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={img.iconMenu5} alt=""/>
                                Электроскутеры
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={img.iconMenu6} alt=""/>
                                Электровелосипеды
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={img.iconMenu7} alt=""/>
                                Электроскейты
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={img.iconMenu8} alt=""/>
                                Электромобили
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={img.iconMenu9} alt=""/>
                                Аксессуары
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={img.iconMenu10} alt=""/>
                                Умные игрушки
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img src={img.iconMenu11} alt=""/>
                                Smart Watch
                            </a>
                        </li>
                    </DropDownElem>
                    <ul className="more" v-else-if="menu.more">
                        <div className="title">
                            <h1>Ещё</h1>
                            <button>&#215;</button>
                        </div>
                        <div className="navs">
                            <Link key="i" to="router.to" className="dota">
                                <span className="dotspan"></span>
                                <img className="router.className" src="router.src"/>
                            </Link>
                        </div>
                        <li>
                            <a>О компании</a>
                        </li>
                        <li>
                            <a>Акции</a>
                        </li>
                        <li>
                            <a>Рассрочка 0–0-12</a>
                        </li>
                        <li>
                            <a>Сервис и ремонт</a>
                        </li>
                        <li>
                            <a>Опт/дропшиппинг</a>
                        </li>
                        <li>
                            <a>Контакты</a>
                        </li>
                    </ul>
                    <ul className="search">
                        <div className="title">
                            <h1>Поиск</h1>
                            <button>&#215;</button>
                        </div>
                        <input type="text" placeholder="Введите запрос, например «Smart balance»"/>
                    </ul>
                <ol className="navbarul">
                    <li>
                        <a href="">О компании</a>
                    </li>
                    <li>
                        <a href="">Акции</a>
                    </li>
                    <li>
                        <a href="">Рассрочка 0|0|18</a>
                    </li>
                    <li>
                        <a href="">Сервис и гарантия</a>
                    </li>
                    <li>
                        <a href="">Опт/дропшиппинг</a>
                    </li>
                    <li>
                        <a href="">Контакты</a>
                    </li>
                </ol>
            </div>
        </div>
    </div>
    <Routes>
        <Route path="/" element={
            <DropDown.Provider value={dropDown}>
                <IndexMain/>
            </DropDown.Provider>}>
        </Route>,
        <Route path="/product/:id" element={<Product/>}></Route>,
        <Route path="/viewed" element={<Viewed/>}/>
        <Route path="/favorites" element={<Favorites setModal={setModal}/>}></Route>,
        <Route path="/compare" element={<Compare/>}></Route>,
        <Route path="/cart" element={<Cart/>}></Route>,
        <Route path="/about-us" element={<AboutUs/>}></Route>,
        <Route path="/warranty" element={<Warranty/>}></Route>,
        <Route path="/new/:id" element={<NewContent/>}></Route>,
        <Route path="/news" element={<News/>}></Route>,
        <Route path="/promo/:id" element={<Promo/>}></Route>,
        <Route path="/promos" element={<Promos/>}></Route>,
        <Route path="/catalog" element={<Catalog/>}></Route>,
    </Routes>
    <div className="footer">
        <div className="window">
            <div className="footerContent">
                <div className="logo">
                    <img src={img.logo}/>
                    <h2>+7 (958) 111-95-03</h2>
                    <h2>+7 (812) 660-50-54</h2>
                    <h4>Пн-вс: с 10:00 до 21:00</h4>
                    <p>Проспект Стачек 67 к.5</p>
                    <p>Лиговский проспект 205</p>
                    <p>Гражданский проспект, 116 к.5</p>
                </div>
                <ul>
                    <h2>Для клиента</h2>
                    <li>
                        <a href="">Как купить</a>
                    </li>
                    <li>
                        <a href="">Доставка и оплата</a>
                    </li>
                    <li>
                        <a href="">Кредит</a>
                    </li>
                    <li>
                        <a href="">Политика конфиденциальности</a>
                    </li>
                    <li>
                        <a href="">Вопросы и ответы (F.A.Q.)</a>
                    </li>
                    <li>
                        <a href="">Сервис и гарантия</a>
                    </li>
                </ul>
                <ul>
                    <h2>О магазине</h2>
                    <li>
                        <a href="">Отзывы</a>
                    </li>
                    <li>
                        <a href="">Наши преимущества</a>
                    </li>
                    <li>
                        <a href="">История компании</a>
                    </li>
                    <li>
                        <a href="">Сотрудничество</a>
                    </li>
                    <li>
                        <a href="">Партнёрская программа</a>
                    </li>
                    <li>
                        <a href="">Вакансии</a>
                    </li>
                </ul>
                <ul className="drop">
                    <h2>Сотрудничество</h2>
                    <li>
                        <a href="">Оптом</a>
                    </li>
                    <li>
                        <a href="">Дропшиппинг</a>
                    </li>
                </ul>
                <ul className="servisf">
                    <h2>Сервис и ремонт</h2>
                    <li>
                        <a href="">Ремонт гироскутеров и гироциклов</a>
                    </li>
                    <li>
                        <a href="">Ремонт моноколес и моноциклов</a>
                    </li>
                    <li>
                        <a href="">Ремонт сигвеев и мини сигвеев</a>
                    </li>
                    <li>
                        <a href="">Ремонт электроквадроциклов</a>
                    </li>
                    <li>
                        <a href="">Ремонт электроскейтов</a>
                    </li>
                    <li>
                        <a href="">Ремонт электроскутеров</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div className="copyright">
        <div className="window">
            <div className="copyrightContent">
                <div className="copytexts">
                    <p>SmartТехника © 2021 Все права защищены</p>
                    <h6>Разработка: fazl1dd1n</h6>
                </div>
                <div className="icons">
                    <img src={img.twitter}/>
                    <img src={img.facebook}/>
                    <img src={img.vk}/>
                    <img src={img.instagram}/>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

export default App