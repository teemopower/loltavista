var fs = require('fs');

var champArray = [];

function writeSummoner(sumData) {
  console.log(sumData.body);

  //fs.appendFileSync('./models/data.json', JSON.stringify(sumData.body));
}

function test(x){

  console.log("from test");
}

module.exports = {
  writeSummoner: writeSummoner, 
  test: test
}