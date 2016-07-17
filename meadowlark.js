var express = require('express'),
    app = express();
var handlebars = require('express3-handlebars')
            .create({defaultLayout:'main'});
    app.engine('handlebars',handlebars.engine);
    app.set('view engine','handlebars');
app.set('port',process.env.PORT || 8080);
app.use(express.static(__dirname+'/public'));
app.use('/',require('./routes/index'));
app.use('/about',require('./routes/about'));
app.get('/login',require('./routes/login'));



// download
// app.get('/download',function(req,res){
//     res.download('WEB前端智若雨个人工作计划.docx','suibian.docx',function(err){
//         if(err){
//             console.log('下载失败');
//         }else {
//             console.log('下载成功');
//         }
//     })
// })
// app.get('/1',function(req,res){
//     res.redirect('/about');
// })



// 404页面
app.use(function(req,res){
    res.status(404);
    res.render('404');
});
// 500页面
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:'+app.get('port')+'; Press Ctrl-C to terminate.')
});
