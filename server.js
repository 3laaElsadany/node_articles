const express = require("express");
const app = express();
const router = require("./routes/article");
const mongoose = require("mongoose");
const Article = require("./models/Article");
const methodOverride = require('method-override');

mongoose.connect("mongodb://localhost:27017/blog")
  .then(() => console.log("Connected To DB"))
  .catch(err => console.log(err.message))

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.set("view engine", "ejs");
app.use(methodOverride('_method'))


app.get("/", async (req, res) => {
  const articles = await Article.find();
  res.render("articles/index", {
    articles
  });
})

app.use("/articles", router)

app.listen(3000)