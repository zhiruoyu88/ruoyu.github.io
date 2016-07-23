var express = require('express'),
    app = express(),
    select = require('./mysql/login');
select.selectArticle(select.client,function(results){
    console.log(results);
    console.log(fields);
})
app.get('/',function(req,res){
    res.type('text/html');
    res.render('home');
});
module.exports = app;