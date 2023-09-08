import React from 'react';
import { useLocation } from 'react-router';
import useGetContents from '../hooks/getContents';

function Promo(){
    const pathname = useLocation().pathname.split('/')

    const currentId = pathname[pathname.length - 1]

    const [data, loading] = useGetContents([currentId], '/promo')

    return <div className="promo">
        <div className="window">
            {
                loading ? <>safasasgas</> :
                <>
                    <h1>{ data[0].title }</h1>
                    <div className="newContent">
                        <div className="newText">
                            <p>{ data[0].content }</p>
                            <h4>Условия Акции:</h4>
                            <ol>
                                {
                                    data[0].terms.map((item) => (
                                        <li key={item}>{ item }</li>
                                    ))
                                }
                            </ol>
                        </div>
                        <div className="newImg">
                            <img src={data[0].src} alt=''/>
                        </div>
                    </div>
                </>
            }
            
        </div>
    </div>
    
}

export default Promo