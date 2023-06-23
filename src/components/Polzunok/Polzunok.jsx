function Polzunok({step, min, max}){
    const [minv, setMin] = min
    const [maxv, setMax] = max
    let minPos = 0
    let maxPos = 0
    let prevX = null
    let isDrag = false
    const handler = (buttone) => {
        isDrag = true
        prevX = buttone.clientX
        maxPos = buttone.target.offsetParent.getBoundingClientRect().width
        let dotOB = buttone.clientX - buttone.target.getBoundingClientRect().left
        const handlerW = (mousee) => {
            // console.log(maxPos);
            // console.log(minPos);
            const xc = mousee.clientX
            const bxc = buttone.clientX
            if(isDrag){
                minPos = (xc - buttone.target.offsetParent.getBoundingClientRect().left) - dotOB
                let curX = mousee.clientX
                // console.log(`xc : ${xc},`, `bxc : ${bxc},`, `minPos : ${minPos}`);
                // if(curX > prevX){
                //     minPos = xc - bxc
                //     console.log('right');
                //     buttone.target.style.transform = `translateX(${xc - bxc}px)`
                // } else if(curX < prevX){
                //     console.log('left');
                //     buttone.target.style.transform = `translateX(${minPos + (xc - bxc)}px)`
                // }
                if(((buttone.target.offsetParent.getBoundingClientRect().left + dotOB) < mousee.clientX && minPos < maxPos)){
                    buttone.target.style.transform = `translateX(${minPos}px)`
                }
                prevX = curX
            }
            // console.log('mouse xc  ' + xc, 'buttons xc  ' + bxc);
            // if(((buttone.target.offsetParent.getBoundingClientRect().left + buttone.clientX - buttone.target.getBoundingClientRect().left) < mousee.clientX)){
                // if(xc === bxc + buttone.clientX - buttone.target.getBoundingClientRect().left){
                // } else if(xc > (bxc + (buttone.clientX - buttone.target.getBoundingClientRect().left))){
                //     console.log('chapdan onga');
                //     minPos = xc - bxc
                //     buttone.target.style.transform = `translateX(${minPos}px)`
                // } else if((bxc + (buttone.clientX - buttone.target.getBoundingClientRect().left)) > xc){
                //     console.log('ondan chapga');
                //     buttone.target.style.transform = `translateX(${bxc + minPos}px)`
                // }
            // }
            // console.log(mousee); 
        }
        window.addEventListener('mousemove', handlerW)
        window.addEventListener('mouseup', (mouseupe) => {
            window.removeEventListener('mousemove', handlerW)
            console.log(mouseupe);
        })
        console.log(buttone);
        console.log(buttone.target.offsetParent.getBoundingClientRect());
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
                    <div className="buttons" onMouseDown={handler} style={{top: 0, left: 0}}/>

                    {/* <div className="bg" style={styleBg}></div> */}

                    <div className="buttons" style={{top: 0, right: 0}}/>
                </div>
        </div>
    </>
}

export default Polzunok