import React from 'react';
import './../css/Index\ main.css';
import { Link } from 'react-router-dom';
import * as img from './../img/index';
import { useContext, useState } from 'react';
import DropDown from '../contexts/dropDown';
import { useSelector, useDispatch } from 'react-redux';
import { getRealPrice, getSpace, some, stars, updateOne } from './../store/index';
import useGetData from '../hooks/getData'
import Loader from '../components/Loaders/Loader';
import Products4Loader from '../components/Loaders/Products4Loader';
import config from '../api/config';
import CardUpdate from '../components/ButtonsForUpdate/CardUpdate';
import FavoritesUpdate from '../components/ButtonsForUpdate/FavoritesUpdate';
import CompareUpdate from '../components/ButtonsForUpdate/CompareUpdate';
import ProductImage from '../components/ProductImage/ProductImage';
import useGetIndexPromos from '../hooks/getIndexPromos';
import LoaderIndexPromos from '../components/Loaders/LoaderIndexPromos';

function IndexMain(){

    const dropDown = useContext(DropDown)

    const [pagination, setPagination] = useState(0)

    const [promos, pLoading] = useGetIndexPromos()

    const {data, loading} = useGetData('/index-products', 'GET', [])

    const products = (start, end) => {
        const news = data

        const loaders = []
        for (let index = 0; index < end - start; index++) {
            loaders.push(<Products4Loader key={index}/>)
        }
        return loading ? loaders : news.slice(start, end).map(item => {

            return (<div className="xityProdaj" key={item._id}>
                <div className="window">
                    <h1>{item.title}</h1>
                    <a href="" className="a">{item.href}</a>
                    <div className="xityProdajContent">
                        {
                            item.every.map((item, index) => ({
                                ...item,
                                space: getSpace(item),
                                realPrice: getRealPrice(item)
                            })).map(every => (
                                <div className="xityProdajBox mb-15" key={every._id}>
                                    <ProductImage id={every._id} srcs={every.product}/>
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
                            ))
                        }
                    </div>
                </div>
            </div>)
        })
    }

    const slider = [
        {
            photo: img.series6,
            name: 'уже в наличии',
            id: 1
        },
        {
            photo: img.series6,
            name: 'уже в наличии',
            id: 2
        },
        {
            photo: img.series6,
            name: 'уже в наличии',
            id: 3
        },
        {
            photo: img.series6,
            name: 'уже в наличии',
            id: 4
        },
        {
            photo: img.series6,
            name: 'уже в наличии',
            id: 5
        },
    ]

    return (<>
        <div className="header">
            <div className="window">
                <div className="headerContent">
                    <div className={`slider ${dropDown ? 'w-970' : 'w-100vw'}`}>
                        {
                            slider.map((item, i) => (
                                <div className={`slider-item ${pagination == i ? 'active' : ''}`} key={item.id}>
                                    <img src={item.photo} />
                                    <h3>{item.name} {item.id}</h3>
                                </div>
                            ))
                        }
                        <div className="pagination">
                            {
                                slider.map((_item, i) => (
                                    <div key={i} className={`pagination-items ${pagination == i ? 'pagination-active' : ''}`} onClick={() => setPagination(i)}></div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            products(0, 2)
        }
        <div className="banner">
            <div className="window">
                <div className="bannerContent">
                {
                        pLoading ? 
                        <>
                            <LoaderIndexPromos/>
                            <LoaderIndexPromos/>
                        </>
                        : 
                        promos.slice(0, 2).map((item, index) => 
                        (
                            <div className="bannerBox">
                                <h1 className={item.with.reduce((p, c) => p += (c + ' '), '')}>{item.title}</h1>
                                <img src={img[item.img]} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        {
            products(2, 4)
        }
        <div className="banner pb-40">
            <div className="window">
                <div className="bannerContent">
                    {
                        pLoading ? 
                        <>
                            <LoaderIndexPromos/>
                            <LoaderIndexPromos/>
                        </>
                        : 
                        promos.slice(2, 4).map((item, index) => 
                        (
                            <div className="bannerBox">
                                <h1 className={item.with.reduce((p, c) => p += (c + ' '), '')}>{item.title}</h1>
                                <img src={img[item.img]} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        {
            products(4, 5)
        }
        <div className="news">
            <div className="window">
                <h1>Новости</h1>
                <a href="" className="a">Читать все</a>
                <div className="newsContent">
                    <div className="newsBox">
                        <h1>Открытие нового магазина</h1>
                        <h6>Разнообразный и богатый опыт говорит нам, что консультация с широким активом требует от нас анализа анализа существующих паттернов поведения</h6>
                        <div className="flexer">
                            <a href="" className="ppp">Подробнее</a>
                            <p>05 июня 2021</p>
                        </div>
                    </div>
                    <div className="newsBox">
                        <h1>Открытие нового магазина</h1>
                        <h6>Разнообразный и богатый опыт говорит нам, что консультация с широким активом требует от нас анализа анализа существующих паттернов поведения</h6>
                        <div className="flexer">
                            <a href="" className="ppp">Подробнее</a>
                            <p>05 июня 2021</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default IndexMain