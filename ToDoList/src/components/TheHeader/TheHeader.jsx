// import { Link } from "react-router-dom";
import "./TheHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import { openPopup } from "../../store/slices/togglePopupSlice";
import PopupForm from "../PopupForm/PopupForm";

function TheHeader() {
  const isPopupOpen = useSelector((state) => state.popup.addTaskPopupOpen);
  const dispatch = useDispatch();
  const openAddTaskPopup = () => {
    dispatch(openPopup({ popupType: "addTask", isOpen: true }));
  };
  return (
    <>
      {isPopupOpen && (
        <PopupForm
          title="Новая задача"
          data={{ title: "", description: "", state: "", taskLink: "" }}
        />
      )}
      <header className="header">
        <h1 className="header__title">Мои задачи</h1>
        <button
          className="header__button"
          type="button"
          onClick={openAddTaskPopup}
          aria-label="add new task"
        >
          New
        </button>
        <nav className="header__menu">
          <li className="header__bookmark">
            {/* <Link to="/" className="header__bookmark-text">
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
            </Link> */}
                        <div className="header__bookmark-text">
              Все
            </div>
          </li>
          <li className="header__bookmark">
            <div className="header__bookmark-text">
              В работе
            </div>
          </li>
          <li className="header__bookmark">
            <div className="header__bookmark-text">
              Новые
            </div>
          </li>
          <li className="header__bookmark">
            <div className="header__bookmark-text">
              Выполнено
            </div>
          </li>
          <li className="header__bookmark">
            <div className="header__bookmark-text">
              Приостановлены
            </div>
          </li>
        </nav>
      </header>
    </>
  );
}

export default TheHeader;
