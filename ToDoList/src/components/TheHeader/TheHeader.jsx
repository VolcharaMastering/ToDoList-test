import { Link } from "react-router-dom";
import "./TheHeader.scss";

function TheHeader() {
  return (
    <header className="header">
      <h1 className="header__title">Мои задачи</h1>
      <nav className="header__menu">
          <li className="header__bookmark">
            <Link to="/" className="header__bookmark-text">
              Все
            </Link>
          </li>
          <li className="header__bookmark">
            <Link to="/active" className="header__bookmark-text">
              В работе
            </Link>
          </li>
          <li className="header__bookmark">
            <Link to="/added" className="header__bookmark-text">
              Новые
            </Link>
          </li>
          <li className="header__bookmark">
            <Link to="/archive" className="header__bookmark-text">
              Выполнено
            </Link>
          </li>
          <li className="header__bookmark">
            <Link to="/paused" className="header__bookmark-text">
              Приостановлены
            </Link>
          </li>
      </nav>
    </header>
  );
}

export default TheHeader;
