$(function(){
  console.log("sip sup");

// gets the JSON data
$.ajax({
    url: "/stuff",
    method: "GET"
}).then(function(response){
  // stores the string as an array of strings separated
  // sets empty arrays circuits, jugglers, and topScores
  // console.log(response.split('\n'))
  var   arr = response.split('\n'),
        circuits = [],
        jugglers = [],
        topScores = [];

// Separates the Jugglers from the Circuits and stores them in separate arrays
  arr.forEach(function(i){
    if(i.split(' ')[0]==='C'){
      circuits.push(i);
      topScores.push([]);
    } else if (i.split(' ')[0] === 'J') {
        jugglers.push(i);
    }
  });



  // takes the array of strings and transforms it into useable objects
  for(var b = 0; b < circuits.length; b++){
      var c = circuits[b].split(' ');
      circuits[b] = {
          H:parseInt(c[2].replace("H:",'')),
          E:parseInt(c[3].replace("E:",'')),
          P:parseInt(c[4].replace("P:",'')),
          assigned: []
      };
  }

// takes the array of jugglers and transforms the data into useable objects
  for(var g = 0; g < jugglers.length; g++){
      var q = jugglers[g].split(' ');
      jugglers[g] = {
          id:g,
          H:parseInt(q[2].replace("H:",'')),
          E:parseInt(q[3].replace("E:",'')),
          P:parseInt(q[4].replace("P:",'')),
          cPref:q[5].replace(/C/g,'').split(','),
          pref:q[5].replace(/C/g,'').split(','),
          scores: []
      };
      // circuits.forEach(function(o){
      //   var dotPro = (jugglers[g].H * o.H)+(jugglers[g].E * o.E)+(jugglers[g].P * o.P);
      //   jugglers[g].scores.push(dotPro);
      //   // topScores[circuits.indexOf(o)].push({
      //   //   score: dotPro,
      //   //   jugg: g
      //   // });
      // });
    }
$.ajax({
  url: "/jugglers",
  method: 'POST',
  data: jugglers
}).then(function(){});



});






});//===End of jQuery
