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

        var isInArray = function(value, array){
          return array.indexOf(value) > -1;
        };

// Separates the Jugglers from the Circuits and stores them in separate arrays
  arr.forEach(function(i){
    if(i.split(' ')[0]==='C'){
      circuits.push(i);
    } else if (i.split(' ')[0] === 'J') {
        jugglers.push(i);
    }
  });
//
// console.log(circuits)
// console.log(jugglers)
  // takes the array of strings and transforms it into useable objects
  var empty = [];
  circuits.reduce(function(all, item, index){
      var c  = item.split(' ');
      topScores[index] = [];
      all.push({
        H:parseInt(c[2].replace("H:",'')),
       E:parseInt(c[3].replace("E:",'')),
       P:parseInt(c[4].replace("P:",'')),
       assigned: []
     });
     return all;
  },empty);
  circuits = empty;

  empty = [];
  // takes the array of jugglers and transforms the data into useable objects
  jugglers.reduce(function(all, item, index){
    var c  = item.split(' ');
    all.push({
      id:index,
      H:parseInt(c[2].replace("H:",'')),
      E:parseInt(c[3].replace("E:",'')),
      P:parseInt(c[4].replace("P:",'')),
      cPref:c[5].replace(/C/g,'').split(','),
      pref:c[5].replace(/C/g,'').split(','),
      scores: []
    });
    return all;
  },empty);
jugglers = empty;
empty = [];

// console.log(jugglers);


  // calculates the dot product for each juggler based on stored according to preference
//   for (var f = 0; f < jugglers.length; f++){
//     for(var e = 0; e < jugglers[f].cPref.length; e++){
//       var score = (jugglers[f].H * circuits[parseInt(jugglers[f].cPref[e])].H)+(jugglers[f].E * circuits[parseInt(jugglers[f].cPref[e])].E)+(jugglers[f].P * circuits[parseInt(jugglers[f].cPref[e])].P);
//       // console.log(score);
//       jugglers[f].scores.push(score);
//       // topScores[parseInt(jugglers[f].cPref[e])].push({
//       //       score: score,
//       //       jugg: f
//       //     });
//     }
//     for(var t = 0; t < circuits.length; t++){
//         if(!isInArray(t.toString(), jugglers[f].cPref)){
//           var scor = (jugglers[f].H * circuits[t].H)+(jugglers[f].E * circuits[t].E)+(jugglers[f].P * circuits[t].P);
//           jugglers[f].scores.push(scor);
// //           // jugglers[f].cPref.push(t.toString());
//           // topScores[t].push({
//           //       score: scor,
//           //       jugg: f
//           //     });
//         }
//       }
//   }
  // console.log(jugglers);
//
//

jugglers.reduce(function(all, item, index){
  var thescore = [];

      circuits.reduce(function(all1, item1, index1){
          var score = (item.H * item1.H)+(item.E * item1.E)+(item.P * item1.P);
          topScores[index1].push({
                        score: score,
                        jugg: index
                      })
        all1.push(score);
        return all1;
      },thescore);

  item.scores = thescore;
  all.push(item);
  return all;
},empty);

jugglers = empty;


