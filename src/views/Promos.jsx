import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import '../css/Promos.css';
import '../css/PromosContent.css';

function Promos(){
    const [params, setParams] = useSearchParams()

    useEffect(() => {
        params.has('index') || setParams({index: 1})
    }, [])

    const state = useSelector(state => state.contents)

    const [currentId, setCurrentId] = useState(Number(params.has('index') ? params.get('index') : 1))

    const contents = useCallback(() => {
        let news = []
        let last = 0
        for(let i = 8; i <= Math.ceil(state.promos.length / 8) * 8; i += 8){
            news.push([...state.promos.slice(last, i)])
            last = i
        }
        return news
    }, [currentId])

    const pagination = () => {
        if(contents().length <= 5){
            let pag = []
            for(let index = 1; index <= contents().length; index++){
                pag.push(index)
            }
            return pag
        } else {
            let pag = {
                start: [],
                middle: '...',
                end: []
            }
            if(window.screen.width == 414){
                if(currentId < contents().length / 2){
                    if(currentId == 1){
                        for(let i = currentId; i < currentId + 2; i++){
                            pag.start[i] = i
                        }
                    } else {
                        for(let i = currentId - 1; i < currentId + 1; i++){
                            pag.start[i] = i
                        }
                    }
                } else if(currentId == contents().length / 2){
                    pag.start = contents().length / 2 - 1
                    pag.middle = []
                        for(let i = currentId; i < currentId + 1; i++){
                            pag.middle[i] = i
                        }
                    pag.end = contents().length / 2 + 1
                } else {
                    if(currentId == contents().length ){
                        for(let i = currentId; i > currentId - 2; i--){
                            pag.end[i] = i
                        }
                    } else {
                        for(let i = currentId + 1; i > currentId - 1; i--){
                            pag.end[i] = i
                        }
                    }
                }
            } else {
                if(currentId < Math.ceil(contents().length / 2)){
                    if(currentId < 2){
                        for(let i = currentId; i <= currentId + 2; i++){
                            pag.start[i] = i
                        }
                    } else {
                        for(let i = currentId - 1; i <= currentId + 1; i++){
                            pag.start[i] = i
                        }
                    }
                    pag.end = contents().length
                } else if (currentId == Math.ceil(contents().length / 2)){
                    pag.start = Math.ceil(contents().length / 2) - 2
                    pag.middle = []
                    for(let i = currentId - 1; i <= currentId + 1; i++){
                        pag.middle[i] = i
                    }
                    pag.end = Math.ceil(contents().length / 2) - 2
                } else {
                    if(currentId == contents().length){
                        for(let i = currentId; i >= currentId - 2; i--){
                            pag.end[i] = i
                        }
                    } else {
                        for(let i = currentId + 1; i >= currentId - 1; i--){
                            pag.end[i] = i
                        }
                    }
                    pag.start = 1
                }
            }
            return [pag.start, pag.middle, pag.end].flat()
        }
    }

    const changePage = (item) => {
        if(isNaN(item)){
            setCurrentId(currentId <= state.news.length / 2 ? currentId + 2 : currentId - 2)
        } else {
            setCurrentId(Number(item))
        }
    }

    useEffect(() => {
        setParams({index: currentId})
    }, [currentId])

    return <>
    <div className="news new">
        <div className="window">
            <h1>Новости</h1>
            <div className="box">
                {
                    contents()[currentId - 1].map((item, i) => (
                        <div className="content" key={i}>
                            <h2>{ item.title }</h2>
                            <div className="img">
                                <img src={item.src}/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={`pagination ${state.news.length < 5 ? 'minw' : 'maxw'}`}>
                <div className="pagination-content">
                    <a onClick={() => changePage(Math.max(currentId - 1, 0))}>&#9204;</a>
                    {
                        pagination().map((item, i) => (
                            <a key={i} className={item == currentId ? 'active' : ''} onClick={(e) => changePage(e.target.innerText)}>{ item }</a>
                        ))
                    }
                    <a onClick={() => changePage(Math.min(currentId + 1, contents().length))}>&#9205;</a>
                </div>
            </div>
        </div>
    </div>
    </>
}

export default Promos