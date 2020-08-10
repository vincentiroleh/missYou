const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

const Router = require('./src/routes/index');
const User = require('./src/models/userModel');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// connect db
mongoose.connect(
  process.env.DATABASE_REMOTE,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log('db connected successfully'),
);

// setup session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);

// setup passport
app.use(passport.initialize());
passport.use(
  new LocalStrategy({ usernameField: 'email' }, User.authenticate()),
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// import middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(Router);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'API checked ✅',
  });
});

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
