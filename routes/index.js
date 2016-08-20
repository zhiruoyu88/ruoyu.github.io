var express = require('express'),
    app = express(),
    select = require('../mysql/login');

    app.get('/',function(req,res){
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
                    console.log(results[i].blog_tag_url)
                }
                
            }
            res.type('text/html');
            res.render('home',{article:results});
        })
    });


module.exports = app;