function Input(props) {
    let result = <div data-valid={props.valid} className="modalWrapper" key={props.name}>
        <label htmlFor={props.name}>{props.title}</label>
        <input type={props.type} placeholder={props.placeholder} value={props.value} id={props.name} onChange={(e) => props.change.call(props, e)}/>
        {
            props.valid === 0 ? null : props.valid === 1 ?
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g id="icon-right" clipPath="url(#clip0_179_8163)">
            <g id="Group">
            <circle id="Oval" cx="11.9998" cy="12.0001" r="9.00375" stroke="#22A44E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path id="Path" d="M8.44531 12.3392L10.6132 14.5071L10.5992 14.4931L15.4902 9.60205" stroke="#22A44E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            </g>
            <defs>
            <clipPath id="clip0_179_8163">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            : 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g id="icon-right" clipPath="url(#clip0_158_9516)">
            <g id="Group">
            <circle id="Oval" cx="11.9989" cy="12" r="9.00375" stroke="#F15152" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path id="Path" d="M14.0009 9.99915L9.99927 14.0008" stroke="#F15152" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path id="Path_2" d="M14.0009 14.0008L9.99927 9.99915" stroke="#F15152" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            </g>
            <defs>
            <clipPath id="clip0_158_9516">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>
        }
    </div>
    
    switch (props.type) {
        case 'phone':
            result = <div data-valid={props.valid} className="modalWrapper" key={props.name}>
                <label htmlFor={props.name}>{props.title}</label>
                <input type={props.type} placeholder={props.placeholder} value={props.value} id={props.name} onKeyDown={(e) => props.change.call(props, e)} onChange={(e) => {}} onFocus={(e) => props.focus.call(props, e)} onBlur={(e) => props.blur.call(props, e)}/>
                {
                    props.valid === 0 ? null : props.valid === 1 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g id="icon-right" clipPath="url(#clip0_179_8163)">
                    <g id="Group">
                    <circle id="Oval" cx="11.9998" cy="12.0001" r="9.00375" stroke="#22A44E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path id="Path" d="M8.44531 12.3392L10.6132 14.5071L10.5992 14.4931L15.4902 9.60205" stroke="#22A44E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    </g>
                    <defs>
                    <clipPath id="clip0_179_8163">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g id="icon-right" clipPath="url(#clip0_158_9516)">
                    <g id="Group">
                    <circle id="Oval" cx="11.9989" cy="12" r="9.00375" stroke="#F15152" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path id="Path" d="M14.0009 9.99915L9.99927 14.0008" stroke="#F15152" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path id="Path_2" d="M14.0009 14.0008L9.99927 9.99915" stroke="#F15152" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    </g>
                    <defs>
                    <clipPath id="clip0_158_9516">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                }
            </div>
            break;
        default:
            break;
    }
    return result
}

export default Input