$(document).ready(function(){
  // GLOBALS
  var summonerName;
  var API_KEY = "a208ee65-10b4-4356-b4fd-e7a06292f3b1";

  ///////////////////////////////////////////////// Live Button ///////////////////////////////////////////////// 

  $('#btnLive').on('click',function(){
    summonerName = $('#addEntry').val();
    liveLookup();
    });

    function liveLookup(){
      if (summonerName) {
      $.ajax({
        method: 'post',
        url: '/live',
        data: {
          name: summonerName
        },   
      }).done(function(data){
        window.location = "/live";
      });
    }
  }

  ///////////////////////////////////////////////// Search Button  ///////////////////////////////////////////////// 

  $('#btn').on('click',function(){
    $.ajax({
      url: "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?dataById=true&api_key=" + API_KEY,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        localStorage.setItem('championList', JSON.stringify(data));
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert("error getting Summoner data 2!");
      }
    });

    summonerName = $('#addEntry').val(); // input value
    
    // GET SUMMONER ID
    summonerLookUp2();
  });

  function summonerLookUp2(){
    if(summonerName){
      $.ajax({
        method: 'post',
        url: '/results',
        data: {
          name: summonerName
        },
      }).done(function(data){
        window.location = '/results';
      });
    }
  }
}); // END OF DOCUMENT






