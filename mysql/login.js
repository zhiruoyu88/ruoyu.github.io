var mysql = require('mysql');
var client = mysql.createConnection({  
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
    'SELECT password FROM usr where name="'+admin+'"',
    function selectdb (err,results,fields){
        if(err){
            throw err;
        }
        if(results)
      {
          callback(results);
      }    
    });
}
// 插入数据
function insertSome (client , username , password,callback){
    client.query('insert into usr value(?,?)', [username, password], function(err,result){
27         if( err ){
28             console.log( "error:" + err.message);
29             return err;
30         }
31           callback(err);
32     });
}
exports.connect = client;
exports.selectUsr =selectUsr;
