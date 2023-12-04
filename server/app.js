const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const axios = require('axios');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

// Allowing repsonse from localhost:3000 and Vercel deployment
const whitelist = [
  'http://localhost:3000',
  'https://learn-anything-five.vercel.app',
];

// Currently blocking server-to-server requests and REST tools
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use(routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
