var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    fs = require('fs');






app.use(express.static('public'));

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var words = require("./raw.txt");
// console.log(words);


app.get('/', function(req, res){
    res.render('index.ejs');
});

app.get('/stuff', function(req,res){
  res.send(words);
});

app.listen(port, function(){
console.log("sup");
});
