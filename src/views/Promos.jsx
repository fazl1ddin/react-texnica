import React from 'react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../css/Promos.css';
import '../css/PromosContent.css';
import useGetDWP from '../hooks/getDWP';
import Pagination from '../components/Pagination/Pagination';
import LoaderPromos from '../components/Loaders/LoaderPromos';

function Promos(){
    const [params] = useSearchParams();
  
    const [page, setPage] = useState(
      Number(params.has("index") ? params.get("index") : 1)
    );

    const [{ data, allength }, loading] = useGetDWP('/promos', page, 8);

    return <>
    <div className="news new">
        <div className="window">
            <h1>Новости</h1>
            {
                loading ? <LoaderPromos /> :
                <>
                    <div className="box">
                        {
                            data.map(item => (
                            <Link to={`/promo/${item._id}`}>
                                <div className="content" key={item._id}>
                                    <h2>{ item.title }</h2>
                                    <div className="img">
                                        <img src={item.src} alt=''/>
                                    </div>
                                </div>
                            </Link>
                            ))
                        }
                    </div>
                    <Pagination length={allength} setPage={setPage} />
                </>
            }
        </div>
    </div>
    </>
}

export default Promos