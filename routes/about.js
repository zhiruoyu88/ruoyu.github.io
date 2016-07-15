var fortunes = [
    '你不克服你的恐惧，恐惧将战胜你',
    'Rivers need springs',
    '不要害怕你所不知道的' ,
    '你将会有一个很大的惊喜',
    '无论发生什么，keep it simple'
];
var about = function(req,res){
    var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about',{fortune:randomFortune});
};
module.exports = about;