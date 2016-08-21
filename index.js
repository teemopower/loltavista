
// REQUIREMENTS
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var ejsLayouts = require('express-ejs-layouts');
//var sumService = require('./models/sumService');
var db = require('./models');

var app = express();

var summonerName;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

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
  //sumService.writeSummoner(req);

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
});// END OF /RESULTS POST



var server = app.listen(process.env.PORT || 3000);
module.exports = server;
