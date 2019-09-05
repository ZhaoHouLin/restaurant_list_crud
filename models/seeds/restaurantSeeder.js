const restaurants = require("../restaurant.json");
const mongoose = require("mongoose");
const Restaurant = require("../restaurant");

mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  console.log("db connected!");

  for (var i = 0; i < restaurants.results.length; i++) {
    Restaurant.create(restaurants.results[i]);
  }

  console.log("done");
});
