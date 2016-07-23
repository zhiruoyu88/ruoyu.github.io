var mysql = require('mysql');
var client = mysql.createConnection({  
  host:'localhost',
  user: 'root',  
  password: 'lixiang0'
});  
// 连接
client.connect();
// 进入数据库
client.query('use '+'MYFIRST');
// 从表查询
function selectUsr (client,username,callback){
    client.query(
    'SELECT password FROM usr where name="'+username+'";',
    function selectdb (err,results,fields){
        if(err){
            throw err;
        }
        // username 没有查到的为空数组  查到为[ RowDataPacket { password: '你的密码' } ]
        // console.log(results);
        //    console.log(results.length);
        if(results.length!=0)
        {
            callback(results[0].password);
        }else if (results.length==0){
            callback(false);
        }    
    });
}

function selectArticle (client,callback){
    client.query(
    'select * from blog_article;',
    function selectdb (err,results,fields){
        if(err){
            throw err;
        }
        if(results.length!==0){
            callback(results);
        }else if (results.length==0){
            callback(false);
        }
    }
)
}
// 插入数据
function insertSome (client , username , password,callback){
    client.query('insert into usr value('+username+','+password+');', [username, password], function(err,result){
         if(err){
            console.log( "error:" + err.message);
            return err;
         }
           callback(err);
     });
}
function insertblog (client,title,content,author,date,tag,callback){
    client.query('insert into blog_article(id,blog_title, blog_content,blog_author,write_date,blog_tag) value(0,?,?,?,?,?)',[title,content,author,date,tag], function(err,result){
         if(err){
            console.log( "error:" + err.message);
            return err;
         }
           callback(result);
     });
}
exports.client = client;
exports.selectUsr =selectUsr;
exports.insertblog = insertblog;
exports.selectArticle = selectArticle;
