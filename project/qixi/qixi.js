$(function(){
    var swipe = Swipe($('#content'));
    //swipe.scrollTo(0, 1);
    var boy = BoyWalk();
    boy.walkTo(2000, 0.2)
        .then(function() {
            //走完第一段路页面开始滚动
            swipe.scrollTo(5000, 1);
        }).then(function() {
            //走第二段路
            return boy.walkTo(5000, 0.5);
        }).then(function() {
            openDoor();
        }).then(function(){
            shutDoor();
        });

    $(".cloud:first").addClass('cloud1Anim');
    $(".cloud:last").addClass('cloud2Anim');
    $("#sun").addClass('rotation');

    //云的大小自适应
    $('.cloud').css('transform','scale(' + $(document).height()/1000 + ')');

    function doorAction(left, right, time) {
        var $door = $('.door');
        var doorLeft = $('.door-left');
        var doorRight = $('.door-right');
        var defer = $.Deferred();
        var count = 2;
        // 等待开门完成
        var complete = function() {
            if (count == 1) {
                defer.resolve();
                return;
            }
            count--;
        };
        doorLeft.animate({
            'left': left
        }, time, complete);
        
        doorRight.animate({
            'left': right
        }, time, complete);
        
         return defer;
    }

    // 开门
    function openDoor() {
        return doorAction('-50%', '100%', 2000);
    }

    // 关门
    function shutDoor() {
        return doorAction('0%', '50%', 2000);
    }
})