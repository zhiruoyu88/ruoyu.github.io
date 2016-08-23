       !function(win,doc,$,undefined){
            var date = new Date(),
                year = date.getFullYear().toString(),
                month = date.getMonth()+1,
                day = date.getDate(),
                $changeBtn = $('#changeBtn'),
                $goback = $('#goBack'),
                $picLoop = $('#picLoop'),
                $List = $('#List'),
                today,
                randomNum = Math.floor(Math.random()*10);
            month = month<10?'0'+month:month;
            today = year+'-'+month+'-'+day;
            $('#today').html(today);
            
            $picLoop.css('background-image','url(img/bc_'+randomNum+'.jpg)');
            $changeBtn.on('click',function(){
                $picLoop.animate({'right':'300px'},200);
                $List.animate({'right':0},200);
            })
            $goback.on('click',function(){
                $picLoop.animate({'right':'0px'},200);
                $List.animate({'right':'-300px'},200);
            });
            $('#loginBtn').on('click',function(){
                var usr = {
                    name:$('#username').val(),
                    password:$('#password').val()
                };
                $.post('/login',usr,function(data){
                    if(data.sucess){
                        window.location.href="/write";
                    }else{
                        alert('账号或密码错误，请重新输入！')
                    }
                })
            });
       }(window,document,jQuery);