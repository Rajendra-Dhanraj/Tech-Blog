// -------- CONTSTANTS --------

const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const path = require("path");
const helpers = require("./utils/helpers");

//HANDLEBARS

const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

//SESSION

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "Super secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3001;

// -------- MIDDLEWARE  --------

//SESSION

app.use(session(sess));

// HANDLEBARS
// handlebars set as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware function to allow directory to be accessible to client
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// turn on connection to db and server
// force: true performs similarly to DROP TABLE IF EXISTS, which was used previously this will allow us to recreate table ifs if there are any association changes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
