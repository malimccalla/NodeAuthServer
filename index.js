const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const passport = require('passport');

//DB set up
mongoose.connect('mongodb://localhost:auth/auth');

//App set up
const app = express();
app.use(bodyParser.json({ type: '*/*' }));
app.use(morgan('combined'));
app.use(passport.initialize());
router(app);

// server set up

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log(`Server now listening on port ${port}`);
