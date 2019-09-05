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
  return res.render("new");
});
// 顯示一筆 餐廳 的詳細內容
app.get("/restaurants/:id", (req, res) => {
  console.log(req.params);
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("show", { restaurant: restaurant });
  });
});
// 新增一筆  餐廳
app.post("/restaurants", (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    description: req.body.description
  });
  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect("/");
  });
});
// 修改 餐廳 頁面
app.get("/restaurants/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("edit", { restaurant: restaurant });
  });
});
// 修改 餐廳 資料
app.post("/restaurants/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.name = req.body.name;
    restaurant.category = req.body.category;
    restaurant.image = req.body.image;
    restaurant.location = req.body.location;
    restaurant.phone = req.body.phone;
    restaurant.google_map = req.body.google_map;
    restaurant.description = req.body.description;
    restaurant.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/restaurants/${req.params.id}`);
    });
  });
});
// 刪除 餐廳
app.post("/restaurants/:id/delete", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = Restaurant.results.find(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id;
  });
  res.render("show", { restaurant: restaurant });
});

function lowerCaseInc(searchword, keyword) {
  return searchword.toLowerCase().includes(keyword.toLowerCase());
}

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = Restaurant.filter(restaurant => {
    const name = restaurant.name;
    const category = restaurant.category;
    return lowerCaseInc(name, keyword) || lowerCaseInc(category, keyword);
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
