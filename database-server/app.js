const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const doctorRouter = require('./router/doctorRouter');
const rateLimit = require("express-rate-limit");
const cors = require("cors");
dotenv.config({ path: "./config.env" });

const helmet = require("helmet");
const constants = require("./assets/constants");
mongoose
  .connect(process.env.DATABASE, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });
const limiter = rateLimit({
  max: 400,
  windowMs: 1000 * 60 * 60,
  message: "try after 1 hour",
});
const app = express();
app.use("/", limiter);
app.use(helmet());
app.use(logger("dev"));
// app.use(bodyParser);
app.use(express.json({ limit: "8000kb" }));
app.use(cookieParser());
// app.use(cors);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", `${constants.viewURL}`);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header({
    "Access-Control-Allow-Credentials": true,
  });
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});
// app.use(cors());
// app.use(express.static(__dirname + "/public/images"));
app.use("/api/v1", doctorRouter);
app.use("/", (req ,res) => {
  res.status(200).send();
});

app.all("*", (req, res, next) => {
  next(new Error("Page not found!!"));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: "denied",
    message: "something went wrong",
  });
});

app.listen(process.env.PORT, () => {
 
});
