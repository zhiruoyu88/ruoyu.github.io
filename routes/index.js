var express = require('express'),
    app = express();
app.get('/',function(req,res){
    res.type('text/html');
    res.render('home');
});
module.exports = app;