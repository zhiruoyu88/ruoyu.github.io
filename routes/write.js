var express = require('express'),
    app = express();
app.get('/write',function(req,res){
    res.type('text/html');
    res.render('22222');
});
module.exports = app;