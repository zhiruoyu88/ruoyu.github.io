var express = require('express'),
    app = express();
var a = function(req,res){
        res.type('text/html');
        res.render('login');
        console.log(99)
};

module.exports = a;