$(function(){
  console.log("sip sup");


$.ajax({
  url:"/stuff",
  method: "GET"
}).then(function(response){
  var words = response;
  var arr = response.replace(/C |J /g,'\n').split("\n");
  var circuit = [];
  var jugglers = [];
  for(var i = 0; i < arr.length; i++){
    if(arr[i] === "") arr.splice(i,1);
  }
  for(var k = 0; k < arr.length; k++){
    if(k <= 2 ) {
      circuit.push(arr[k]);
    } else {
      jugglers.push(arr[k]);
    }
  }
  var circuits= [];
  for(var b = 0; b < circuit.length; b++){
      var c = circuit[b].split(' ');
      circuits.push({
          H:parseInt(c[1].replace("H:",'')),
          E:parseInt(c[2].replace("E:",'')),
          P:parseInt(c[3].replace("P:",'')),
          assigned: []
      });
  }
var jug = [];
for(var g = 1; g < jugglers.length; g++){
    var q = jugglers[g].split(' ');
    jug.push({
        H:parseInt(q[1].replace("H:",'')),
        E:parseInt(q[2].replace("E:",'')),
        P:parseInt(q[3].replace("P:",'')),
        cPref:q[4].replace(/C/g,'').split(','),
        scores: []
    });
}

for (var f = 0; f < jug.length; f++){
  for(var e = 0; e < jug[f].cPref.length; e++){
    var score = (jug[f].H * circuits[parseInt(jug[f].cPref[e])].H)+(jug[f].E * circuits[parseInt(jug[f].cPref[e])].E)+(jug[f].P * circuits[parseInt(jug[f].cPref[e])].P);
    // console.log(score);
    jug[f].scores.push(score);
  }
}
// has to be created automatically

var topScores = [
  [],
  [],
  []
];

for (var a = 0; a < jug.length; a++){
  for (var d = 0; d < jug[a].cPref.length; d++){
    if(parseInt(jug[a].cPref[d]) === 0){
        topScores[0].push({
          score: jug[a].scores[d],
          jugg: a
        });
    } else if (parseInt(jug[a].cPref[d]) === 1) {
        topScores[1].push({
          score: jug[a].scores[d],
          jugg: a
        });
    } else if (parseInt(jug[a].cPref[d]) === 2) {
        topScores[2].push({
          score: jug[a].scores[d],
          jugg: a
        });
    }
  }
}
// topScores.forEach(function(z){
//   z.sort(function(a, b) {
//     return b.score - a.score;
// });
// });

console.log(jugglers);
console.log(topScores);
});



});
