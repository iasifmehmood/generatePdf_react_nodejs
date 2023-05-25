const express = require('express');
const app = express();
const cors = require('cors');
const _ = require('dotenv').config();

const userRoutes = require('./route/pdfRoute.js');

/**********************POST API ************************** */
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const corsOptions = {
  exposedHeaders: 'Content-Deposition',
};

app.use(cors(corsOptions));

app.use('/api', userRoutes);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
