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
client.query(
    'SELECT * FROM '+'usr',
    function selectdb (err,results,fields){
        if(err){
            throw err;
        }
        if(results)
      {
          for(var i = 0; i < results.length; i++)
          {
              console.log("%d\t%s\t%s", results[i].id, results[i].name, results[i].sex);
          }
      }    
    client.end(); 
    });