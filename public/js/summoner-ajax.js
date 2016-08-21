$(document).ready(function(){

  // GLOBALS
  var summonerName;

  $('#btn').on('click',function(){
    $.ajax({
      url: "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?dataById=true&api_key=a208ee65-10b4-4356-b4fd-e7a06292f3b1",
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        //console.log(data);
        localStorage.setItem('championList', JSON.stringify(data));
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          //alert("error getting Summoner data 2!");
      }
    });

    summonerName = $('#addEntry').val(); // input value

    // GET SUMMONER ID
    summonerLookUp();
  });

  function summonerLookUp() {

    var API_KEY = "a208ee65-10b4-4356-b4fd-e7a06292f3b1";

    if (summonerName !== "") {
      $.ajax({
        url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summonerName + '?api_key=' + API_KEY,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
          var sumNameNoSpace = summonerName.replace(/\s/g, '');
          sumNameNoSpace = sumNameNoSpace.toLowerCase().trim();

          var summonerLevel = json[sumNameNoSpace].summonerLevel;
          var summonerID = json[sumNameNoSpace].id;

          // GET RANKED
          getRanked(summonerID, API_KEY);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data!");
        }
      });
    } 
  } 
  
  function  getRanked(summonerID, api) {
    $.ajax({
      url: "https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/"+ summonerID + "/ranked?season=SEASON2016&api_key=" + api,
      type: 'GET',
      dataType: 'json',
      success: function (data) {

        for(var i = 0; i < data.champions.length; i++){
          if(getChampionName(data["champions"][i].id)){

            // CREATE OBJ WITH DESIRED DATA
            var obj = {
              sumName: summonerName,
              sumId: summonerID,
              champName: getChampionName(data["champions"][i].id),
              totalPlayer: data["champions"][i]["stats"]["totalSessionsPlayed"],
              won: data["champions"][i]["stats"]["totalSessionsWon"],
              winRate: ((data["champions"][i]["stats"]["totalSessionsWon"]/data["champions"][i]["stats"]["totalSessionsPlayed"])*100).toFixed()
            }

            // DATA SENT TO INDEX.JS
             $.ajax({
                method: 'post',
                url: '/results',
                data: obj
              }).done(function(data){
                console.log('ajax getRanked success');
                window.location = "/results";
              });
          }
        }  
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          //alert("error getting Summoner data 2!");
      }
    });
  }

  function getChampionName(id){
    // Retrieve the object from storage
    retrievedObject = localStorage.getItem('championList');

    obj =  JSON.parse(retrievedObject)["data"];

    for(var key in obj){
      if(obj[key]["id"] === id){
        //console.log(obj[key]);
        return obj[key]["name"];
      }
    }
  }

  function getChampionTitle(id){
    // Retrieve the object from storage
    retrievedObject = localStorage.getItem('championList');

    obj =  JSON.parse(retrievedObject)["data"];

    for(var key in obj){
      if(obj[key]["id"] === id){
        //console.log(obj[key]);
        return obj[key]["name"];
      }
    }
  }

}); // END OF DOCUMENT






