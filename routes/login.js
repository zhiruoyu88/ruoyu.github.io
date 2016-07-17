var express = require('express'),
    app = express();
app.get('/login',function(req,res){
    // res.writeHead(200,{'content-Type':'text/html'});
    res.render('login');
});
module.exports = app;