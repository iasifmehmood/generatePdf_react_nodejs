const express = require('express');
const app = express();
const cors = require('cors');
const _ = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');

const userRoutes = require('./route/pdfRoutes.js');
const googleRoute = require('./route/googleRoutes.js');

/**********************POST API ************************** */
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const corsOptions = {
  exposedHeaders: 'Content-Deposition',
};

app.use(
  session({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));

app.use('/api', userRoutes);
app.use('/', googleRoute);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
