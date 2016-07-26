var express = require('express'),
    app = express(),
    select = require('../mysql/login');
    function loadXMLString(txt) 
    {
      try //Internet Explorer
       {
         xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
         xmlDoc.async="false";
         xmlDoc.loadXML(txt);
         //alert('IE');
         return(xmlDoc); 
       }
      catch(e)
       {
         try //Firefox, Mozilla, Opera, etc.
          {
            parser=new DOMParser();
            xmlDoc=parser.parseFromString(txt,"text/xml");
           //alert('FMO');
            return(xmlDoc);
          }
         catch(e) {console.log(e.message)}
       }
      return(null);
    }

    app.get('/',function(req,res){
        select.selectArticle(select.client,function(results){
            if(!results){
                results={}
            }else{
                for(var i=0;i<results.length;i++){
                    if(results[i].blog_tag==0){
                        results[i].blog_tag='生活';
                    }else if(results[i].blog_tag==1){
                        results[i].blog_tag='技术';
                    }
                    results[i].blog_content = loadXMLString(results[i].blog_content);
                    console.log(results[i].blog_content)
                }
                
            }
            res.type('text/html');
            res.render('home',{article:results});
        })
    });


module.exports = app;