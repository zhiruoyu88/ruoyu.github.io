var express = require('express'),
    app = express(),
    select = require('../mysql/login');

    app.get('/',function(req,res){
        console.log(1)
        select.selectArticle(select.client,'',function(results){
            console.log(2)
            if(!results){
                results={}
            }else{
                for(var i=0;i<results.length;i++){
                    if(results[i].blog_tag==0){
                        results[i].blog_tag='生活';
                    }else if(results[i].blog_tag==1){
                        results[i].blog_tag='技术';
                    }
                }
                
            }
            res.type('text/html');
            res.render('home',{article:results});
        })
    });


module.exports = app;