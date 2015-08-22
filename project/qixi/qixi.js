$(function(){
    var swipe = Swipe($('#content'));
    //swipe.scrollTo(0, 1);
    var boy = BoyWalk();
    boy.walkTo(2000, 0.2)
        .then(function() {
            //走完第一段路页面开始滚动
            swipe.scrollTo(5000, 1);
            //走第二段路
            //return boy.walkTo(5000, 0.5);
        }).then(function() {
            //return boy.walkTo(2000, 0.6)
        }).then(function() {
            //第三次走路完成
            //boy.setColoer('blue')
        });

    $(".cloud:first").addClass('cloud1Anim');
    $(".cloud:last").addClass('cloud2Anim');
    $("#sun").addClass('rotation');

    //云的大小自适应
    $('.cloud').css('transform','scale(' + $(document).height()/1000 + ')')
})