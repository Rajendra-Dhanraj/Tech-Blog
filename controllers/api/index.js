// HUB FOR USER / POST / COMMENT ROUTES

const router = require("express").Router();

const userRoutes = require("./user-routes");
// const postRoutes
// const commentRoutes


router.use("/users", userRoutes);
//posts
//comments


module.exports = router;
