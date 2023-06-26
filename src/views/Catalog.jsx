import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRealPrice, getSpace, removeDuplicates, some, stars, updateOne } from '../store/index';
import * as img from '../img/index';
import '../css/Catalog.css';
import { useCallback } from 'react';
import useGetAP from '../hooks/getAllProducts';
import config from '../api/config';
import FavoritesUpdate from '../components/ButtonsForUpdate/FavoritesUpdate';
import CompareUpdate from '../components/ButtonsForUpdate/CompareUpdate';
import CardUpdate from '../components/ButtonsForUpdate/CardUpdate';
import ProductImage from '../components/ProductImage/ProductImage';
import Polzunok from '../components/Polzunok/Polzunok';

const polzunok = 14

function Catalog(){
    const [{data: products, filtersChecks}, loading] = useGetAP(1, 12)

    const state = useSelector(state => state.products)

    const arr = state.allProducts.map((item) => item.realPrice)

    const [min, setMin] = useState(0)

    const [max, setMax] = useState(0)

    useEffect(() => {
        setMin(filtersChecks.price ? filtersChecks.price.min : 0)
        setMax(filtersChecks.price ? filtersChecks.price.max : 0)
    }, [filtersChecks])

    const [can, setCan] = useState(false)

    const [middle, setMiddle] = useState((min + max) / 2)

    const [minValue, setMinValue] = useState(min)

    const [maxValue, setMaxValue] = useState(max)

    const width = 310

    const minWidth = polzunok + ((middle - min) / (max - min)) * (width - 2 * polzunok)

    const maxWidth = polzunok + ((max - middle) / (max - min)) * (width - 2 * polzunok)

    const divWidth = polzunok + ((maxValue - minValue) / (max - min) * (width - 2 * polzunok))

    const left = ((polzunok / 2) - (minValue) / (width + minWidth))

    const right = (maxValue / width + polzunok / 2)

    const styles = {
        min: {
            width: Math.round(minWidth)
        },
        max: {
            width: Math.round(maxWidth)
        }
    }

    const styleBg = {
        width: divWidth,
        left: left,
        right: right,
    }

    const [moshnosts, setMoshnosts] = useState([])

    const [maxSpeeds, setMaxSpeeds] = useState([])

    const [filter, setFilter] = useState({
        realPrices: {
            min: null,
            max: null
        },
        podsvetka: null,
        moshnost: null,
        maksSpeed: null
    })

    useEffect(() => {
        setFilter({...filter, maksSpeed: maxSpeeds})
    }, [maxSpeeds])

    useEffect(() => {
        setFilter({...filter, moshnost: moshnosts})
    }, [moshnosts])

    const [openIndex, setOpenIndex] = useState({
        price: false,
        podsvetka: false,
        moshnost: false,
        maksSpeed: false
    })

    const [values, setValues] = useState({min: min, max: max})

    useEffect(() => {
        setMiddle((minValue + maxValue) / 2)
    }, [minValue, maxValue])

    const handler = () => {
        if(isNaN(values.min)){
            setMinValue(min)
        } else {
            setMinValue(Math.min(max, Math.max(values.min, min)))
        }
        if(isNaN(values.max)){
            setMaxValue(max)
        } else {
            setMaxValue(Math.min(max, Math.max(values.max, min)))
        }
        if(values.min != minValue || values.max != maxValue){
            setValues({min: minValue, max: maxValue})
        }
    }

    useEffect(() => {
        setValues({min: minValue, max: maxValue})
    }, [minValue, maxValue])

    useEffect(() => {
        setFilter({...filter, realPrices: {min: minValue, max: maxValue}})
    }, [can])

    const filters = loading ? [] : [
        {
            key: 'price',
            title: 'Цена, ₽',
            content: <div className={`dropContent`}>
                <Polzunok prices={filtersChecks.price} step={10} min={[min, setMin]} max={[max, setMax]}/>
                <button className="change" onClick={() => setCan(true)}>Применить</button>
            </div>
        },
        {
            key: 'podsvetka',
            title: 'Подсветка',
            get content(){
                return <div className={`dropInputCheck min`}>
                    {
                        filtersChecks[this.key].map((item, i) => (
                            <div className="checkbox" key={item}>
                                <input className="custom-checkbox" onChange={e => setFilter({...filter, [this.key]: e.target.checked ? e.target.value : null})} checked={filter[this.key] == item} type="checkbox" id={`color-${item}`} value={item}/>
                                <label htmlFor={`color-${item}`}>{item}</label>
                            </div>
                        ))
                    }
                </div>
            }
        },
        {
            key: 'moshnost',
            title: 'Мощность двигателя (Ватт)',
            get content(){
                return <div className={`dropInputCheck max`}>
                    {
                        filtersChecks[this.key]
                        .sort((a, b) => a - b)
                        .map((item, i) => (
                            <div className="checkbox" key={item}>
                                <input className="custom-checkbox" type="checkbox" onChange={e => {
                                    if(e.target.checked){
                                        setMoshnosts([...moshnosts, [i] = e.target.value])
                                    } else {
                                        setMoshnosts(moshnosts.filter(items => moshnosts[i] != items))
                                    }
                                }} id={`color-${item}`} value={item}/>
                                <label htmlFor={`color-${item}`}>{item}</label>
                            </div>
                        ))
                    }
                </div>
            }            
        },
        {
            key: 'maksSpeed',
            title: 'Максимальная скорость (км/ч)',
            get content(){
                return <div className={`dropInputCheck min`}>
                    {
                        filtersChecks[this.key]
                        .sort((a, b) => a - b)
                        .map((item, i) => (
                            <div className="checkbox" key={item}>
                                <input className="custom-checkbox" type="checkbox" onChange={e => {
                                    if(e.target.checked){
                                        setMaxSpeeds([...maxSpeeds, [i] = e.target.value])
                                    } else {
                                        setMaxSpeeds(maxSpeeds.filter(items => maxSpeeds[i] != items))
                                    }
                                }} id={`color-${item}`} value={item}/>
                                <label htmlFor={`color-${item}`}>{item}</label>
                            </div>
                        ))
                    }
                </div>
            }
        }
    ]

    return (
        <div className="catalog">
            <div className="window">
                <h1>Каталог</h1>
                {
                    loading ? 'assafsaafsfas'
                    :
                    <div className="catalogContent">
                        <div className="filter">
                            {
                                filters.map((item, index) => (
                                    <div className={`drop ${openIndex[item.key] ? 'anim' : ''}`} key={index}>
                                        <button onClick={() => setOpenIndex({...openIndex, [item.key]: !openIndex[item.key]})} className={openIndex[item.key] ? '' : 'droper'}>{ item.title }</button>
                                        {item.content}
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <div className="filters">
                                {
                                    filter.podsvetka !== null && filter.podsvetka !== '' ? <p>Подсветка: {filter.podsvetka}
                                        <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, podsvetka: null})}/>
                                    </p> : null
                                }
                                {
                                    filter.moshnost !== null && filter.moshnost.length != 0 ? 
                                    filter.moshnost.length != 1 ? 
                                    <p>Мощность двигателя (Ватт) от {filter.moshnost.sort((a, b) => a - b)[0]} до {filter.moshnost.sort((a, b) => b - a)[0]}
                                        <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, moshnost: null})}/>
                                    </p> : 
                                    <p>Мощность двигателя (Ватт): {filter.moshnost[0]}
                                        <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, moshnost: null})}/>
                                    </p>
                                    : null
                                }
                                {
                                    filter.maksSpeed !== null && filter.maksSpeed.length != 0 ? 
                                    filter.maksSpeed.length > 1 ? 
                                    <p>Максимальная скорость (км/ч) от {filter.maksSpeed.sort((a, b) => a - b)[0]} до {filter.maksSpeed.sort((a, b) => b - a)[0]}
                                        <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, maksSpeed: null})}/>
                                    </p> : 
                                    <p>Максимальная скорость (км/ч): {filter.maksSpeed[0]}
                                        <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, maksSpeed: null})}/>
                                    </p>
                                    : null
                                }
                                {
                                    filter.realPrices.min != min || filter.realPrices.max != max ? 
                                    <p>Цена: от {filter.realPrices.min} ₽ до {filter.realPrices.max} ₽
                                        <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, realPrices: {min: min, max: max}})}/>
                                    </p> 
                                    : null
                                }
                                {
                                    !Object.values(filter).every((item) => typeof item == 'object') ? <button className='clear' onClick={() => {
                                        let obj = {}
                                        Object.keys(filter).forEach((iteme) => {
                                            obj[iteme] = null
                                            obj['realPrices'] = {min: min, max: max}
                                        })
                                        setFilter(obj)
                                    }}>Очистить фильтры</button> : 
                                    null                                
                                }
                            </div>
                            <div className="xityProdajContent">
                            {
                                products.map((item) => (
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
                                            <del className={`${!item.sale ? 'visible' : ''}`}>{item.price} ₽</del>
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
                    </div>
                }
            </div>
        </div>
    )
}

export default Catalog