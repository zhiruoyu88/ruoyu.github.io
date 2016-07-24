var express = require('express'),
    app = express(),
    select = require('../mysql/login');
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
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
                results[i].write_date = date.Format("yyyy-MM-dd");
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