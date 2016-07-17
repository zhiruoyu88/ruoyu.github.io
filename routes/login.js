var express = require('express'),
    app = express();
app.get('/login',function(req,res){
    res.send(888);
});
moodule.exports = app;