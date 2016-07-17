var express = require('express'),
request = require('request-json'),
    app = express();
var a = function(req,res){

    var client = request.newClient('http://127.0.0.1:8080/');

    var data = {data:{channel : "aaa",appkey : "bbb"},sign : "4444",token : "555"};
    client.post('login', data, function(err, res, body) {
      console.log(res.statusCode,body);
    });
            res.type('text/html');
            res.render('login');
            console.log(99)
    };

module.exports = a;