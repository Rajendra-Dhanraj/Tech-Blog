const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
// const { route } = require("./api"); ??

// router.get("/", (req, res) => {
//   res.render("homepage", {
//     id: 1,
//     title: "this is the damn title",
//     post_text: "I am fed up",
//     created_at: new Date(),
//     comments: [{}, {}],
//     user: {
//       username: "test_user",
//     },
//   });
// });

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "post_text", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template

      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("homepage", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  // check to see if user is logged in
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/", (req, res) => {
  res.render("homepage");
});

module.exports = router;
