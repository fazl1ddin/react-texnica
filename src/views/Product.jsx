import React from 'react';
import './../css/Product.css';
import { Link, useLocation } from 'react-router-dom';
import { useFindById, some, store, updateOne, storeUser } from '../store';
import { useState } from 'react';
import { stars } from '../store';
import { useDispatch } from 'react-redux';
import * as img from './../img/index';
import useGetRec from '../hooks/getProduct';
import useGetProduct from '../hooks/getProduct';
import config from '../api/config';
import FavoritesUpdate from '../components/ButtonsForUpdate/FavoritesUpdate';
import CompareUpdate from '../components/ButtonsForUpdate/CompareUpdate';
import CardUpdateLong from '../components/ButtonsForUpdate/CardUpdateLong';
import ProductImage from '../components/ProductImage/ProductImage';
import CardUpdate from '../components/ButtonsForUpdate/CardUpdate';
import useGetRecs from '../hooks/getRecs';
import useGetAddress from '../hooks/getAddress';
import useGetComments from '../hooks/getComments';

function Product({user, setLoginModal}){
    const [modal, setModal] = useState(false)

    const [fields, setFields] = useState([
        {
            title: 'Заголовок',
            name: 'title',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        },
        {
            title: 'Текст отзыва',
            name: 'content',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        },
        {
            title: 'Оценка',
            name: 'rate',
            value: '',
            pattern: /[0-9\\.,:]/,
            valid: false
        }
    ])

    const [recomendtion, recLoading] = useGetRecs()

    const [current, setCurrent] = useState(0)

    const [currentDes, setCurrentDes] = useState(2)

    const descriptions = [
        'Описание',
        'Характеристики',
        'Отзывы'
    ]

    const pathname = useLocation().pathname.split('/')

    const currentId = pathname[pathname.length - 1]
    
    const [products, loading, setData] = useGetProduct(currentId)
    const [comments, cLoading, refetch] = useGetComments("/comments", products._id)

    const pagination = () => {
        if(!loading){
            let ok = []
            if(current < products.product.length - 1){
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
    }

    return loading ? 'adassas' : (<>
        {
            modal ? 
            <div className="forModal">
                <div className="centerWrap singIn">
                    <div className="modalTitle">
                        <h2>Отзыв</h2>
                        <div className="x" onClick={() => setModal(false)}>
                            <img src={img.x}/>
                        </div>
                    </div>
                    <div className="modalBody">
                        <form>
                            {
                                fields.map((item, index) => <React.Fragment key={item.name}>
                                    <label htmlFor={item.name}>{item.title}</label>
                                    <input type="text" value={item.value} name="text" id={item.name} onChange={e => {
                                        setFields(fields.map((item, i) => {
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
                            <button className='ready' type="button" onClick={async () => {
                                let obj = {};
                                fields.forEach((item, index) => {
                                    obj[item.name] = item.value
                                })
                                // dispatch(Auth({logType: 'pass', obj}))
                                await fetch(config.baseUrl + '/add-comment', {method: 'POST', body: JSON.stringify({
                                    productId: products._id,
                                    userId: user._id,
                                    ...obj
                                })})
                                .then(result => result.json())
                                .then(result => {
                                    // setData(result)
                                })
                                .catch(e => {
                                    console.log(e);
                                })
                                await refetch()
                                setModal(false)
                            }}>Добавить</button>
                        </form>
                    </div>
                </div>
            </div> : null
        }
        <div className='product'>
            <div className='window'>
                <div className="productContent">
                    <h1 className="title">{products.productName}</h1>
                    <div className="productGallery">
                        <div className="central">
                            {
                                products.product.map((item, i) => (
                                    <div key={i}>
                                        <img src={`${item}`} className="productImg"/>
                                        {
                                            item.protection ? <img src={config.baseUrl + '/images/aqua.png'} className='aqua' />
                                            : null
                                        }
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
                                            <img src={products.product[item]}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <button disabled={current >= products.product.length - 1} onClick={() => setCurrent(Math.min(current + 1, products.product.src.length - 1))}>&#9205;</button>
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
                                        <h5>({comments.length})</h5>
                                    </div>
                                </div>
                                <div className="statslike">
                                    <FavoritesUpdate id={products._id}/>
                                    <CompareUpdate id={products._id}/>
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
                                <CardUpdateLong id={products._id}/>
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
                                    <li key={item} className={currentDes === i ? 'active' : ''} onClick={() => setCurrentDes(i)}>{item == 'Отзывы' ? `${item} (${comments.length})` : item}</li>
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
                                    recLoading ? 'asffsaasf' :
                                    recomendtion.map((item, i) => (
                                        <div className="xityProdajBox mb-15" key={item._id}>
                                            <ProductImage id={item._id} srcs={item.product}/>
                                            {
                                                item.protection ? <img src={config.baseUrl + '/images/aqua.png'} className='aqua' />
                                                : null
                                            }
                                            <div className="notific">
                                                {
                                                    item.news && <p className='novelty'>Новинка</p>
                                                }
                                                {
                                                    item.hit && <p className='xit'>Хит продаж</p>
                                                }                                                
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
                                                    <FavoritesUpdate id={item._id}/>
                                                    <CompareUpdate id={item._id}/>
                                                </div>
                                            </div>
                                            <CardUpdate id={item._id}/>
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
                                            Object.keys(products.specification).splice(2 ).map((item, i) => (
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
                                    {
                                        comments.map((item, index) => (
                                            <div className="ratesAcc" key={index}>
                                                <div className="aboutRate">
                                                    <img src={img.avatar}/>
                                                    <h4>{item.name} <span>{new Intl.DateTimeFormat('ru', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }).format(item.date)}</span></h4>
                                                    <div className="ratesStars">
                                                        {
                                                            stars(item.rate)
                                                        }
                                                    </div>
                                                    <span>({item.rate} из 5)</span>
                                                </div>
                                                <div className="rateContent">
                                                    <h4>{item.title}</h4>
                                                    <p dangerouslySetInnerHTML={{__html: item.content}}></p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    user ?
                                    <div className="newRate">
                                        <h4>Напишите своё мнение о товаре</h4>
                                        <p>Сделайте выбор других покупалетей легче</p>
                                        <button onClick={() => setModal(true)}>Написать отзыв</button>
                                    </div>
                                    :
                                    <div className="newRate">
                                        <h4>Напишите своё мнение о товаре</h4>
                                        <p>Сначала войдите или зарегистрируйтесь</p>
                                        <button onClick={() => setLoginModal('login')}>Написать отзыв</button>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>)
}

export default Product