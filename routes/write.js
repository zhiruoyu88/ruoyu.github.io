var express = require('express'),
    app = express();
app.get('/write',function(req,res){
    res.type('text/plain');
    res.send('22222');
});
module.exports = app;