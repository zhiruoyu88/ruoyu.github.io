var express = require('express'),
    app = express(),
    select = require('../mysql/login');

    app.get('/',function(req,res){
        handlebars.registerHelper('compare', function(left, operator, right, options) {
         if (arguments.length < 3) {
           throw new Error('Handlerbars Helper "compare" needs 2 parameters');
         }
         var operators = {
           '==':     function(l, r) {return l == r; },
           '===':    function(l, r) {return l === r; },
           '!=':     function(l, r) {return l != r; },
           '!==':    function(l, r) {return l !== r; },
           '<':      function(l, r) {return l < r; },
           '>':      function(l, r) {return l > r; },
           '<=':     function(l, r) {return l <= r; },
           '>=':     function(l, r) {return l >= r; },
           'typeof': function(l, r) {return typeof l == r; }
         };

         if (!operators[operator]) {
           throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
         }

         var result = operators[operator](left, right);

         if (result) {
           return options.fn(this);
         } else {
           return options.inverse(this);
         }
     });
        select.selectArticle(select.client,'',function(results){
            if(!results){
                results={}
            }else{
                results.reverse();
                for(var i=0;i<results.length;i++){
                    if(results[i].blog_tag==0){
                        results[i].blog_tag='生活';
                        results[i].blog_tag_url='life';
                    }else if(results[i].blog_tag==1){
                        results[i].blog_tag='技术';
                        results[i].blog_tag_url='tech';
                    }
                }
                
            }
            res.type('text/html');
            res.render('home',{article:results});
        })
    });


module.exports = app;