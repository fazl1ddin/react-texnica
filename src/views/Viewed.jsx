import React from 'react';
import './../css/Viewed.css';
import './../css/Favorites.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useFindById, some, stars, updateOne } from '../store';
import * as img from './../img/index';
import { useCallback } from 'react';

function Viewed(){
    const state = useSelector(state => state.products)

    const [settings, setSettings] = useState({ filter: '', filterPrice: '' })

    const products = useCallback(() => {
        let allProducts = []
        for(let i = 0; i < state.viewed.length; i++){
            // allProducts[i] = useFindById(state.viewed[i].id)
        }
        if(settings.filter != 'Все' && settings.filter != '') allProducts = allProducts.filter(item => item.specification['Тип:'] == settings.filter )
        if(settings.filterPrice != '') allProducts.sort((a, b) => settings.filterPrice == 'expensive' ? b.realPrice - a.realPrice : a.realPrice - b.realPrice)
        return allProducts
    }, [state.viewed, settings])

    return (
    <div className="favorites viewed">
        <div className="window">
            <h1>Просмотренные товары</h1>
            <div className="favoritesContent">
                <div className="filter">
                    <select onChange={e => setSettings({...settings, filter: e.target.value})}>
                        <option value="Все">Все товары</option>
                        <option value="Сигвей">Сигвеи</option>
                        <option value="Гироскутер">Гироскутеры</option>
                        <option value="Моноколесо">Моноколеса</option>
                    </select>
                    <select onChange={e => setSettings({...settings, filterPrice: e.target.value})}>
                        <option value="expensive">Сначала дорогие</option>
                        <option value="cheap">Сначала дешевые</option>
                    </select>
                </div>
                <div className="xityProdajContent">
                    {
                        products().map((item, i) => (
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
                                    <h5>{ item.specification.productName }</h5>
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
                                        <div className={`likebutton arbuttons ${!some('favorites', item.id) ? 'add' : 'remove'}`} onClick={() => updateOne(some('favorites', item.id) ? 'remove' : 'add', 'favorites', item.id, )}>
                                        </div>
                                        <div className={`comparebutton arbuttons ${!some('compare', item.id) ? 'add' : 'remove'}`}  onClick={() => updateOne(some('compare', item.id) ? 'remove' : 'add', 'compare', item.id, )}>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart">
                                    <a href="">Купить в 1 клик</a>
                                    <div className={`cartbutton arbuttons ${!some('cart', item.id) ? 'add' : 'remove'}`} onClick={() => updateOne(some('cart', item.id) ? 'remove' : 'add', 'cart', item.id, 1)}>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default Viewed