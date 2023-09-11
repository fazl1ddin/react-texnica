let index = 0
function Input(props) {
  let result = (
    <div
      data-valid={props.validator && props.valid}
      className="univerI"
      key={props.name}
    >
      <label htmlFor={props.name}>{props.title}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        id={props.name+index}
        onChange={(e) =>
          props.setState((prevState) =>
            prevState.map((item, i) => {
              if (item.name == props.name)
                return {
                  ...item,
                  value: e.target.value,
                  valid:
                    props.validator &&
                    (e.target.value === ""
                      ? 0
                      : props.pattern.test(e.target.value)
                      ? 1
                      : 2),
                };
              return item;
            })
          )
        }
      />
      {props.validator &&
        (props.valid === 0 ? null : props.valid === 1 ? (
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
        ))}
    </div>
  );

  switch (props.type) {
    case "phone":
      result = (
        <div
          data-valid={props.validator && props.valid}
          className="univerI"
          key={props.name}
        >
          <label htmlFor={props.name}>{props.title}</label>
          <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            id={props.name+index}
            onKeyDown={(e) => {
              let _ = e.target.value.indexOf("_");
              if (isNaN(Number(e.key)) === false) {
                props.setState((prevState) =>
                  prevState.map((item, i) => {
                    let ok = props.value.split("");
                    ok[_] = e.key;
                    if (item.name == props.name)
                      return {
                        ...item,
                        value: ok.join(""),
                      };
                    return item;
                  })
                );
                setTimeout(() => e.target.setSelectionRange(_ + 1, _ + 1), 10);
              } else if (e.key === "Backspace") {
                if (props.value !== "+7 (___) ___ __ __") {
                  props.setState((prevState) =>
                    prevState.map((item, i) => {
                      let ok = props.value.split("");
                      if (_ === -1) {
                        ok[ok.length - 1] = "_";
                      } else {
                        let idx = _ - 1;
                        if (ok[idx] === " ") {
                          idx--;
                        }
                        if (isNaN(Number(ok[idx]))) {
                          idx--;
                        }
                        ok[idx] = "_";
                      }
                      if (item.name == props.name)
                        return {
                          ...item,
                          value: ok.join(""),
                        };
                      return item;
                    })
                  );
                  setTimeout(
                    () => e.target.setSelectionRange(_ - 1, _ - 1),
                    10
                  );
                } else {
                  setTimeout(() => e.target.setSelectionRange(_, _), 10);
                }
              } else {
                setTimeout(() => e.target.setSelectionRange(_, _), 1);
              }
            }}
            onChange={(e) => {
              props.setState((prevState) =>
                prevState.map((item) => {
                  if (item.name == props.name)
                    return {
                      ...item,
                      valid:
                        props.validator &&
                        (e.target.value === ""
                          ? 0
                          : props.pattern.test(e.target.value)
                          ? 1
                          : 2),
                    };
                  return item;
                })
              );
            }}
            onFocus={(e) => {
              let _ = "+7 (___) ___ __ __".indexOf("_");
              props.setState((prevState) =>
                prevState.map((item, i) => {
                  if (item.name == props.name)
                    return {
                      ...item,
                      value:
                        props.value !== "" ? props.value : "+7 (___) ___ __ __",
                    };
                  return item;
                })
              );
              setTimeout(() => e.target.setSelectionRange(_, _), 10);
            }}
            onBlur={(e) => {
              props.setState((prevState) =>
                prevState.map((item, i) => {
                  if (item.name == props.name)
                    return {
                      ...item,
                      value:
                        props.value !== "+7 (___) ___ __ __" ? props.value : "",
                    };
                  return item;
                })
              );
            }}
          />
          {props.validator &&
            (props.valid === 0 ? null : props.valid === 1 ? (
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
            ))}
        </div>
      );
      break;
    case "password":
      result = (
        <div
          data-valid={props.validator && props.valid}
          className="univerI"
          key={props.name}
        >
          <label htmlFor={props.name}>{props.title}</label>
          <input
            type={props.visible ? "text" : "password"}
            placeholder={props.placeholder}
            value={props.value}
            id={props.name+index}
            onChange={(e) => {
              props.setState((prevState) =>
                prevState.map((item, i) => {
                  if (item.name == props.name)
                    return {
                      ...item,
                      value: e.target.value,
                      valid:
                        props.validator &&
                        (e.target.value === ""
                          ? 0
                          : props.pattern.test(e.target.value)
                          ? 1
                          : 2),
                    };
                  return item;
                })
              );
            }}
          />
          {props.validator &&
            (props.valid === 0 ? null : props.valid === 1 ? (
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
            ))}
          <svg
            onClick={() => {
              props.setState((prevState) =>
                prevState.map((item, i) => {
                  if (item.name == props.name)
                    return {
                      ...item,
                      visible: !item.visible,
                    };
                  return item;
                })
              );
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            {props.visible ? (
              <>
                <g clip-path="url(#clip0_179_7982)">
                  <path
                    d="M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94ZM9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19L9.9 4.24002Z"
                    stroke="#838688"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1L23 23"
                    stroke="#838688"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_179_7982">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </>
            ) : (
              <>
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                  stroke="#070C11"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="#070C11"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}
          </svg>
        </div>
      );
      break;
    case "file":
      result = (
        <div
          data-valid={props.validator && props.valid}
          className="univerI"
          key={props.name}
        >
          <label htmlFor={props.name}>{props.title}</label>
          <input
            type={props.type}
            placeholder={props.placeholder}
            id={props.name+index}
            onChange={(e) => {
              props.setState((prevState) =>
                prevState.map((item, i) => {
                  if (item.name == props.name)
                    return {
                      ...item,
                      value: e.target.files[0],
                    };
                  return item;
                })
              );
            }}
          />
        </div>
      );
      break;
    case "select":
      result = (
        <div
          data-valid={props.validator && props.valid}
          className="univerI"
          key={props.name}
        >
          <label htmlFor={props.name}>{props.title}</label>
          <select
            placeholder={props.placeholder}
            id={props.name+index}
            onChange={(e) => {
              props.setState((prevState) =>
                prevState.map((item, i) => {
                  if (item.name == props.name)
                    return {
                      ...item,
                      value: e.target.value,
                      valid:
                        props.validator &&
                        (e.target.value === ""
                          ? 0
                          : props.pattern.test(e.target.value)
                          ? 1
                          : 2),
                    };
                  return item;
                })
              );
            }}
          >
            {props.options.map((item, index) => (
              <option value={item.typ} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    default:
      break;
  }
  index++
  return result;
}

export default Input;
