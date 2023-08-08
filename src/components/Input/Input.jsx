function Input(props) {
  let result = (
    <div data-valid={props.valid} className="modalWrapper" key={props.name}>
      <label htmlFor={props.name}>{props.title}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        id={props.name}
        onChange={(e) => props.change.call(props, e)}
      />
      {props.valid === 0 ? null : props.valid === 1 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g id="icon-right" clipPath="url(#clip0_179_8163)">
            <g id="Group">
              <circle
                id="Oval"
                cx="11.9998"
                cy="12.0001"
                r="9.00375"
                stroke="#22A44E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Path"
                d="M8.44531 12.3392L10.6132 14.5071L10.5992 14.4931L15.4902 9.60205"
                stroke="#22A44E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_179_8163">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g id="icon-right" clipPath="url(#clip0_158_9516)">
            <g id="Group">
              <circle
                id="Oval"
                cx="11.9989"
                cy="12"
                r="9.00375"
                stroke="#F15152"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Path"
                d="M14.0009 9.99915L9.99927 14.0008"
                stroke="#F15152"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                id="Path_2"
                d="M14.0009 14.0008L9.99927 9.99915"
                stroke="#F15152"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_158_9516">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </div>
  );

  switch (props.type) {
    case "phone":
      result = (
        <div data-valid={props.valid} className="modalWrapper" key={props.name}>
          <label htmlFor={props.name}>{props.title}</label>
          <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            id={props.name}
            onKeyDown={(e) => props.keyDown(props, e)}
            onChange={(e) => props.change(props, e)}
            onFocus={(e) => props.focus(props, e)}
            onBlur={(e) => props.blur(props, e)}
          />
          {props.valid === 0 ? null : props.valid === 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="icon-right" clipPath="url(#clip0_179_8163)">
                <g id="Group">
                  <circle
                    id="Oval"
                    cx="11.9998"
                    cy="12.0001"
                    r="9.00375"
                    stroke="#22A44E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path"
                    d="M8.44531 12.3392L10.6132 14.5071L10.5992 14.4931L15.4902 9.60205"
                    stroke="#22A44E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_179_8163">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="icon-right" clipPath="url(#clip0_158_9516)">
                <g id="Group">
                  <circle
                    id="Oval"
                    cx="11.9989"
                    cy="12"
                    r="9.00375"
                    stroke="#F15152"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path"
                    d="M14.0009 9.99915L9.99927 14.0008"
                    stroke="#F15152"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path_2"
                    d="M14.0009 14.0008L9.99927 9.99915"
                    stroke="#F15152"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_158_9516">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
      );
      break;
    case "password":
      result = (
        <div data-valid={props.valid} className="modalWrapper" key={props.name}>
          <label htmlFor={props.name}>{props.title}</label>
          <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            id={props.name}
            onChange={(e) => props.change(props, e)}
          />
          {props.valid === 0 ? null : props.valid === 1 ? (
            <svg
              style={{ right: "-27px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="icon-right" clipPath="url(#clip0_179_8163)">
                <g id="Group">
                  <circle
                    id="Oval"
                    cx="11.9998"
                    cy="12.0001"
                    r="9.00375"
                    stroke="#22A44E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path"
                    d="M8.44531 12.3392L10.6132 14.5071L10.5992 14.4931L15.4902 9.60205"
                    stroke="#22A44E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_179_8163">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              style={{ right: "-27px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="icon-right" clipPath="url(#clip0_158_9516)">
                <g id="Group">
                  <circle
                    id="Oval"
                    cx="11.9989"
                    cy="12"
                    r="9.00375"
                    stroke="#F15152"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path"
                    d="M14.0009 9.99915L9.99927 14.0008"
                    stroke="#F15152"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Path_2"
                    d="M14.0009 14.0008L9.99927 9.99915"
                    stroke="#F15152"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_158_9516">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
          <svg onClick={() => props.setType(props)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
              stroke="#070C11"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              stroke="#070C11"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      );
      break;
    default:
      break;
  }
  return result;
}

export default Input;
