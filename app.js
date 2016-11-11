const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');

require('./db');
require('./app/task/task.index');
const routes = require('./routes/router');

const app = express();

// View Engine Setup ===========================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Register Handlebars Partials/*
const partialsDir = __dirname + '/views/partials';
const filenames = fs.readdirSync(partialsDir);
filenames.map( (filename) => {
  let matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  let name = matches[1];
  let template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
  hbs.registerPartial(name, template);
});
// End View Engine Setup =======================================================

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Helper ===============================================================
routes.map( (route) => {
  app.use(route.route, route.template);
});
// End Routes Helper ===========================================================

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers ==============================================================
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use( (err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
// End Error handlers ==========================================================


module.exports = app;
