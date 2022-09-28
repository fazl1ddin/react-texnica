import React from 'react';
import { useLocation } from 'react-router';
import { contentById } from '../store';

function Promo(){
    const pathname = useLocation().pathname.split('/')

    const currentId = Number(pathname[pathname.length - 1])

    const content = contentById('promos', currentId)

    return <>
        <div className="promo">
            <div className="window">
                <h1>{ content.title }</h1>
                <div className="newContent">
                    <div className="newText">
                        <p>{ content.content }</p>
                        <h4>Условия Акции:</h4>
                        <ol>
                            {
                                content.terms.map((item) => (
                                    <li key={item}>{ item }</li>
                                ))
                            }
                        </ol>
                    </div>
                    <div className="newImg">
                        <img src={content.src}/>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Promo