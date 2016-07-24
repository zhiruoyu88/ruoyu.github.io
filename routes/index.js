var express = require('express'),
    app = express(),
    select = require('../mysql/login');
var format = function(time,format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' :'') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g,function(a){
    switch(a){
    case 'yyyy':
    return tf(t.getFullYear());
    break;
    case 'MM':
    return tf(t.getMonth() + 1);
    break;
    case 'mm':
    return tf(t.getMinutes());
    break;
    case 'dd':
    return tf(t.getDate());
    break;
    case 'HH':
    return tf(t.getHours());
    break;
    case 'ss':
    return tf(t.getSeconds());
    break;
    }
    })
}
select.selectArticle(select.client,function(results){
    app.get('/',function(req,res){
        if(!results){
            results={}
        }else{
            for(var i=0;i<results.length;i++){
                var date = results[i].write_date;
                // year = date.getFullYear().toString(),
                // month = date.getMonth()+1,
                // day = date.getDate();
                // month = month<10?'0'+month:month;
                results[i].write_date = format(date,'yyyy-MM-dd');
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