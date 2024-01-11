/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./PopupForm.scss";
import { closePopup } from "../../store/slices/togglePopupSlice";
import { axiosAddTask, axiosToDoList } from "../../store/slices/toDoListSlice";

function PopupForm({ title, data }) {
  const [formData, setFormData] = useState(data);

  const dispatch = useDispatch();
  /////close functioality///////
  const handleClosePopup = () => {
    dispatch(closePopup());
  };

  useEffect(() => {
    function onKeyDown(evt) {
      if (evt.key === "Escape") {
        handleClosePopup();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);
  ///////

  const insertData = (value, field) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    try {
      dispatch(axiosAddTask(formData));
      dispatch(axiosToDoList());
      handleClosePopup();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div className="popup__shadow">
      <section className="popup">
        <h2 className="popup__header">{title}</h2>
        <form className="popup__form" onSubmit={handleSubmit}>
          <label className="popup__form-input-label">
            Название задачи*
            <input
              type="input"
              name="Title"
              id="Title"
              value={formData.title}
              onChange={(e) => insertData(e.target.value, "title")}
              className="popup__form-input"
              placeholder="Введите название задачи"
            />
          </label>
          <label className="popup__form-input-label">
            Описание*
            <textarea
              name="Description"
              id="Description"
              value={formData.description}
              onChange={(e) => insertData(e.target.value, "description")}
              className="popup__form-description"
              placeholder="Введите описание задачи"
            />
          </label>
          <label className="popup__form-input-label">
            Ссылка
            <input
              type="input"
              name="Title"
              id="Title"
              value={formData.taskLink}
              onChange={(e) => insertData(e.target.value, "taskLink")}
              className="popup__form-input"
              placeholder="Введите ссылку необходимую для реализаци задачи"
            />
          </label>
          <p className="popup__markdown">* - поля обязательные к заполнению</p>
          <div className="popup__button-box">
            <button
              type="button"
              className="popup__button"
              aria-label="Close popup"
              onClick={handleClosePopup}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="popup__button"
              onSubmit={handleSubmit}
              aria-label="Save task"
            >
              Сохранить
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default PopupForm;
