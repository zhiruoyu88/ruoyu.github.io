var express = require('express'),
    app = express(),
    select = require('../mysql/login');
select.selectArticle(select.client,function(results){
    app.get('/',function(req,res){
        if(!results){
            results={}
        }else{
            for(var i=0;i<results.length;i++){
                var date = results[i].write_date,
                year = date.getFullYear().toString(),
                month = date.getMonth()+1,
                day = date.getDate();
                month = month<10?'0'+month:month;
                results[i].write_date =  year+'-'+month+'-'+day;
                if(results[i].blog_tag==0){
                    results[i].blog_tag='生活';
                }else if(results[i].blog_tag==1){
                    results[i].blog_tag='技术';
                }
            }
            
        }
        res.type('text/html');
        res.render('home',{article:results});
    });
})

module.exports = app;