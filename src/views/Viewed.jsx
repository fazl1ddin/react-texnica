import React from 'react';
import './../css/Viewed.css';
import './../css/Favorites.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { some, stars, updateOne } from '../store';
import * as img from './../img/index';
import { useCallback } from 'react';
import useGetPAV from '../hooks/getProductsAtView';
import config from '../api/config';
import FavoritesUpdate from '../components/ButtonsForUpdate/FavoritesUpdate';
import CompareUpdate from '../components/ButtonsForUpdate/CompareUpdate';
import CardUpdate from '../components/ButtonsForUpdate/CardUpdate';

function Viewed(){

    const [settings, setSettings] = useState({ filter: '', filterPrice: '' })

    const {data, loading} = useGetPAV()

    const products = useCallback(() => {
        let allProducts = data
        if(settings.filter !== 'Все' && settings.filter !== '') allProducts = allProducts.filter(item => item.specification['Тип:'] === settings.filter )
        if(settings.filterPrice !== '') allProducts.sort((a, b) => settings.filterPrice === 'expensive' ? b.realPrice - a.realPrice : a.realPrice - b.realPrice)
        return allProducts
    }, [settings, data])

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
                        loading ? 
                        'fasfaaffasasf'
                        :
                        products().length ? products().map((every, i) => (
                            <div className="xityProdajBox mb-15" key={every._id}>
                                <Link to={`/product/${every._id}`}>
                                    <div className="sigveiWrap">
                                        <img alt='' onClick={() => updateOne(some('viewed', every._id) ? 'remove' : 'add', 'viewed', every._id)} src={`${every.product[0]}`} className='sigvei' />
                                    </div>
                                </Link>
                                {
                                    every.protection ? <img alt='' src={config.baseUrl + '/images/aqua.png'} className='aqua' />
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
                                    <h5>{every.specification.productName.value}</h5>
                                    <h3>{every.productName.value}</h3>
                                </div>
                                <div className="rateStar">
                                    <div className='ratesStars'>
                                        {
                                            stars(every.rates)
                                        }
                                    </div>
                                    <div className="comments">
                                        <img alt='' src={img.messageSquare} />
                                        <h5>({every.comments.length})</h5>
                                    </div>
                                </div>
                                <div className="prices">
                                    <div className="pricesText">
                                        <del className={`${every.price === every.realPrice ? 'visible' : ''}`}>{every.price} ₽</del>
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
                        )) : <div>Pusto</div>                            
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default Viewed