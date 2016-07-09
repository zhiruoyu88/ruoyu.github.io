var express = require('express'),
    app = express();
var handlebars = require('express3-handlebars')
            .create({defaultLayout:'main'});
    app.engine('handlebars',handlebars.engine);
    app.set('view engine','handlebars');
app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){
    res.type('text/html');
    res.render('home');
});
app.get('/about',function(req,res){
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about',{fortune:randomFortune});
})
app.get('/1',function(req,res){
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about',{fortune:randomFortune});
})
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
var fortunes = [
    '你不克服你的恐惧，恐惧将战胜你',
    'Rivers need springs',
    '不要害怕你所不知道的' ,
    '你将会有一个很大的惊喜',
    '无论发生什么，keep it simple'
];