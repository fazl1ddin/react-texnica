import React from 'react';
import './../css/Index\ main.css';
import { Link } from 'react-router-dom';
import * as img from './../img/index';
import { useContext, useState } from 'react';
import DropDown from '../contexts/dropDown';
import { useSelector, useDispatch } from 'react-redux';
import { some, stars, updateOne } from './../store/index';
import useGetData from '../hooks/getData'
import Loader from '../components/Loaders/Loader';
import Products4Loader from '../components/Loaders/Products4Loader';
import config from '../api/config';
import CardUpdate from '../components/ButtonsForUpdate/CardUpdate';

function IndexMain(){

    const dropDown = useContext(DropDown)

    const [pagination, setPagination] = useState(0)

    const {data, loading} = useGetData('/products', 'GET', [])

    const state = data

    const content = [
        {
            title: "Хиты продаж",
            href: "Все товары",
        },
        {
            title: "Новинки",
            href: "Все товары",
        },
        {
            title: "Сигвеи",
            href: "Все товары",
        },
        {
            title: "Моноколеса",
            href: "Все товары",
        },
        {
            title: "Электровелосипеды",
            href: "Все товары",
        }
    ]

    const products = (start, end) => {
        let news = []
        let last = 0
        for (let i = last; i <= Math.floor(state.length / 4) * 4; i += 4) {
            if (last !== 0 || i !== 0){
                news[i / 4 - 1] = {
                    every: state.slice(last, i).map((item, index) => ({
                        ...item,
                        get space(){
                            const count = this.price - (this.price * this.sale / 100)
                            const [_, num, suffix] = (this.price - count).toString().match(/^(.*?)((?:[,.]\d+)?|)$/)
                            return num.replace(/\B(?=(?:\d{3})*$)/g, ' ') + suffix
                        },
                        get realPrice(){
                            return this.price - (this.price * this.sale / 100)
                        },
                    })),
                    title: content[i / 4 - 1].title,
                    href: content[i / 4 - 1].href
                }
            }
            last = i
        }

        const loaders = []
        for (let index = 0; index < end - start; index++) {
            loaders.push(<Products4Loader key={index}/>)
        }
        
        return loading ? loaders : news.slice(start, end).map(item => {

            return (<div className="xityProdaj" key={item.title}>
                <div className="window">
                    <h1>{item.title}</h1>
                    <a href="" className="a">{item.href}</a>
                    <div className="xityProdajContent">
                        {
                            item.every.map(every => (
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
                                            <div className={`likebutton arbuttons ${some('favorites', every._id) ?  'remove' : 'add'}`} onClick={() => updateOne(some('favorites', every._id) ? 'remove' : 'add', 'favorites', every._id)}>
                                            </div>
                                            <div className={`comparebutton arbuttons ${some('compare', every._id) ?  'remove' : 'add'}`}  onClick={() => updateOne(some('compare', every._id) ? 'remove' : 'add', 'compare', every._id)}>
                                            </div>
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
                    <div className="bannerBox">
                        <h1 className="w-210">Скидки до 30% на сигвеи</h1>
                        <img src={img.sale1} alt="" />
                    </div>
                    <div className="bannerBox">
                        <h1 className="w-180">Неделя смарт часов</h1>
                        <img src={img.sale2} alt="" />
                    </div>
                </div>
            </div>
        </div>
        {
            products(2, 4)
        }
        <div className="banner pb-40">
            <div className="window">
                <div className="bannerContent">
                    <div className="bannerBox">
                        <h1 className="w-180">Распродажа до — 50%</h1>
                        <img src={img.sale3} />
                    </div>
                    <div className="bannerBox pr-0">
                        <h1 className="w-330">Smart Balance Premium по специальной цене</h1>
                        <img src={img.sale4} className="mr-20" />
                    </div>
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