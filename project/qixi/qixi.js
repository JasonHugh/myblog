$(function(){
    var swipe = Swipe($('#content'));
    //swipe.scrollTo(0, 1);
    var boy = BoyWalk();
    boy.walkTo(1400, 0.2)
        .then(function() {
            //走完第一段路页面开始滚动
            return swipe.scrollTo(7000, 1);
        }).then(function() {
            //走第二段路
            return boy.walkTo(3500, 0.5);
        }).then(function() {
            boy.stopWalk();
            return openDoor();
        }).then(function(){
            lamp.bright();
        }).then(function(){
            return boy.toShop(2000);
        }).then(function(){
            return boy.takeFlower();
        }).then(function(){
            bird.fly();
            return boy.outShop(2000);
        }).then(function(){
            return shutDoor();
        }).then(function(){
            lamp.dark();
        });

    var scale = $(document).height()/1000;
    $(".cloud:first").addClass('cloud1Anim');
    $(".cloud:last").addClass('cloud2Anim');
    $("#sun").addClass('rotation');
    //右边飞鸟
    var bird = {
        elem: $(".bird"),
        fly: function() {
            this.elem.addClass('birdFly');
            this.elem.transition({
                right: $(document).width() + 'px'
            }, 10000, 'linear');
        }
    };
    //大小自适应
    $('.cloud').css('transform','scale(' + scale + ')');
    $('#sun').css('transform','scale(' + scale + ')');
    $('.bird').css('transform','scale(' + scale + ')');

    //门动画
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
    // 灯动画
    var lamp = {
        elem: $('.b_background'),
        bright: function() {
            this.elem.addClass('lamp-bright')
        },
        dark: function() {
            this.elem.removeClass('lamp-bright')
        }
    };

    // 开门
    function openDoor() {
        return doorAction('-50%', '100%', 2000);
    }

    // 关门
    function shutDoor() {
        return doorAction('0%', '50%', 2000);
    }

})