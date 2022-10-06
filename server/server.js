const express = require('express');
const path = require('path');

// environment variables for dev env
require('dotenv').config();

const db = require('./config/connection');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

db.once('open', () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
