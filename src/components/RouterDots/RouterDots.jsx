import { Link } from "react-router-dom"
import * as img from '../../img/index';
import RouterDotsLoader from "./RouterDotsLoader"

function RouterDots({routers, loading}){
    return Object.entries(routers).map(([key, value]) => 
        loading ?
        <RouterDotsLoader key={key}/>
        :
        <Link className='dota' key={key} to={`/${key}`}>
            {value.length ? <span className="dotspan">{value.length}</span> : null}
            <img className={key} src={img[key]}/>
        </Link>
    )
}

export default RouterDots