
// REQUIREMENTS
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs');
var ejsLayouts = require('express-ejs-layouts');

var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');

var db = require('./models');
var app = express();

var summonerName;
var summonerNameLive;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'abcdefghijklmnopqrstuvwxyz',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// ROUTES
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/results', function(req, res) {
  // READ FROM DATABASE
  db.summoner.findAll({
    where: {
      sumName: summonerName // SET NAME FROM GLOBAL
    },
    order: [['totalPlayer','DESC']]
  }).then(function(sum) {
    res.render('results', { sum: sum });
  });
});

app.get('/sortname', function(req, res) {
  // READ FROM DATABASE
  db.summoner.findAll({
    where: {
      sumName: summonerName // SET NAME FROM GLOBAL
    },
    order: [['champName','ASC']]
  }).then(function(sum) {
    res.render('results', { sum: sum });
  });
});

// POST FROM SUMMONER-AJAX
app.post('/results', function(req, res){

  // SET GLOBAL SUMMONER NAME
  summonerName = req.body.sumName;

  // WRITE TO DATABASE
  db.summoner.findOrCreate({  
    where: {
      champName: req.body.champName,
      winRate: req.body.winRate
    }, 
    defaults: {
      champName: req.body.champName,
      sumName: req.body.sumName,
      sumId: req.body.sumId,
      champName: req.body.champName,
      totalPlayer: req.body.totalPlayer,
      won: req.body.won,
      winRate: req.body.winRate
    }
    }).spread(function(proj, wasCreated){
      res.redirect("/results");
  }); 
});// END /RESULTS POST

// route to sign up for account
app.get('/signup', function(req, res) {
  res.render('signup');
});

app.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { name: req.body.name },
    defaults: {
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      req.flash('error', 'Username already exists');
      res.redirect('/signup');
    }
  }).catch(function(error) {
    req.flash('error', error.message);
    res.redirect('/signup');
  });
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

app.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/live', function(req, res) {
  
  // READ FROM DATABASE
  db.live.findAll({
      order: [['createdAt','DESC']],
      limit: 10    
  }).then(function(sum) {
    res.render('live', { sum: sum });
  });

});

app.post('/live', function(req, res) {
  console.log(req.body.arr[0].summonerName);

  for(var i = 0; i < req.body.arr.length; i++){
    db.live.findOrCreate({
    where: { summonerName: req.body.arr[i].summonerName},
    defaults: {
      summonerName: req.body.arr[i].summonerName,
      summonerId: req.body.arr[i].summonerId,
      championId: req.body.arr[i].championId,
      teamId: req.body.arr[i].teamId,
      championName: req.body.arr[i].championName
    }
    }).spread(function(user, created) {
      res.redirect('live');
    }).catch(function(error) {
      //console.log(error);
    });
  }
}); // end of post /live

var server = app.listen(process.env.PORT || 3000);
module.exports = server;









