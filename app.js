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
app.get("/", (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.log(err);
    return res.render("index", { restaurants: restaurants });
  });
});

// 載入路由器
app.use("/restaurants", require("./routes/restaurant"));

function lowerCaseInc(searchword, keyword) {
  return searchword.toLowerCase().includes(keyword.toLowerCase());
}

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err);

    const results = restaurants.filter(restaurant => {
      const name = restaurant.name;
      const category = restaurant.category;
      return lowerCaseInc(name, keyword) || lowerCaseInc(category, keyword);
    });

    return res.render("index", { restaurants: results, keyword: keyword });
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
