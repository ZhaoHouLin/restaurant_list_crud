const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

function lowerCaseInc(searchword, keyword) {
  return searchword.toLowerCase().includes(keyword.toLowerCase());
}

router.get("/", (req, res) => {
  const sort = {};
  sort[req.query.sortTarget] = req.query.sortType;
  Restaurant.find({})
    .sort(sort)
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurants });
    });
});

router.get("/search", (req, res) => {
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

module.exports = router;
