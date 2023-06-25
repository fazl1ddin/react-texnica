import { useState } from "react"

function Polzunok({step, min, max}){
    const [minv, setMin] = min
    const [maxv, setMax] = max
    // const [minPos, setMinPos] = useState(0)
    // const [maxPos, setMaxPos] = useState(0)
    let minPos = 0
    let maxPos = 0
    let isDrag = false
    const handler = (buttone, type) => {
        isDrag = true
        minPos = minPos || buttone.target.offsetParent.getBoundingClientRect().left - 14
        maxPos = maxPos || buttone.target.offsetParent.getBoundingClientRect().width - 14
        let dotOB = buttone.clientX - buttone.target.getBoundingClientRect().left
        const handlerW = (mousee) => {
            const xc = mousee.clientX
            if (isDrag) {
                if (type === 'min') {
                    if(((buttone.target.offsetParent.getBoundingClientRect().left + dotOB) < mousee.clientX && (xc - buttone.target.offsetParent.getBoundingClientRect().left) - dotOB < (maxPos - 14))){
                        minPos = (xc - buttone.target.offsetParent.getBoundingClientRect().left) - dotOB
                        buttone.target.style.transform = `translateX(${minPos}px)`
                    }
                } else if (type === 'max') {
                    if ((((buttone.target.offsetParent.getBoundingClientRect().left + buttone.target.offsetParent.getBoundingClientRect().width + dotOB - 14) > mousee.clientX) && ((minPos + 14 + dotOB) < ((xc - buttone.target.offsetParent.getBoundingClientRect().left) - dotOB)))) {
                        maxPos = (xc - buttone.target.offsetParent.getBoundingClientRect().left) - dotOB
                        buttone.target.style.right = `unset`
                        buttone.target.style.transform = `translateX(${maxPos}px)`
                    }
                }
            } 
        }
        window.addEventListener('mousemove', handlerW)
        window.addEventListener('mouseup', (mouseupe) => {
            isDrag = false
            window.removeEventListener('mousemove', handlerW)
        })
    }

    return <>
        <div>
            <div className="dropInput">
                    <span>от</span>
                    <input value={minv} type="text" onChange={e => setMin(Number(e.target.value))}/>
                    <span>до</span>
                    <input value={maxv} type="text" onChange={e => setMax(Number(e.target.value))}/>
                </div>
                <div className="input-range">
                    <div className="buttons" onMouseDown={(e) => handler(e, 'min')} style={{top: 0, left: 0}}/>

                    {/* <div className="bg" style={styleBg}></div> */}

                    <div className="buttons" onMouseDown={(e) => handler(e, 'max')} style={{top: 0, right: 0}}/>
                </div>
        </div>
    </>
}

export default Polzunok