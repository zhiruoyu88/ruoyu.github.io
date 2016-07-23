var express = require('express'),
    app = express(),
    select = require('../mysql/login');
select.selectArticle(select.client,function(results){
    app.get('/',function(req,res){
        console.log(results);
        res.type('text/html');
        res.render('home');
    });
})

module.exports = app;