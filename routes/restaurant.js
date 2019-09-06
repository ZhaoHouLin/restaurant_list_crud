const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

// 列出全部 餐廳
router.get("/", (req, res) => {
  return res.redirect("/");
});
// 新增一筆 餐廳 頁面
router.get("/new", (req, res) => {
  return res.render("new");
});
// 顯示一筆 餐廳 的詳細內容
router.get("/:id", (req, res) => {
  console.log(req.params);
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("show", { restaurant: restaurant });
  });
});
// 新增一筆  餐廳
router.post("/", (req, res) => {
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
router.get("/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("edit", { restaurant: restaurant });
  });
});
// 修改 餐廳 資料
router.put("/:id", (req, res) => {
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
router.delete("/:id/delete", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.remove(err => {
      if (err) return console.error(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
