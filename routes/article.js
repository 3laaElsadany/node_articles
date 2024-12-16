const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

router.get("/new", (req, res) => {
  res.render("articles/new", {
    article: new Article()
  });
})

router.get("/:id", async (req, res) => {
  try {
    let article = await Article.findById(req.params.id);
    console.log(article);
    res.render("articles/show", {
      article: article
    });
  } catch (err) {
    console.log(err.message)
    res.redirect("/")
  }

})

router.post("/", async (req, res) => {
  let article = new Article(req.body);
  try {
    let art = await article.save();
    res.redirect(`/articles/${art.id}`)
  } catch (err) {
    console.log(err.message);
    res.render('articles/new', {
      article
    })
  }
})

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", {
    article: article
  })
})

router.put("/:id", async (req, res) => {
  const article = await Article.updateOne({
    _id: req.params.id
  }, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown
    }
  });
  res.redirect("/")
})

router.delete("/:id", async (req, res) => {
  const delDat = await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
})

module.exports = router;