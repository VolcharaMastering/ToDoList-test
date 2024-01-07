const mongoose = require("mongoose");
const validUrl = require("validator");

const toDoListSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [2, "Длина имени не меньше 2х символов"],
    maxlength: [100, "Длина имени не более 100 символов"],
    required: [true, 'Поле "Название" должно быть заполнено'],
  },
  description: {
    type: String,
    maxlength: [1000, "Длина описания не более 1000 символов"],
  },
  addDate: {
    type: Date,
    default: Date.now,
    get: function () {
      return moment(this.getDataValue("addDate")).format("DD-MM-YYYY HH:mm:ss");
    },
    immutable: true,
  },
  lastChangeDate: {
    type: Date,
    default: Date.now,
    get: function () {
      return moment(this.getDataValue("addDate")).format("DD-MM-YYYY HH:mm:ss");
    },
  },
  state: {
    type: String,
    enum: ["done", "in_process", "paused", "not_started", "stopped"],
    default: "not_started",
    required: [true, 'Поле "Состояние задачи" не пустое'],
  },
  taskLink: {
    type: String,
    required: false,
    validate: {
      validator(val) {
        return validUrl.isURL(val);
      },
      message: "Проверьте формат ссылки",
    },
  },
});

module.exports = mongoose.model("toDoList", toDoListSchema.methods.toJSON);