//   // for(var n = 0; n < jugglers.length; n++){
//   //   for(var t = 0; t < circuits.length; t++){
//   //     if(!isInArray(t.toString(), jugglers[n].cPref)){
//   //       var scor = (jugglers[n].H * circuits[t].H)+(jugglers[n].E * circuits[t].E)+(jugglers[n].P * circuits[t].P);
//   //       jugglers[n].scores.push(scor);
//   //       topScores[t].push({
//   //             score: scor,
//   //             jugg: n
//   //           });
//   //     }
//   //   }
//   // }
//
//
//
// // sorting the scores in descending order
//   topScores.forEach(function(z){
//     z.sort(function(a, b) {
//       return b.score - a.score;
//   });
// });
// // // // setting a variable to check if all jugglers have been assigned
// var assigned  = 0;
// //
// // // checking against the total amount of jugglers
// while(assigned < jugglers.length){
// // loops through each circuit by topScores
//   for(var i = 0; i < topScores.length; i++){
// //     // if circuit is not filled/fully assigned
//     if(circuits[i].assigned.length < jugglers.length / circuits.length){
//       if(jugglers[topScores[i][0].jugg].cPref > 0){
//       // if the top score for the circuit is also the top preference for the juggler, place the juggler into the circuit
//         if(parseInt(jugglers[topScores[i][0].jugg].cPref[0]) === i){
//           // stores the juggler id to remove their scores from ALL circuits
//           var who = topScores[i][0].jugg;
//
//           // removing all the placed jugglers scores from the topScores
//           // =================================================================
//             topScores.forEach(function(b){
//               for(var z = 0; z < b.length; z++){
//                 if(who === b[z].jugg){
//                   b.splice(z,1);
//                 }
//               }
//             });
//           // =================================================================
//           // assigning the juggler to the circuit
//           circuits[i].assigned.push(jugglers[who]);
//           // noting that the juggler was assigned
//           assigned++;
//
//           // if the circuit is fully assigned
//           // remove the circuit preference from ALL jugglers so their second/third choice becomes their first
//           if(circuits[i].assigned.length === jugglers.length/circuits.length){
//             jugglers.forEach(function(b){
//               for(var r = 0; r < b.cPref.length; r++){
//                 if(parseInt(b.cPref[r])=== i ){
//                   b.cPref.splice(r,1);
//                 }
//               }
//             });
//           }
//         }
//       } else {//====
//           // stores the juggler id to remove their scores from ALL circuits
//           var who = topScores[i][0].jugg;
//
//           // removing all the placed jugglers scores from the topScores
//           // =================================================================
//             topScores.forEach(function(b){
//               for(var z = 0; z < b.length; z++){
//                 if(who === b[z].jugg){
//                   b.splice(z,1);
//                 }
//               }
//             });
//           // =================================================================
//           // assigning the juggler to the circuit
//           circuits[i].assigned.push(jugglers[who]);
//           // noting that the juggler was assigned
//           assigned++;
//
//           // if the circuit is fully assigned
//           // remove the circuit preference from ALL jugglers so their second/third choice becomes their first
//           if(circuits[i].assigned.length === jugglers.length/circuits.length){
//             jugglers.forEach(function(b){
//               for(var r = 0; r < b.cPref.length; r++){
//                 if(parseInt(b.cPref[r])=== i ){
//                   b.cPref.splice(r,1);
//                 }
//               }
//             });
//           }
//
//       }//======
//     }
//   }
// }
// // setting variables to store the final list to be downloaded
// var assignments = [];
// var list = [];
// var c1970 = 0;
// // sets the inner empty arrays to the length of the total amount of circuits
// for(var p = 0; p < circuits.length; p++){
//   assignments.push([]);
//   list.push('\nC'+p+' ->');
// }
//
// // Creates a concated string of the ranked jugglers per circuit
// for(var h = 0; h < circuits.length; h++){
//   // 0,1,2 Circuits
//   var sum  = 0;
//   for(var j = 0; j < circuits[h].assigned.length; j++){
//     // assigned
//     assignments[h].push(' J'+circuits[h].assigned[j].id);
//     sum += circuits[h].assigned[j].id;
//     for(var l = 0; l < circuits[h].assigned[j].pref.length; l++){
//       // pref
//       assignments[h][j] = assignments[h][j].concat(' C'+circuits[h].assigned[j].pref[l]+':'+circuits[h].assigned[j].scores[l]);
//     }
//   }
//   if(h === 1970) c1970 = sum;
// }
// // creates the final list with Circuit assignment at the start of the string
// // Jugglers for that Circuit
// // The sum of all jugglers for that circuit as the last element of the string
// for(var s = 0; s < list.length; s++){
//   list[s] = list[s].concat(assignments[s]);
// }
// if(c1970 > 0) list.unshift(c1970);
// // Download the file
// // On click of the HTML page downloads a link of the Circuit assignments
// // ===========================================================================================================
// function downloadSorted(filename, mimeType) {
//     var elHtml = list;
//     var link = document.createElement('a');
//     mimeType = mimeType || 'text/plain';
//
//     link.setAttribute('download', filename);
//     link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
//     link.click();
// }
//
// var fileName =  'jugglers-circuit-assigment.txt';
//
// $('h1').click(function(){
//     downloadSorted(fileName, 'main','text/html');
// });
// // ===========================================================================================================
//
//
//
// console.log(assignments);
// console.log(jugglers);
// // console.log(response);
// // console.log(list[0].concat(assignments[0]));
// // console.log(list[1].concat(assignments[1]));
// // console.log(list[2].concat(assignments[2]));
// // console.log(list[1]);
// // console.log(list[2]);
// // console.log(list[3]);
// // console.log(list);
//
// // console.log(topScores);
// // console.log(typeof(parseInt(jugglers[topScores[0][0].jugg].cPref[0])));
// // console.log(circuits[0].assigned);
// // console.log(circuits[1].assigned);
// // console.log(circuits[2].assigned);
// // console.log(circuits);
//
//
//
//

});



});
//
