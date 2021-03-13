const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser')
const keys = require('./config/keys')

const authRouter = require('./routes/auth');
const analyticsRouter = require('./routes/auth');
const categoryRouter = require('./routes/auth');
const orderRouter = require('./routes/auth');
const positionRouter = require('./routes/auth');

const app = express();

mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
    .then(() => console.log('Mongo connected'))
    .catch(err => console.log(err))

app.use(passport.initialize())
require('middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/order', orderRouter);
app.use('/api/position', positionRouter);

module.exports = app;