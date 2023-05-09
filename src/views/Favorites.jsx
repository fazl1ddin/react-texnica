import React, { useState, useCallback } from 'react';
import './../css/Favorites.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFindById, some, stars, updateOne, storeUser, storeProducts } from '../store';
import * as img from './../img/index';
import useGetPAF from '../hooks/getProductsAtFav';
import FavoritesUpdate from '../components/ButtonsForUpdate/FavoritesUpdate';
import CompareUpdate from '../components/ButtonsForUpdate/CompareUpdate';
import CardUpdate from '../components/ButtonsForUpdate/CardUpdate';
import config from '../api/config';
import LoaderUserPanel from '../components/Loaders/LoaderUserPanel';
import { clearUser } from '../store/user';
import { setModule } from '../store/products';

function Favorites({setModal, user, loadingUser, drops}){
    const [settings, setSettings] = useState({ filter: '', filterPrice: '' })

    const {data, loading, products: productes} = useGetPAF()

    const products = useCallback(() => {
        let allProducts = data
        if(settings.filter != 'Все' && settings.filter != '') allProducts = allProducts.filter(item => item.specification['Тип:'] == settings.filter )
        if(settings.filterPrice != '') allProducts.sort((a, b) => settings.filterPrice == 'expensive' ? b.realPrice - a.realPrice : a.realPrice - b.realPrice)
        return allProducts
    }, [settings, data])
    
    return (
        <div className="favorites">
            <div className="window">
                <h1>Избранное</h1>
                <div className="favoritesContent">
                    <div className="userPanel">
                        {
                            loadingUser ? 
                                <LoaderUserPanel/>
                            :
                            user ? 
                            <div className='profileDrop'>
                                <ul>
                                    {
                                        drops.map(item => (
                                            <li key={item.title}>
                                                <Link to={item.path} state={item.stateTab}>
                                                    {
                                                        item.title
                                                    }
                                                </Link>
                                            </li>
                                        ))
                                    }
                                    <li>
                                        <a onClick={() => {
                                            localStorage.removeItem('token')
                                            storeUser.dispatch(clearUser())
                                            if(localStorage.getItem('products')){
                                                storeProducts.dispatch(setModule({data: JSON.parse(localStorage.getItem('products'))}))
                                            } else {
                                                localStorage.setItem('products', JSON.stringify({
                                                    cart: user.cart,
                                                    favorites: user.favorites,
                                                    viewed: user.viewed,
                                                    compare: user.compare
                                                }))
                                            }
                                        }}>
                                            Выйти
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            :
                            <div className='un'>
                                <p>Войдите или зарегистрируйтесь</p>
                                <button className="headerButton" onClick={() => setModal('login')}>Войти</button>
                            </div>
                        }
                    </div>
                    <div className="filterContent">
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
                            )) : <div>Pusto</div>                            
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorites