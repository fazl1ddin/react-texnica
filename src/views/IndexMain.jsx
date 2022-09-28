import React from 'react';
import './../css/Index\ main.css';
import { Link } from 'react-router-dom';
import * as img from './../img/index';
import { useContext, useState } from 'react';
import DropDown from '../contexts/dropDown';
import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from './../store/products';
import { some, stars } from './../store/index';

function IndexMain(){
    const state = useSelector(state => state.products)

    const dispatch = useDispatch()

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
        for (let i = last; i <= Math.floor(state.allProducts.length / 4) * 4; i += 4) {
            if (last == 0 && i == 0) {
            } else {
                news[i / 4 - 1] = {
                    every: state.allProducts.slice(last, i),
                    title: content[i / 4 - 1].title,
                    href: content[i / 4 - 1].href
                }
            }
            last = i
        }
        return news.slice(start, end)
    }

    const dropDown = useContext(DropDown)

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

    const [pagination, setPagination] = useState(0)

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
            products(0, 2).map(item => (
                <div className="xityProdaj" key={item.title}>
                    <div className="window">
                        <h1>{item.title}</h1>
                        <a href="" className="a">{item.href}</a>
                        <div className="xityProdajContent">
                            {
                                item.every.map(every => (
                                    <div className="xityProdajBox mb-15" key={every.id}>
                                        <Link to={`/product/${every.id}`}>
                                            <img onClick={() => dispatch( some('viewed', every.id) ? remove({module: 'viewed', id: every.id}) : add({ module: 'viewed', id: every.id }))} src={`${every.product.src[0]}`} className={`${every.product.class}`} />
                                        </Link>
                                        <img src={`${every.protection.src}`} className={`${every.protection.class}`} />
                                        <div className="notific">
                                            <p className={`${every.news.class}`}>{every.news.content}</p>
                                            <p className={`${every.hit.class}`}>{every.hit.content}</p>
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
                                                <div className={`likebutton arbuttons ${!some('favorites', every.id) ? 'add' : 'remove'}`} onClick={() => dispatch( some('favorites', every.id) ? remove({module: 'favorites', id: every.id}) : add({ module: 'favorites', id: every.id }))}>
                                                </div>
                                                <div className={`comparebutton arbuttons ${!some('compare', every.id) ? 'add' : 'remove'}`}  onClick={() => dispatch( some('compare', every.id) ? remove({module: 'compare', id: every.id}) : add({ module: 'compare', id: every.id }))}>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cart">
                                            <a href="">Купить в 1 клик</a>
                                            <div className={`cartbutton arbuttons ${!some('cart', every.id) ? 'add' : 'remove'}`} onClick={() => dispatch( some('cart', every.id) ? remove({module: 'cart', id: every.id}) : add({ module: 'cart', id: every.id, count: 1 }))}>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            ))
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
            products(2, 4).map(item => (
                <div className="xityProdaj" key={item.title}>
                    <div className="window">
                        <h1>{item.title}</h1>
                        <a href="" className="a">{item.href}</a>
                        <div className="xityProdajContent">
                            {
                                item.every.map(every => (
                                    <div className="xityProdajBox mb-15" key={every.id}>
                                        <Link to="'/product/' + every.id">
                                            <img click="addV(every)" src={`${every.product.src[0]}`} className={`${every.product.class}`} />
                                        </Link>
                                        <img src={`${every.protection.src}`} className={`${every.protection.class}`} />
                                        <div className="notific">
                                            <p className={`${every.news.class}`}>{every.news.content}</p>
                                            <p className={`${every.hit.class}`}>{every.hit.content}</p>
                                        </div>
                                        <div className="xityProdajTexti">
                                            <h5>{every.specification.productName}</h5>
                                            <h3>{every.productName}</h3>
                                        </div>
                                        <div className="rateStar">
                                            <div>

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
                                                <div className={`likebutton arbuttons ${!some('favorites', every.id) ? 'add' : 'remove'}`}>
                                                </div>
                                                <div className={`comparebutton arbuttons ${!some('compare', every.id) ? 'add' : 'remove'}`}>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cart">
                                            <a href="">Купить в 1 клик</a>
                                            <div className={`cartbutton arbuttons ${!some('cart', every.id) ? 'add' : 'remove'}`}>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            ))
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
            products(4, 5).map(item => (
                <div className="xityProdaj" key={item.title}>
                    <div className="window">
                        <h1>{item.title}</h1>
                        <a href="" className="a">{item.href}</a>
                        <div className="xityProdajContent">
                            {
                                item.every.map(every => (
                                    <div className="xityProdajBox mb-15" key={every.id}>
                                        <Link to="'/product/' + every.id">
                                            <img click="addV(every)" src={`${every.product.src[0]}`} className={`${every.product.class}`} />
                                        </Link>
                                        <img src={`${every.protection.src}`} className={`${every.protection.class}`} />
                                        <div className="notific">
                                            <p className={`${every.news.class}`}>{every.news.content}</p>
                                            <p className={`${every.hit.class}`}>{every.hit.content}</p>
                                        </div>
                                        <div className="xityProdajTexti">
                                            <h5>{every.specification.productName}</h5>
                                            <h3>{every.productName}</h3>
                                        </div>
                                        <div className="rateStar">
                                            <div>

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
                                                <div className={`likebutton arbuttons ${!some('favorites', every.id) ? 'add' : 'remove'}`}>
                                                </div>
                                                <div className={`comparebutton arbuttons ${!some('compare', every.id) ? 'add' : 'remove'}`}>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cart">
                                            <a href="">Купить в 1 клик</a>
                                            <div className={`cartbutton arbuttons ${!some('cart', every.id) ? 'add' : 'remove'}`}>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>
            ))
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