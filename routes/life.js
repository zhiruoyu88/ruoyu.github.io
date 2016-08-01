var select = require('../mysql/login');
var life = function(req,res){
    console.log(req.path);
    if(req.path=='生活'){
        req.path=0;
    }else{req.path=1}
    select.selectArticle(select.client,req.path,function(result){
        for(var i=0;i<results.length;i++){
                    if(results[i].blog_tag==0){
                        results[i].blog_tag='生活';
                    }else if(results[i].blog_tag==1){
                        results[i].blog_tag='技术';
                    }
                }
                res.type('text/html');
            res.render('home',{article:results});
    })
}
module.exports = life;