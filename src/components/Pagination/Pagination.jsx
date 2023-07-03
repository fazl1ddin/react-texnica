import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

function Pagination({ length, setPage }) {
    const [params, setParams] = useSearchParams()

    useEffect(() => {
        params.has('index') || setParams({index: 1})
    }, [])

    const [currentId, setCurrentId] = useState(Number(params.has('index') ? params.get('index') : 1))

    useEffect(() => {
        setParams({ index: currentId })
        setPage(currentId)
    }, [currentId])

    const pagination = () => {
        if(length <= 5){
            let pag = []
            for(let index = 1; index <= length; index++){
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
                if(currentId < length / 2){
                    if(currentId == 1){
                        for(let i = currentId; i < currentId + 2; i++){
                            pag.start[i] = i
                        }
                    } else {
                        for(let i = currentId - 1; i < currentId + 1; i++){
                            pag.start[i] = i
                        }
                    }
                } else if(currentId == length / 2){
                    pag.start = length / 2 - 1
                    pag.middle = []
                        for(let i = currentId; i < currentId + 1; i++){
                            pag.middle[i] = i
                        }
                    pag.end = length / 2 + 1
                } else {
                    if(currentId == length ){
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
                if(currentId < Math.ceil(length / 2)){
                    if(currentId < 2){
                        for(let i = currentId; i <= currentId + 2; i++){
                            pag.start[i] = i
                        }
                    } else {
                        for(let i = currentId - 1; i <= currentId + 1; i++){
                            pag.start[i] = i
                        }
                    }
                    pag.end = length
                } else if (currentId == Math.ceil(length / 2)){
                    pag.start = Math.ceil(length / 2) - 2
                    pag.middle = []
                    for(let i = currentId - 1; i <= currentId + 1; i++){
                        pag.middle[i] = i
                    }
                    pag.end = Math.ceil(length / 2) - 2
                } else {
                    if(currentId == length){
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
            setCurrentId(currentId <= length / 2 ? currentId + 2 : currentId - 2)
        } else {
            setCurrentId(Number(item))
        }
    }
    
    return <div className={`pagination ${length < 5 ? 'minw' : 'maxw'}`}>
        <div className="pagination-content">
            <a onClick={() => changePage(Math.max(currentId - 1, 0))}>&#9204;</a>
            {
                pagination().map((item, i) => (
                    <a key={i} className={item == currentId ? 'active' : ''} onClick={(e) => changePage(e.target.innerText)}>{ item }</a>
                ))
            }
            <a onClick={() => changePage(Math.min(currentId + 1, length))}>&#9205;</a>
        </div>
    </div>
}

export default Pagination