import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { some, stars } from '../store/index';
import * as img from '../img/index';
import '../css/Catalog.css';
import { add, remove } from '../store/products';
import { useCallback } from 'react';

const polzunok = 14

function removeDuplicates(arr, key){

    const result = []
    const duplicatesIndices = []

    arr.forEach((current, index) => {

        if(duplicatesIndices.includes(index)) return

        result.push(current.specification[key])

        for(let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++){

            const comparison = arr[comparisonIndex]

            let valuesEqual = true
            if(current.specification[key] !== comparison.specification[key]){
                valuesEqual = false
                break
            }

            if(valuesEqual) duplicatesIndices.push(comparisonIndex)

        }
    })
    return result
}

function Catalog(){
    const dispatch = useDispatch()

    const state = useSelector(state => state.products)

    const arr = state.allProducts.map((item) => item.realPrice)

    const min = Math.min(...arr)

    const max = Math.max(...arr)

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

    const products = useCallback(() => {
        let products = state.allProducts

        if(filter.podsvetka !== null && filter.podsvetka != ''){
            products = products.filter((item) => item.specification['??????????-????????????????'] == filter.podsvetka)
        }

        if(filter.moshnost !== null && filter.moshnost != ''){
            products = products.filter((item, index) => filter.moshnost.includes(item.specification['???????????????? ??????????????????'].toString()))
        }

        if(filter.maksSpeed !== null && filter.maksSpeed != ''){
            products = products.filter((item, index) => filter.maksSpeed.includes(item.specification['????????. ???????????????? ??????(????/??):'].toString()))
        }

        products = products.filter(item => {
            return item.realPrice <= maxValue && item.realPrice >= minValue
        })

        return products
    }, [filter])

    const filtersChecks = {
        podsvetka: removeDuplicates(state.allProducts, '??????????-????????????????'),
        moshnost: removeDuplicates(state.allProducts, '???????????????? ??????????????????'),
        maksSpeed: removeDuplicates(state.allProducts, '????????. ???????????????? ??????(????/??):')
    }

    const filters = [
        {
            key: 'price',
            title: '????????, ???',
            content: <div className={`dropContent`}>
                    <div className="dropInput">
                        <span>????</span>
                        <input value={values.min} type="text" onChange={e => setValues({...values, min: e.target.value})} onBlur={handler}/>
                        <span>????</span>
                        <input value={values.max} type="text" onChange={e => setValues({...values, max: e.target.value})} onBlur={handler}/>
                    </div>
                    <div className="input-range">
                        <input
    
                            style={styles.min}
    
                            type="range"
    
                            id='min'
    
                            name='min'
    
                            step={10}
    
                            min={min}
    
                            max={middle}
    
                            value={minValue}
    
                            onChange={({ target }) => setMinValue(Math.round(Number(target.value)))} />
    
                        {/* <div className="bg" style={styleBg}></div> */}
    
                        <input
    
                            style={styles.max}
    
                            type="range"
    
                            id='max'
    
                            name='max'
    
                            step={10}
    
                            min={middle}
    
                            max={max}
    
                            value={maxValue}
    
                            onChange={({ target }) => setMaxValue(Math.round(Number(target.value)))} />
                    </div>
                <button className="change" onClick={() => setCan(true)}>??????????????????</button>
            </div>
        },
        {
            key: 'podsvetka',
            title: '??????????????????',
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
            title: '???????????????? ?????????????????? (????????)',
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
            title: '???????????????????????? ???????????????? (????/??)',
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
                <h1>??????????????</h1>
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
                                filter.podsvetka !== null && filter.podsvetka !== '' ? <p>??????????????????: {filter.podsvetka}
                                    <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, podsvetka: null})}/>
                                </p> : null
                            }
                            {
                                filter.moshnost !== null && filter.moshnost.length != 0 ? 
                                filter.moshnost.length != 1 ? 
                                <p>???????????????? ?????????????????? (????????) ???? {filter.moshnost.sort((a, b) => a - b)[0]} ???? {filter.moshnost.sort((a, b) => b - a)[0]}
                                    <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, moshnost: null})}/>
                                </p> : 
                                <p>???????????????? ?????????????????? (????????): {filter.moshnost[0]}
                                    <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, moshnost: null})}/>
                                </p>
                                : null
                            }
                            {
                                filter.maksSpeed !== null && filter.maksSpeed.length != 0 ? 
                                filter.maksSpeed.length > 1 ? 
                                <p>???????????????????????? ???????????????? (????/??) ???? {filter.maksSpeed.sort((a, b) => a - b)[0]} ???? {filter.maksSpeed.sort((a, b) => b - a)[0]}
                                    <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, maksSpeed: null})}/>
                                </p> : 
                                <p>???????????????????????? ???????????????? (????/??): {filter.maksSpeed[0]}
                                    <img src={img.x} className='deleteBut' onClick={() => setFilter({...filter, maksSpeed: null})}/>
                                </p>
                                : null
                            }
                            {
                                filter.realPrices.min != min || filter.realPrices.max != max ? 
                                <p>????????: ??????{filter.realPrices.min}????? ??????{filter.realPrices.max}?????
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
                                }}>???????????????? ??????????????</button> : 
                                null                                
                            }
                        </div>
                        <div className="xityProdajContent">
                        {
                            products().map((item) => (
                                <div className="xityProdajBox" key={item.id}>
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
                                            <del className={`${item.price == item.realPrice ? 'visible' : ''}`}>{item.price} ???</del>
                                            <h3>{item.realPrice} ???</h3>
                                            <h4><span className="spanone">{item.sale} %</span> <span className="spantwo">??? {item.space} ???</span></h4>
                                        </div>
                                        <div className="statslike">
                                            <div className={`likebutton arbuttons ${!some('favorites', item.id) ? 'add' : 'remove'}`} onClick={() => dispatch( some('favorites', item.id) ? remove({module: 'favorites', id: item.id}) : add({ module: 'favorites', id: item.id }))}>
                                            </div>
                                            <div className={`comparebutton arbuttons ${!some('compare', item.id) ? 'add' : 'remove'}`}  onClick={() => dispatch( some('compare', item.id) ? remove({module: 'compare', id: item.id}) : add({ module: 'compare', id: item.id }))}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cart">
                                        <a href="">???????????? ????1 ????????</a>
                                        <div className={`cartbutton arbuttons ${!some('cart', item.id) ? 'add' : 'remove'}`} onClick={() => dispatch( some('cart', item.id) ? remove({module: 'cart', id: item.id}) : add({ module: 'cart', id: item.id, count: 1 }))}>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog