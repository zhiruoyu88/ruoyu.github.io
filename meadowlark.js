var express = require('express'),
    app = express();
var bodyParser = require('body-parser');
var login = require('./mysql/login');
var handlebars = require('express3-handlebars')
            .registerHelper('compare', function(left, operator, right, options) {
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
             })
            .create({defaultLayout:'main'});
    app.engine('handlebars',handlebars.engine);
    app.set('view engine','handlebars');
app.set('port',process.env.PORT || 8088);
app.use(express.static(__dirname+'/public'));
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(function (req, res, next) {
next()
});
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/login',require('./routes/login'));
app.use('/',require('./routes/index'));
app.use('/index',require('./routes/index'));
app.get('/about',require('./routes/about'));
app.get('/write',require('./routes/write'));
app.get('/life',require('./routes/life'));
app.get('/tech',require('./routes/life'));
app.post('/login', function(req, res){
  var user = {
    name: req.body.name,
    pwd:  req.body.password
  };
  login.selectUsr(login.client,user.name,function(results){
    if(results==user.pwd){
        res.json({sucess:true});
    }else{
        res.json({sucess:false});
    }
  })
});
app.post('/write', function(req, res){
  var blog = {
    title: req.body.title,
    content:  req.body.content,
    author:req.body.author,
    date:req.body.date,
    tag:req.body.tag
  };
  login.insertblog(login.client,blog.title,blog.content,blog.author,blog.date,blog.tag,function(result){
    if(result!=''){
        res.json({sucess:true});
    }else{
        res.json({sucess:false});
    }
  })
});



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
    res.type('text/html');
    res.render('404');
});
// 500页面
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
     res.type('text/html');
    res.render('500');
});
app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:'+app.get('port')+'; Press Ctrl-C to terminate.')
});
