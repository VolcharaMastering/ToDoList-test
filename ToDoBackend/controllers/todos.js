const NotFound = require("../errors/notFound");
const IncorrectData = require("../errors/requestError");
const ServerError = require("../errors/serverError");
const ToDoList = require("../models/ToDoList");

const { OK_CODE, CODE_CREATED } = require("../states/states");

const getToDoes = async (req, res, next) => {
  try {
    const tasks = await ToDoList.find({}).sort([["createdAt", -1]]);
    res.status(OK_CODE).send(tasks);
  } catch (e) {
    next(new ServerError("Произошла ошибка на сервере"));
  }
};

const delTaskById = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const task = await ToDoList.findByIdAndDelete(taskId);
    if (!task) {
      next(new NotFound("Задача не найдена"));
      return;
    }
  } catch (e) {
    if (e.name === "CastError") {
      next(new IncorrectData("Невалидный id "));
      return;
    }
    next(new ServerError("Произошла ошибка на сервере"));
  }
};

const createTask = async (req, res, next) => {
  const { title, description, lastChangeDate, state, taskLink } = req.body;
  try {
    const task = await new ToDoList({
      title,
      description,
      lastChangeDate,
      state,
      taskLink,
    }).save();
    res.status(CODE_CREATED).send(task);
  } catch (e) {
    if (e.errors.title) {
      if (e.errors.title.name === "ValidatorError") {
        next(new IncorrectData("Запрос не прошёл валидацию"));
        return;
      }
    }
    if (e.errors.link) {
      if (e.errors.link.name === "ValidatorError") {
        next(new IncorrectData("Запрос не прошёл валидацию"));
        return;
      }
    }
    next(new ServerError("Произошла ошибка на сервере"));
  }
};
const updateTaskById = async (req, res, next) => {
  const { taskId, title, description, lastChangeDate, state, taskLink } =
    req.body;
  try {
    const task = await ToDoList.findByIdAndUpdate(taskId, {
      title,
      description,
      lastChangeDate,
      state,
      taskLink,
    });
    if (!task) {
      next(new NotFound("Задача не найдена"));
      return;
    }
  } catch (e) {
    if (e.name === "CastError") {
      next(new IncorrectData("Невалидный id "));
      return;
    }
    if (e.errors.title) {
      if (e.errors.title.name === "ValidatorError") {
        next(new IncorrectData("Запрос не прошёл валидацию"));
        return;
      }
    }
    if (e.errors.link) {
      if (e.errors.link.name === "ValidatorError") {
        next(new IncorrectData("Запрос не прошёл валидацию"));
        return;
      }
    }
    next(new ServerError("Произошла ошибка на сервере"));
  }
};

module.exports = {
  getToDoes,
  delTaskById,
  updateTaskById,
  createTask,
};
