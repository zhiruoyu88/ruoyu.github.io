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
        if(results)
        {
            callback(results[0].password);
        }    
    });
}
selectUsr(client,'admin',callback);
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
exports.client = client;
exports.selectUsr =selectUsr;
