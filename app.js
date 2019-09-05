// const restaurantList = require("./restaurant.json");
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const Restaurant = require("./models/restaurant");

app.use(bodyParser.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
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
// 列出全部 餐廳
app.get("/restaurants", (req, res) => {
  return res.redirect("/");
});
// 新增一筆 餐廳 頁面
app.get("/restaurants/new", (req, res) => {
  res.send("新增 Todo 頁面");
});
// 顯示一筆 餐廳 的詳細內容
app.get("/restaurants/:id", (req, res) => {
  res.send("顯示 Todo 的詳細內容");
});
// 新增一筆  餐廳
app.post("/restaurants", (req, res) => {
  res.send("建立 Todo");
});
// 修改 餐廳 頁面
app.get("/restaurants/:id/edit", (req, res) => {
  res.send("修改 Todo 頁面");
});
// 修改 餐廳
app.post("/restaurants/:id/edit", (req, res) => {
  res.send("修改 Todo");
});
// 刪除 餐廳
app.post("/restaurants/:id/delete", (req, res) => {
  res.send("刪除 Todo");
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id;
  });
  res.render("show", { restaurant: restaurant });
});

function lowerCaseInc(searchword, keyword) {
  return searchword.toLowerCase().includes(keyword.toLowerCase());
}

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter(restaurant => {
    const name = restaurant.name;
    const category = restaurant.category;
    return lowerCaseInc(name, keyword) || lowerCaseInc(category, keyword);
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
