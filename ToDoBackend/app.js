require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require('celebrate');
const cors = require("cors");
const rateLimit = require("./utils/rateLimit");
const errorHandler = require("./middlewares/errorHandler");
const NotFound = require("./errors/notFound");

const { PORT = 3040, NODE_ENV, MONGO_URL } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimit);

app.use(require("./routes/index"));

app.use("*", (req, res, next) => {
  next(new NotFound("Страница не найдена"));
});

// app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

async function connect() {
  await mongoose.connect(
    NODE_ENV === "production"
      ? MONGO_URL
      : "mongodb://localhost:27017/tasksdb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    }
  );

  app.listen(PORT);
}

connect();
