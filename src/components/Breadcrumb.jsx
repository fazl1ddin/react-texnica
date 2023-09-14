import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "../css/Breadcrumb.css"

const values = {};

function Breadcrumb() {
  const { pathname } = useLocation();
  const phs = pathname.split("/").filter(item => Boolean(item));

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="breadcrumb">
      <div className="window">
        <Link
          to="/"
        >
          Главная
        </Link>
        {phs.map((path, index) => {
          if (Boolean(values[path])) {
            return (
              <Link
                key={index}
                to={phs
                  .slice(0, index)
                  .reduce((prev, next) => prev + next + "/", "")}
              >
                {values[path]}
              </Link>
            );
          }
          return (
            <Link
              key={index}
              to={phs
                .slice(0, index + 1)
                .reduce((prev, next) => prev + next + "/", "")}
            >
              {path}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Breadcrumb;
