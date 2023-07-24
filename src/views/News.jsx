import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import '../css/News.css';
import '../css/NewsContent.css';
import useGetDWP from '../hooks/getDWP';
import Pagination from '../components/Pagination/Pagination';
import LoaderPromos from '../components/Loaders/LoaderPromos';

function News(){
    const [params] = useSearchParams();
  
    const [page, setPage] = useState(
      Number(params.has("index") ? params.get("index") : 1)
    );

    const [{ data, allength }, loading] = useGetDWP('/news', page, 6);

    return <>
    <div className="news new">
        <div className="window">
            <h1>Новости</h1>
            {
                loading ? <LoaderPromos /> :
                <>
                    <div className="box">
                        {
                            data.map((item, i) => (
                                <div className="content" key={i}>
                                    <div className="img">
                                        <img src={item.photo}/>
                                    </div>
                                    <div className="text">
                                        <div>
                                            <h1>{ item.title }</h1>
                                            <p>{ item.content }</p>
                                        </div>
                                        <div className="flexer">
                                            <Link to={`/new/${item._id}`}>Подробнее</Link>
                                            <h5>{ item.date }</h5>
                                        </div>
                                    </div>
                                </div>
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

export default News