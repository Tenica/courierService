const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf')
const flash = require('connect-flash')
const errorController = require("./controllers/error");
const Admin = require('./models/admin')


const MONGODB_URI =
  "mongodb+srv://TenicaTech:CgoiFfWGuqqoaO5N@cluster0.avgh7.mongodb.net/delivery-app";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csurfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "deliverywebsite",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csurfProtection);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  // throw new Error('Sync Dummy');
  if (!req.session.user) {
    return next();
  }
  Admin.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});




app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use("/admin", authRoutes);


app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not found!" });
});

app.get("/500", errorController.get500);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
