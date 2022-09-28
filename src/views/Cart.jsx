import React, { useLayoutEffect } from 'react';
import '../css/Cart.css';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findById } from '../store/index';
import { remove, changeCount } from '../store/products';
import * as img from '../img/index';
import { useState } from 'react';
import { useEffect } from 'react';

const wayget = {
    checkeDel: false,
    checkedPick: false,
    delivery: {
        city: [
            'Санкт-Петербург',
            'Питер',
            'Москва',
            'Питер2',
            'Екатеринбург',
        ],
        address: {
            date: [
                'Завтра, 11 июля, вс',
                'Завтра, 12 июля, вс',
                'Завтра, 13 июля, вс',
                'Завтра, 14 июля, вс',
            ],
            clock: [
                '15:00–18:00 (бесплатно)',
                '18:00–21:00',
                '21:00–00:00 (бесплатно)',
                '08:00–11:00',
            ],
        }
    },
    pickUp: {
        'Санкт-Петербург': [
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
            {
                address: 'г. Санкт-Петербург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
            },
        ],
        'Питер': [
            {
                address: 'г. Питер, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            }
        ],
        'Москва': [
            {
                address: 'г. Москва, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Москва, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Москва, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Москва, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Москва, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Москва, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            }
        ],
        'Питер2': [
            {
                address: 'г. Питер2, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер2, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер2, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер2, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер2, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер2, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер2, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Питер2, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            }
        ],
        'Екатеринбург': [
            {
                address: 'г. Екатеринбург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Екатеринбург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Екатеринбург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Екатеринбург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Екатеринбург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            },
            {
                address: 'г. Екатеринбург, Бульвар Новаторов, 75',
                date: 'ПН-ВС 09:00 — 22:00',
                check: true
            }
        ]
    },
}

function Cart() {
    const state = useSelector(state => state.products)

    const dispatch = useDispatch()

    const products = useCallback(() => {
        let allProducts = []
        for (let i = 0; i < state.cart.length; i++) {
            allProducts[i] = { ...findById(state.cart[i].id), ...state.cart[i] }
        }
        return allProducts
    }, [state.cart])

    const total = useCallback(() => {
        return products().reduce((prev, next) => prev + next.realPrice * next.count, 0)
    }, [products()])

    const productsCount = () => {
        let arr = {}
        for (let i = 0; i < state.cart.length; i++) {
            arr[i] = state.cart[i].count
        }
        return arr
    }

    const [value, setValue] = useState(productsCount())

    const onBlur = (id, key) => {
        const parsed = Object.values(value).map(item => parseInt(item))
        if (parsed[key] != NaN) {
            setValue({ ...value, key: Math.min(Math.max(parsed[key], 1), 10) })
            dispatch(changeCount({ id, value: Math.min(Math.max(parsed[key], 1), 10) }))
        } else {
            setValue({ ...value, key: 1 })
            dispatch(changeCount({ id, value: 1 }))
        }
    }

    useEffect(() => {
        setValue(productsCount())
    }, [state.cart])

    const [checker, setChecker] = useState({
        tovari: 'start',
        delivery: 'start',
        cash: 'start',
        recipient: 'start',
    })

    const [canSend, setCanSend] = useState(false)

    useEffect(() => {
        if (state.cart.length > 0) setChecker({ ...checker, tovari: 'middle' })
        else setChecker({ ...checker, tovari: 'start' })
    }, [state.cart.length])

    const [settings, setSettings] = useState({
        one: 'pick',
        two: 'Санкт-Петербург',
        three: 'Завтра, 11 июля, вс',
        four: '15:00–18:00 (бесплатно)'
    })

    const [address, setAddress] = useState({
        street: '',
        home: '',
        comment: ''
    })

    const addresses = wayget.pickUp[settings.two]

    const [checked, setChecked] = useState(0)

    const [man, setMan] = useState([
        {
            name: 'Имя',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        },
        {
            name: 'Фамилия',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        },
        {
            name: 'Номер телефона',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        },
        {
            name: 'Эл. почта',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        },
    ])

    useEffect(() => {
        let boolean = false
        if (state.cart.length > 0) {
            boolean = Object.values(checker).every((item) => item == 'end') == true && man.every(item => item.valid == true) == true
        }
        setCanSend(boolean)
    }, [checker, man])

    return (
        <div className="oformleniye">
            <div className="window">
                <h1>Оформление заказа</h1>
                <div className="oforContent">
                    <div className="oforZakaza">
                        <div className="obert">
                            <div className={`vashZakaz ${checker.tovari == 'start' ? 'empty' : checker.tovari == 'end' ? 'end' : ''}`}>
                                <h3 className="pb-0">Ваш заказ</h3>
                                <div className="obb">
                                    <div className="tovari">
                                        {
                                            products().map((product, i) => (
                                                <div className="tovar" key={product.id}>
                                                    <div className="imgt">
                                                        <img className="img" src={product.product.src[0]} />
                                                        <img className="aqua" src={product.protection.src} />
                                                    </div>
                                                    <div className="ff">
                                                        <h4>{product.productName}</h4>
                                                        <form>
                                                            <button type="button" onClick={() => {
                                                                setValue({ ...value, [i]: product.count })
                                                                dispatch(changeCount({ id: product.id, value: Math.max(1, product.count - 1) }))
                                                            }}>-</button>
                                                            <input type="text" value={value[i]} onChange={e => setValue({ ...value, [i]: e.target.value })} onBlur={() => onBlur(product.id, i)} />
                                                            <button type="button" onClick={() => {
                                                                setValue({ ...value, [i]: product.count })
                                                                dispatch(changeCount({ id: product.id, value: Math.min(10, product.count + 1) }))
                                                            }}>+</button>
                                                        </form>
                                                        <div className="price">
                                                            {
                                                                product.price != product.realPrice ? (<del>{product.price} ₽</del>) : undefined
                                                            }
                                                            <h2>{product.realPrice} ₽</h2>
                                                        </div>
                                                        <button className="delete">
                                                            <img src={img.deleteB} onClick={() => dispatch(remove({ module: 'cart', id: product.id }))} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <button className="change" onClick={() => setChecker({ ...checker, tovari: 'middle' })}>Изменить</button>
                                </div>
                            </div>
                            <button className={`dalee ${checker.tovari == 'middle' ? '' : 'none'}`} onClick={() => {
                                setChecker({ ...checker, tovari: 'end', delivery: 'middle' })
                            }}>Далее</button>
                        </div>
                        <div className="obert">
                            <div className={`vashZakaz ${checker.delivery == 'start' ? 'empty' : checker.delivery == 'end' ? 'end' : ''}`}>
                                <h3>Способ получения</h3>
                                <div className="obb">
                                    <form className="delivery">
                                        <div className="to">
                                            <h5 className="type">{'one' == 'deliv' ? 'Доставка ' : 'Самовывоз из'}</h5>
                                            {
                                                settings.one == 'deliv' ? <div>
                                                    <p>{`${settings.two} ${address.street} ${address.home}`}</p>
                                                    <span>{`${settings.three} ${settings.four}`}</span>
                                                </div> :
                                                    <div>
                                                        <p>{addresses[checked].address}</p>
                                                        <span>{addresses[checked].date}</span>
                                                    </div>
                                            }
                                        </div>
                                        <div className="regDel">
                                            <div>
                                                <label htmlFor="cityr">Ваш город</label>
                                                <select id="cityr" onChange={e => setSettings({ ...settings, two: e.target.value })}>
                                                    {
                                                        wayget.delivery.city.map((item) => (
                                                            <option value={item} key={item}>{item}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="pickup">
                                                <div className={settings.one == 'deliv' ? 'active' : ''} onClick={() => setSettings({ ...settings, one: 'deliv' })}>
                                                    <input defaultChecked={settings.one == 'deliv'} type="radio" name="club" id="deliv" value="deliv" />
                                                    <label htmlFor="deliv">Доставка</label>
                                                </div>
                                                <div className={settings.one == 'pick' ? 'active' : ''} onClick={() => setSettings({ ...settings, one: 'pick' })}>
                                                    <input defaultChecked={settings.one == 'pick'} type="radio" name="club" id="pick" value="pick" />
                                                    <label htmlFor="pick">Самовывоз</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`address ${settings.one == 'deliv' ? '' : 'none'}`}>
                                            <div>
                                                <h4>Дата</h4>
                                                <select onChange={e => setSettings({ ...settings, three: e.target.value })}>
                                                    {
                                                        Object.values(wayget.delivery.address.date).map((item) => (
                                                            <option value={item} key={item}>{item}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                <h4>Улица, дом/корпус</h4>
                                                <input type="text" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
                                            </div>
                                            <div>
                                                <h4>Время</h4>
                                                <select onChange={e => setSettings({ ...settings, four: e.target.value })}>
                                                    {
                                                        Object.values(wayget.delivery.address.clock).map((item) => (
                                                            <option value={item} key={item}>{item}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                <h4>Квартира</h4>
                                                <input type="text" value={address.home} onChange={e => setAddress({ ...address, home: e.target.value })} />
                                            </div>
                                            <div className="area">
                                                <h4>Комментарий курьеру</h4>
                                                <textarea cols="30" rows="10" value={address.comment} onChange={e => setAddress({ ...address, comment: e.target.value })}></textarea>
                                            </div>
                                        </div>
                                        <div className={`pick ${settings.one == 'pick' ? '' : 'none'}`}>
                                            <div className="aviable">
                                                <h5>Товар доступен в 15 магазинах</h5>
                                                <div>
                                                    {
                                                        addresses.map((item, i) => (
                                                            <div key={i} onClick={() => setChecked(i)}>
                                                                <input type="radio" name="address" id={i} />
                                                                <label htmlFor={i}>
                                                                    <p>{item.address} </p>
                                                                    <span>{item.date}</span>
                                                                </label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <button type="button" className="yewe" click="nine == eight.length ? nine = 4  nine += eleven"> {'nine' == 'eight.length' ? 'Скрыть' : 'Показать еще ' + 'eleven'}</button>
                                            </div>
                                            <div className="map">

                                            </div>
                                        </div>
                                    </form>
                                    <button className="change" onClick={() => setChecker({ ...checker, delivery: 'middle' })}>Изменить</button>
                                </div>
                            </div>
                            <button className={`dalee mt-10 ${checker.delivery == 'middle' ? '' : 'none'}`} onClick={() => {
                                setChecker({ ...checker, delivery: 'end', cash: 'middle' })
                            }}>Далее</button>
                        </div>
                        <div className="obert">
                            <div className={`vashZakaz ${checker.cash == 'start' ? 'empty' : checker.cash == 'end' ? 'end' : ''}`}>
                                <h3>Способ оплаты</h3>
                                <div className="obb">
                                    <form className="cash">
                                        <select>
                                            <option value="Наличными">Наличными</option>
                                            <option value="Mastercard">Mastercard</option>
                                            <option value="Visa">Visa</option>
                                            <option value="МИР">МИР</option>
                                            <option value="Qiwi">Qiwi</option>
                                        </select>
                                    </form>
                                    <button className="change" onClick={() => {
                                        setChecker({ ...checker, cash: 'middle' })
                                    }}>Изменить</button>
                                </div>
                            </div>
                            <button className={`dalee ${checker.cash == 'middle' ? '' : 'none'}`} onClick={() => {
                                setChecker({ ...checker, recipient: 'end', cash: 'end' })
                            }}>Далее</button>
                        </div>
                        <div className="obert mb-20">
                            <div className={`vashZakaz ${checker.recipient == 'start' ? 'empty' : checker.recipient == 'end' ? 'end' : ''}`}>
                                <h3>Получатель</h3>
                                <form className="recipient">
                                    {
                                        man.map((item, i) => (
                                            <div key={item.name}>
                                                <label htmlFor={item}>{item.name}</label>{item?.valid ? "dd" : ""}
                                                <input type="text" value={item.value} id={item} placeholder="Например, Иван" onChange={e => {
                                                    setMan(man.map((item, j) => {
                                                        if (i == j) {
                                                            return {
                                                                ...item,
                                                                valid: item.pattern.test(item.value),
                                                                value: e.target.value
                                                            }
                                                        }
                                                        return item
                                                    }))
                                                }} />
                                            </div>
                                        ))
                                    }
                                    <div className="dont">
                                        <input type="checkbox" defaultChecked={true} id="dont" />
                                        <label htmlFor="dont">Не перезванивать мне для подтверждения заказа</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="itogo">
                        <div className="itogoContent">
                            <h1>Итого</h1>
                            <div className="summu">
                                <h5>{ state.cart.length > 0 ? state.cart.length + ' товара на сумму' : 'Корзина пусто' }<span>{ state.cart.length > 0 ? total() : null }</span></h5>
                                {
                                    state.cart.length > 0 ? <h5>Стоимость доставки <span>бесплатно</span></h5> : null
                                }
                            </div>
                            {
                                state.cart.length > 0 ? 
                                <div className="oplata">
                                    <h4>К оплате</h4>
                                    <h1>{ total() } ₽</h1>
                                </div> : null
                            }
                            <button className={`zakazat ${canSend ? 'ready' : ''}`} disabled="!readySend">Оформить заказ</button>
                        </div>
                        <form>
                            <input type="checkbox" id="soglasheniya" defaultChecked={true}/>
                            <label htmlFor="soglasheniya">Подтверждая заказ, я принимаю условия <a href="">пользовательского соглашения</a></label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart



// export default {
//         data () => ({
//             one 'deliv',
//             two 'Санкт-Петербург',
//             three [],
//             four [],
//             five 'Завтра, 11 июля, вс',
//             six '1500–1800 (бесплатно)',
//             eight [],
//             nine 4,
//             ten '',
//             go false
//         }),
//         computed {
//             toAddress(){
//                 if(this.go == true){
//                     return this.pickUp(this.two)[this.four.children.address.id].address
//                 }
//             },
//             toDate(){;
//                 if(this.go == true){
//                     return this.pickUp(this.two)[this.four.children.address.id].date
//                 }
//             },
//             nadzor(){
//                 if(this.$route == '/cart'){
//                 if(this.length == 0){
//                     this.ready[0] = 'start'
//                 }
//             },
//             readySend(){if(this.$route == '/cart'){
//                 let valid = this.man.every(element => element.valid == true)
//                 if(!valid){
//                     this.man.filter(element => element.valid == false)
//                 }
//                 let valid2 = this.ready.slice(0, 3).every(element => element == 'end')
//                 if(valid && valid2){
//                     return true
//                 } else {
//                     return false
//                 }
//             },
//             height(){
//                 return function(index){if(this.$route == '/cart'){
//                     return this.eight.slice(0, index).reduce((t, pr) => t + pr.clientHeight, 0) + (index - 1) * 20
//                 }
//             },
//             eleven(){if(this.$route == '/cart'){
//                 if(this.nine > this.eight.length){
//                     this.nine = this.eight.length
//                 }
//                 let elv = this.eight.length - this.nine
//                 if(elv > 10 && this.nine + 10 < this.eight.length){
//                     return 10
//                 } else if(elv < 10){
//                     return elv % 10
//                 }
//             },
//         },
//         methods {
//             ...mapActions('cart', { count 'count', increase 'increase', decrease 'decrease', input 'input', modelStreet 'modelStreet', modelFlat 'modelFlat', typePay 'typePay', modeler 'modeler', remove 'remove' }),
//             onInput(id, e){
//                 let index = store.getters['cart/id'].indexOf(id)
//                 let last = this.all.products[index].count
//                 this.input({ id id, count e.target.value })
//                 if(e.target.value !== last && last === this.all.products[index].count){
//                     e.target.value = this.all.products[index].count
//                     console.log(this.all.products[index].count);
//                 }
//             },
//             changer(index){
//                 htmlFor(let i = 0; i < index; i++){
//                     this.ready[i] = 'end'
//                 }
//                 htmlFor(let i = this.ready.length; i > index; i--){
//                     this.ready[i] = 'start'
//                 }
//             },
//             setItemRef(el){
//                 if(el){
//                     this.three.push(el)
//                 }
//             },
//         },
//         created(){
//             if(this.length != 0){
//                 this.ready[0] = 'middle'
//             }
//         },
//         beforeUpdate(){
//             this.three = []
//         },
//         updated(){
//             this.eight = this.three.flat()
//             this.four = this.three.find(element => element.children.address.checked === true)
//             this.four != undefined ? this.go = true  this.go
//         },
// }