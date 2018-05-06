var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors())

const port = normalizePort(process.env.PORT  || '4000')
app.set('port', port)

const server = http.createServer(app)	

// view engine setup
app.set('views', path.join(__dirname, 'src'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  const err = new Error('Invalid Route')
  err.status = 404
  next(err)
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  const message = err.message
  console.log(err)
  res.status(err.status || 500).json({ message })
})


app.listen(4000,() => {
	console.log('server started');
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const p = parseInt(val, 10)

  if (isNaN(p)) {
    // named pipe
    return val
  }

  if (p >= 0) {
    // port number
    return p
  }

  return false
}


module.exports = app;
