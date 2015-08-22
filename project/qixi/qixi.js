$(function(){
    var swipe = Swipe($('#content'));

    var boy = BoyWalk();
    
    // 开始第一次走路
    boy.walkTo(2000, 0.2)
        .then(function() {
            //第一次走路完成
            boy.setColoer('red')
            //第二次走
            return boy.walkTo(2000, 0.4)
        }).then(function() {
            //第二次走路完成
            boy.setColoer('yellow')
            //第三次走路
            return boy.walkTo(2000, 0.6)
        }).then(function() {
            //第三次走路完成
            boy.setColoer('blue')
        });
})