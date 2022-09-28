import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { contentById } from '../store/index';
import '../css/NewContent.css';

function NewContent(){
    const pathname = useLocation().pathname.split('/')

    const currentId = Number(pathname[pathname.length - 1])

    const content = contentById('news', currentId)

    return <>
    <div className="new">
        <div className="window">
            <h1>{ content.bigContent.ftitle }</h1>
            <div className="newContent">
                <div className="newText">
                    <p dangerouslySetInnerHTML={{__html:content.bigContent.fcontent}}></p>
                    <h3>{ content.bigContent.stitle }</h3>
                    <p dangerouslySetInnerHTML={{__html:content.bigContent.scontent}}></p>
                </div>
                <div className="newImg">
                    <img src={content.photo}/>
                </div>
            </div>
        </div>
    </div>
    </>
}
   
export default NewContent