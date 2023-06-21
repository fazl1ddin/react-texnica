import React, { useCallback, useEffect, useState } from 'react';
import '../css/Compare.css';
import '../css/Favorites.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFindById, some, stars, updateOne } from "../store";
import * as img from '../img/index';
import useGetPAC from '../hooks/getProductsAtFac';
import config from '../api/config';
import FavoritesUpdate from '../components/ButtonsForUpdate/FavoritesUpdate';
import CompareUpdate from '../components/ButtonsForUpdate/CompareUpdate';
import CardUpdate from '../components/ButtonsForUpdate/CardUpdate';

const table = {
    "speed": "Макс. скорость до (км/ч)",
    "type": "Тип:",
    "power": "Мощность двигателя",
    "charge": "Пробег на одном заряде",
    "frontBrake": "Тип переднего тормоза",
    "cruise": "Круиз-контроль",
    "power1": "Мощность двигателя1",
    "power2": "Мощность двигателя2",
    "charge1": "Пробег на одном заряде1",
    "frontBrake1": "Тип переднего тормоза1",
    "cruise1": "Круиз-контроль1",
    "power3": "Мощность двигателя3",
    "charge2": "Пробег на одном заряде2",
    "frontBrake2": "Тип переднего тормоза2",
    "cruise2": "Круиз-контроль2",
    "frontBrake3": "Тип переднего тормоза3"
  }

function Compare(){
    const [only, setOnly] = useState(true)

    const { data, loading, products: productes} = useGetPAC(only)

    const [settings, setSettings] = useState({ filter: '', only: true })

    const [current, setCurrent] = useState(0)

    const products = useCallback(() => {
        if(data.length != 0){
            let allProducts = data
            if(settings.filter != 'Все' && settings.filter != '') allProducts = allProducts.filter(item => item.specification['Тип:'] == settings.filter )
            let arr = []
            let n = window.innerWidth <= 770 ? 2 : 3
            let last = 0
            for(let i = 0; i <= Math.ceil(allProducts.length / n) * n; i += n){
                if(!last && !i){
                } else {
                    arr.push(allProducts.slice(last, i))
                    last = i
                }
            }
            return arr
        }
        return []
    }, [data, settings, only])

    useEffect(() => {
        setCurrent(0)
    }, [settings.only])

    return (
    <div className="compareB">
        <div className="window">
            <h1>Сравнение товаров</h1>
            <div className="control">
                <button disabled={current <= 0} onClick={() => setCurrent(Math.max(0, current - 1))}>&#9204;</button>
                <button disabled={current >= products().length - 1} onClick={() => setCurrent(Math.min(current + 1, products().length - 1))}>&#9205;</button>
            </div>
            <div className="tabler">
                <select onChange={e => setSettings({...settings, filter: e.target.value})}>
                    <option value="Все">Все товары</option>
                    <option value="Сигвей">Сигвеи</option>
                    <option value="Гироскутер">Гироскутеры</option>
                    <option value="Моноколесо">Моноколеса</option>
                </select>
                <div className="xityProdaj">
                {
                    products().length ? products()[current < products().length ? current : 0].map((every, i) => (
                        <div className="xityProdajBox mb-15" key={every._id}>
                            <Link to={`/product/${every._id}`}>
                                <div className="sigveiWrap">
                                    <img onClick={() => updateOne(some('viewed', every._id) ? 'remove' : 'add', 'viewed', every._id)} src={`${every.product[0]}`} className='sigvei' />
                                </div>
                            </Link>
                            {
                                every.protection ? <img src={config.baseUrl + '/images/aqua.png'} className='aqua' />
                                : null
                            }
                            <div className="notific">
                                {
                                    every.news && <p className='novelty'>Новинка</p>
                                }
                                {
                                    every.hit && <p className='xit'>Хит продаж</p>
                                }                                                
                            </div>
                            <div className="xityProdajTexti">
                                <h5>{every.specification.productName}</h5>
                                <h3>{every.productName}</h3>
                            </div>
                            <div className="rateStar">
                                <div className='ratesStars'>
                                    {
                                        stars(every.rates)
                                    }
                                </div>
                                <div className="comments">
                                    <img src={img.messageSquare} />
                                    <h5>({every.comments.length})</h5>
                                </div>
                            </div>
                            <div className="prices">
                                <div className="pricesText">
                                    <del className={`${every.price == every.realPrice ? 'visible' : ''}`}>{every.price} ₽</del>
                                    <h3>{every.realPrice} ₽</h3>
                                    <h4><span className="spanone">{every.sale} %</span> <span className="spantwo">— {every.space} ₽</span></h4>
                                </div>
                                <div className="statslike">
                                    <FavoritesUpdate id={every._id}/>
                                    <CompareUpdate id={every._id}/>
                                </div>
                            </div>
                            <CardUpdate id={every._id}/>
                        </div>
                    )) : <div className="w-75pr">Пусто</div>
                }
                </div>
                <div className="only">
                    <input type="checkbox" id="only" checked={only} onChange={e => setOnly(!only)}/>
                    <label htmlFor="only">Только&nbsp;различающиеся</label>
                </div>
            </div>
            {
                products().length ? (
                    <table>
                        <tbody>
                        {
                            Object.entries(table).map(([key, value]) => (
                                <tr key={key}>
                                    <th>
                                        {value}
                                    </th>
                                    {
                                        products()[current < products().length ? current : 0].map((product) => (
                                            <td key={product._id}>
                                                {product.specification[key]}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                ) : null
            }
        </div>
    </div>
    )
}

export default Compare