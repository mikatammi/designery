
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var everyauth = require('everyauth');

everyauth.debug = true;

everyauth
  .password
    .loginWith('email')
    .getLoginPath('/login')
    .postLoginPath('/login')
    .loginView('login.jade')
    .loginLocals( function (req, res, done) {
      setTimeout( function () {
        done(null, { title: 'Async login' });
      }, 200);
    })
    .authenticate( function (login, password) {
      var errors = [];
      if (!login) errors.push('Missing login');
      if (!password) errors.push('Missing password');
      if (errors.length > 0) return errors;

      // TODO: Implement user password authentication logic

      //var user = usersByLogin[login];
      //if (!user) return ['Login failed'];
      //if (user.password !== password) return ['Login failed'];

      //return user;
      return ['Not implemented'];
    })
    .getRegisterPath('/register')
    .postRegisterPath('/register')
    .registerView('register.jade')
    .registerLocals( function (req, res, done) {
      setTimeout( function () {
        done(null, {title: 'Async register'});
      }, 200);
    })
    .validateRegistration( function (newUserAttrs, errors) {
      var login = newUserAttrs.login;

      // TODO: Implement registration validation
      // TODO: If user already exists -> errors.push('Login already taken')

     return errors;
    })
    .registerUser( function (newUserAttrs) {
      var login = newUserAttrs[this.loginKey()];

      // TODO: Implement registration
      //return user object
    })
    .loginSuccessRedirect('/')
    .registerSuccessRedirect('/');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(express.cookieParser());
  app.use(express.session( { secret: 'top secrecy' } ));
  app.use(everyauth.middleware());
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.get('/', routes.index);
//app.get('/', express.static());
app.get('/users', user.list);
app.get('/aeeness', user.list);

//everyauth.helpExpress(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

module.exports = app;
