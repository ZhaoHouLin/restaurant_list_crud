const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const port = 3000;

const Restaurant = require("./models/restaurant");

app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(methodOverride("_method"));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true
});
const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

// 設定路由
// 首頁

// 載入路由器
app.use("/", require("./routes/home"));
app.use("/restaurants", require("./routes/restaurant"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
