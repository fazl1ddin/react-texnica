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

    const pagin = (current, length) => {
        let result = []
        if(length <= 5){
            for(let index = 1; index <= length; index++){
                result.push(index)
            }
        } else {
            if ((length / 2) > current) {
                if (current === 1) {
                    for (let index = 0; index < 3; index++) {
                        result[index] = current + index
                    }
                } else {
                    for (let index = current - 1; index <= current + 1; index++) {
                        result[index - 1] = index
                    }
                }
                result[4] = '...'
                result[length - 1] = length
            } else {
                if (current === length) {
                    for (let index = length; index > length - 3; index--) {
                        result[index] = index
                    }
                } else {
                    for (let index = current + 1; index >= current - 1; index--) {
                        result[index] = index
                    }
                }
                result[1] = '...'
                result[0] = 1
            }
        }
        return result.map((item, i) => (
            <a key={i} className={item == current ? 'active' : ''} onClick={(e) => changePage(e.target.innerText)}>{ item }</a>
        ))
    }

    const changePage = (item) => {
        if(isNaN(item)){
            setCurrentId(currentId <= length / 2 ? currentId + 2 : currentId - 2)
        } else {
            setCurrentId(Number(item))
        }
    }
    
    return <div className={`pagination ${length < 4 ? 'minw' : 'maxw'}`}>
        <div className="pagination-content">
            <a onClick={() => changePage(Math.max(currentId - 1, 0))}>&#9204;</a>
            {
                pagin(currentId, length)
            }
            <a onClick={() => changePage(Math.min(currentId + 1, length))}>&#9205;</a>
        </div>
    </div>
}

export default Pagination