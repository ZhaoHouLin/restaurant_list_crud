const restaurants = require("/restaurant.json");

const mongoose = require("mongoose");
const RestaurantList = require("../restaurant");

mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("db connected!");

  for (var i = 0; i < 10; i++) {
    RestaurantList.create(restaurants.results[i]);
  }

  console.log("done");
});
