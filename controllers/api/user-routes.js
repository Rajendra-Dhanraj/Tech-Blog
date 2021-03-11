const router = require("express").Router();
const { User } = require("../../models");

// GET all users: /api/users

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] }, // Hides password data
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST to create new user: /api/users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
});

module.exports = router;
