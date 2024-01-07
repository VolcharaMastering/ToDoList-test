const mongoose = require("mongoose");
const moment = require("moment");

const toDoListSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [2, "Длина имени не меньше 2х символов"],
    maxlength: [40, "Длина имени не более 40 символов"],
    required: [true, 'Поле "Название" должно быть заполнено'],
  },
  description: {
    type: String,
    maxlength: [1000, "Длина описания не более 1000 символов"],
  },
  addDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  lastChangeDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  state: {
    type: String,
    default: "not_started",
    enum: ["done", "in_process", "paused", "not_started", "stopped"],
    required: false,
  },
  taskLink: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("toDoList", toDoListSchema);
