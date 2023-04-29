import { Link } from "react-router-dom"
import RouterDotsLoader from "./RouterDotsLoader"

function RouterDots({routers, loading}){
    return routers.map(router => 
        loading ?
        <RouterDotsLoader key={router.class}/>
        :
        <Link className='dota' key={router.class} to={router.to}>
            {router.length ? <span className="dotspan">{router.length}</span> : null}
            <img className={router.class} src={router.src}/>
        </Link>
    )
}

export default RouterDots