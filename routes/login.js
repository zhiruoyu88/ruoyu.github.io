var express = require('express'),
    app = express();
var a = function(req,res){
        res.type('text/html');
        res.render('login');
}

module.exports = a;