import React, { useCallback, useEffect, useState } from 'react';
import '../css/Compare.css';
import '../css/Favorites.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFindById, some, stars } from "../store";
import { add, remove } from "../store/products";
import * as img from '../img/index';

function Compare(){
    const state = useSelector(state => state.products)

    const dispatch = useDispatch()

    const [settings, setSettings] = useState({ filter: '', only: true })

    const [current, setCurrent] = useState(0)

    const products = useCallback(() => {
        if(state.compare.length != 0){
            let allProducts = []
            for(let i = 0; i < state.compare.length; i++){
                allProducts[i] = useFindById(state.compare[i].id)
            }
            if(settings.filter != 'Все' && settings.filter != '') allProducts = allProducts.filter(item => item.specification['Тип:'] == settings.filter )
            function removeDuplicates(arr){

                const result = []
                const duplicatesIndices = []

                arr.forEach((current, index) => {

                    if(duplicatesIndices.includes(index)) return

                    result.push(current)

                    for(let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++){

                        const comparison = arr[comparisonIndex]
                        const currentKeys = Object.keys(current.specification)
                        const comparisonKeys = Object.keys(comparison.specification)

                        if(currentKeys.length !== comparisonKeys.length) continue

                        const currentKeysString = currentKeys.sort().join("").toLowerCase()
                        const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase()

                        if(currentKeysString !== comparisonKeysString) continue

                        const comparison1 = arr[comparisonIndex]

                        let valuesEqual = true
                        for(let i = 0; i < currentKeys.length; i++){
                            const key = currentKeys[i]
                            if(current.specification[key] !== comparison.specification[key] ||
                                current.realPrice !== comparison1.realPrice ||
                                current.productName !== comparison1.productName){
                                valuesEqual = false
                                break
                            }
                        }

                        if(valuesEqual) duplicatesIndices.push(comparisonIndex)

                    }
                })
                return result
            }
            if(settings.only) allProducts = removeDuplicates(allProducts)
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
    }, [state.compare, settings])

    const table = () => {
        const keys = Object.keys(products()[0][0].specification).splice(1)
        return keys
    }

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
                    products().length != 0 ? products()[current < products().length ? current : 0].map((item, i) => (
                        <div className="xityProdajBox mb-15" key={item.id}>
                            <Link to={`/product/${item.id}`}>
                                <img src={item.product.src[0]} className={item.product.class}/>
                            </Link>
                            <img src={item.protection.src} className={item.protection.class}/>
                            <div className="notific">
                                <p className={item.news.class}>{ item.news.content }</p>
                                <p className={item.hit.class}>{ item.hit.content }</p>
                            </div>
                            <div className="xityProdajTexti">
                                <h5>{ item.specification.productName } {item.id}</h5>
                                <h3>{ item.productName }</h3>
                            </div>
                            <div className="rateStar">
                                <div className='ratesStars'>
                                    {stars(item.rates)}
                                </div>
                                <div className="comments">
                                    <img src={img.messageSquare} />
                                    <h5>({ item.comments.length })</h5>
                                </div>
                            </div>
                            <div className="prices">
                                <div className="pricesText">
                                    <del className={item.price == item.realPrice ? 'visible' : ''}>{ item.price }₽</del>
                                    <h3>{ item.realPrice + " ₽" }</h3>
                                    <h4><span className="spanone">{ item.sale + "%" }</span> <span className="spantwo">— { item.space + " ₽" }</span></h4>
                                </div>
                                <div className="statslike">
                                    <div className={`likebutton arbuttons ${!some('favorites', item.id) ? 'add' : 'remove'}`} onClick={() => dispatch( some('favorites', item.id) ? remove({module: 'favorites', id: item.id}) : add({ module: 'favorites', id: item.id }))}>
                                    </div>
                                    <div className={`comparebutton arbuttons ${!some('compare', item.id) ? 'add' : 'remove'}`}  onClick={() => dispatch( some('compare', item.id) ? remove({module: 'compare', id: item.id}) : add({ module: 'compare', id: item.id }))}>
                                    </div>
                                </div>
                            </div>
                            <div className="cart">
                                <a href="">Купить в 1 клик</a>
                                <div className={`cartbutton arbuttons ${!some('cart', item.id) ? 'add' : 'remove'}`} onClick={() => dispatch( some('cart', item.id) ? remove({module: 'cart', id: item.id}) : add({ module: 'cart', id: item.id, count: 1 }))}>
                                </div>
                            </div>
                        </div>
                    )) : null
                }
                </div>
                <div className="only">
                    <input type="checkbox" id="only" checked={settings.only} onChange={e => setSettings({...settings, only: e.target.checked})}/>
                    <label htmlFor="only">Только&nbsp;различающиеся</label>
                </div>
                {
                    products().length == 0 ? (
                        <div className="w-75pr">Пусто</div>
                    ) : null
                }
            </div>
            {
                products().length != 0 ? (
                    <table>
                        <tbody>
                        {
                            table().map((item) => (
                                <tr key={item}>
                                    <th>
                                        {item}
                                    </th>
                                    {
                                        products()[current < products().length ? current : 0].map((product) => (
                                            <td key={product.id}>
                                                {product.specification[item]}
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