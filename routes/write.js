var express = require('express'),
    app = express();
app.get('/write',function(req,res){
    res.type('text/html');
    res.send('333');
});
module.exports = app;