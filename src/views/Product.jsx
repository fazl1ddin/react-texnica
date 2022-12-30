import React from 'react';
import './../css/Product.css';
import { Link, useLocation } from 'react-router-dom';
import { useFindById, some, store } from '../store';
import { useState } from 'react';
import { stars } from '../store';
import { useDispatch } from 'react-redux';
import { add, remove } from './../store/products';
import * as img from './../img/index';

function rec(){
    const arr = []
    for(let i = 0; i < 4; i++){
        const allProducts = store.getState()['products']['allProducts']
        arr[i] = allProducts[Math.floor(Math.random() * ((allProducts.length - 1) - 0 + 1)) + 0]
    }
    return arr
}

const recomendtion = rec()

function Product(){
    const dispatch = useDispatch()

    const [current, setCurrent] = useState(0)

    const [currentDes, setCurrentDes] = useState(2)

    const descriptions = [
        'Описание',
        'Характеристики',
        'Отзывы'
    ]

    const pathname = useLocation().pathname.split('/')

    const currentId = Number(pathname[pathname.length - 1])
    
    const products = useFindById(currentId)

    const pagination = () => {
        let ok = []
        if(current < products.product.src.length - 1){
            if(current < 1){
                for(let i = current; i <= current + 2; i++){
                    ok[i] = i
                }
            } else {
                for(let i = current - 1; i <= current + 1; i++){
                    ok[i] = i
                }
            }
        } else {
            for(let i = current - 2; i <= current; i++){
                ok[i] = i
            }
        }
        return ok.flat()
    }

    return (
    <div className='product'>
        <div className='window'>
            <div className="productContent">
                <h1 className="title">{products.productName}</h1>
                <div className="productGallery">
                    <div className="central">
                        {
                            products.product.src.map((item, i) => (
                                <div key={i}>
                                    <img src={`${item}`} className="productImg"/>
                                    <img src={`${products.protection.src}`} className={`protection`}/>
                                </div>
                            ))
                        }
                        
                    </div>
                    <div className="galleryPagination">
                        <button disabled={current <= 0} onClick={() => setCurrent(Math.max(0, current - 1))}>&#9204;</button>
                        <div className="galleryPaginationItems">
                            {
                                pagination().map((item, i) => (
                                    <div className={`galleryPaginationItem ${current == item ? 'active' : ''}`} onClick={() => setCurrent(item)} key={i}>
                                        <img src={products.product.src[item]}/>
                                    </div>
                                ))
                            }
                        </div>
                        <button disabled={current >= products.product.src.length - 1} onClick={() => setCurrent(Math.min(current + 1, products.product.src.length - 1))}>&#9205;</button>
                    </div>
                </div>
                <div className="productText">
                    <h1>{products.productName}</h1>
                    <div className="productPrices">
                        <div className="productPricesBox">
                            <div className="rateStar">
                                <div className='ratesStars'>
                                    {
                                        stars(products.rates)
                                    }
                                </div>
                                <div className="comments">
                                    <img src={img.messageSquare} />
                                    <h5>({products.comments.length})</h5>
                                </div>
                            </div>
                            <div className="statslike">
                                <div className={`likebutton arbuttons ${!some('favorites', products.id) ? 'add' : 'remove'}`} onClick={() => dispatch( some('favorites', products.id) ? remove({module: 'favorites', id: products.id}) : add({ module: 'favorites', id: products.id }))}>
                                </div>
                                <div className={`comparebutton arbuttons ${!some('compare', products.id) ? 'add' : 'remove'}`}  onClick={() => dispatch( some('compare', products.id) ? remove({module: 'compare', id: products.id}) : add({ module: 'compare', id: products.id }))}>
                                </div>
                            </div>
                        </div>
                        <div className="productPricesBox">
                            <div className="pricesText">
                                <div className="fflex">
                                    <del className={`${products.price == products.realPrice ? 'visible' : ''}`}>{products.price}₽</del>
                                    <h4><span className="spanone">{products.sale} %</span> <span className="spantwo">— {products.space} ₽</span></h4>
                                </div>
                                <h3>{products.realPrice} ₽</h3>
                            </div>
                            <div className="cart">
                                    <div className={`bought cartbutton arbuttons ${!some('cart', products.id) ? 'add' : 'remove'}`} onClick={() => dispatch( some('cart', products.id) ? remove({module: 'cart', id: products.id}) : add({ module: 'cart', id: products.id, count: 1 }))}>
                                        <p>В корзину</p>
                                    </div>
                                <a href="">Купить в 1 клик</a>
                            </div>
                        </div>
                    </div>
                    <div className="wayget">
                        <div className="waygetBox">
                            <div className="foricon">
                                <img src={img.shipping}/>
                            </div>
                            <div className="fortext">
                                <h4>Доставка</h4>
                                <p>Доставим по Санкт-Петербургу в течение 2 часов и бесплатно. Стоимость доставки в другие города уточняйте у менеджера.</p>
                            </div>
                        </div>
                        <div className="waygetBox">
                            <div className="foricon">
                                <img src={img.purse}/>
                            </div>
                            <div className="fortext">
                                <h4>Оплата</h4>
                                <p>Принимаем к оплате как наличный, так и безналичный расчёт. Возможна оплата электронными кошельками.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productDescription">
                <div className="desNav">
                    <ul>
                        {
                            descriptions.map((item, i) => (
                                <li key={item} className={currentDes === i ? 'active' : ''} onClick={() => setCurrentDes(i)}>{item == 'Отзывы' ? `${item} (${products.comments.length})` : item}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="tabs">
                    <h1>{products.description.title}</h1>
                    {currentDes === 0 ? (
                    <div className="description">
                        <p className="p" dangerouslySetInnerHTML={{__html:products.description.content}}></p>
                        <h1>Рекомендуем</h1>
                        <div className="xityProdajContent">
                            {
                                recomendtion.map((item, i) => (
                                <div className="xityProdajBox mb-15" key={i}>
                                    <p>{item.id}</p>
                                    <Link to={`/product/${item.id}`}>
                                        <img src={item.product.src[0]} className={item.product.class}/>
                                    </Link>
                                    <img src={item.protection.src} className={item.protection.class}/>
                                    <div className="notific">
                                        <p className={item.news.class}>{item.news.content}</p>
                                        <p className={item.hit.class}>{item.hit.content}</p>
                                    </div>
                                    <div className="xityProdajTexti">
                                        <h5>{item.specification.productName}</h5>
                                        <h3>{item.productName}</h3>
                                    </div>
                                    <div className="rateStar">
                                        <div className='ratesStars'>
                                            {
                                                stars(item.rates)
                                            }
                                        </div>
                                        <div className="comments">
                                            <img src={img.messageSquare} />
                                            <h5>({item.comments.length})</h5>
                                        </div>
                                    </div>
                                    <div className="prices">
                                        <div className="pricesText">
                                            <del className={`${item.price == item.realPrice ? 'visible' : ''}`}>{item.price} ₽</del>
                                            <h3>{item.realPrice} ₽</h3>
                                            <h4><span className="spanone">{item.sale} %</span> <span className="spantwo">— {item.space} ₽</span></h4>
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
                            ))
                            }
                        </div>
                    </div>
                    ) : currentDes === 1 ? (
                        <div className="specification">
                            <table>
                                <tbody>
                                    {
                                        Object.keys(products.specification).splice(1).map((item, i) => (
                                            <tr key={item}>
                                                <th>{item}</th>
                                                <td>{products.specification[item]}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="rates">
                            <div className="ratesContent">
                                <div className="ratesAcc">
                                    <div className="aboutRate">
                                        <img src={img.avatar}/>
                                        <h4>Александр <span>07 июня 2021</span></h4>
                                        <div className="ratesStars">
                                            {
                                                stars(products.rates)
                                            }
                                        </div>
                                        <span>({products.rates} из 5)</span>
                                    </div>
                                    <div className="rateContent">
                                        <h4>Отличный самокат!</h4>
                                        <p>Катаюсь каждый день после работы, заряд держит отлично!</p>
                                    </div>
                                </div>
                                <div className="newRate">
                                    <h4>Напишите своё мнение о товаре</h4>
                                    <p>Сделайте выбор других покупалетей легче</p>
                                    <button>Написать отзыв</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>)
}

export default Product