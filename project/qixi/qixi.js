$(function(){
    var swipe = Swipe($('#content'));
    //swipe.scrollTo(0, 2);
    var boy = BoyWalk();
    

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
    $('.girl').css('transform','scale(' + scale + ')');

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

    var girl = {
        elem: $('.girl'),
        getHeight: function() {
            return this.elem.height();
        },
        setOffset: function() {
            this.elem.css({
                left: $(document).width() / 2,
                top: $('.c_background_middle').offset().top - this.getHeight()/2 - this.getHeight()*scale/2
            });
        },
        // 转身动作
        rotate: function() {
            this.elem.addClass('girl-rotate');
        }
    };

    // 修正小女孩位置
    girl.setOffset();


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
            swipe.scrollTo(7000, 2);
            boy.walkTo(7000, 0.15)
            .then(function() {
                // 第二次走路到桥上left,top
                return boy.walkTo(1500, 0.25, ($('.c_background_middle').offset().top - $('.girl').height()/2 - $('.girl').height()*scale/2) / $(document).height());
            })
            .then(function() {
                // 实际走路的比例
                var proportionX = ($('.girl').offset().left - $('.boy').width() + $('.girl').width() / 16) / $(document).width();
                // 第三次桥上直走到小女孩面前
                return boy.walkTo(2500, proportionX);
            }).then(function() {
                // 图片还原原地停止状态
                boy.resetOriginal();
            }).then(function() {
                // 增加转身动作 
                setTimeout(function() {
                    girl.rotate();
                    boy.rotate();
                    snowflake();
                }, 1000);
            });
            return shutDoor();
        }).then(function(){
            lamp.dark();
        });
    


    var snowflakeURl = [
        'images/snowflake/snowflake1.png',
        'images/snowflake/snowflake2.png',
        'images/snowflake/snowflake3.png',
        'images/snowflake/snowflake4.png',
        'images/snowflake/snowflake5.png',
        'images/snowflake/snowflake6.png'
    ]

    ///////
    //飘雪花 //
    ///////
    function snowflake() {
        // 雪花容器
        var $flakeContainer = $('#snowflake');

        // 随机六张图
        function getImagesName() {
            return snowflakeURl[[Math.floor(Math.random() * 6)]];
        }
        // 创建一个雪花元素
        function createSnowBox() {
            var url = getImagesName();
            return $('<div class="snowbox" />').css({
                'width': 41,
                'height': 41,
                'position': 'absolute',
                'backgroundSize': 'cover',
                'zIndex': 100000,
                'top': '-41px',
                'backgroundImage': 'url(' + url + ')'
            }).addClass('snowRoll');
        }
        // 开始飘花
        setInterval(function() {
            // 运动的轨迹
            var startPositionLeft = Math.random() * $(document).width() - 100,
                startOpacity    = 1,
                endPositionTop  = $(document).height() - 40,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = $(document).height() * 10 + Math.random() * 5000;

            // 随机透明度，不小于0.5
            var randomStart = Math.random();
            randomStart = randomStart < 0.5 ? startOpacity : randomStart;

            // 创建一个雪花
            var $flake = createSnowBox();

            // 设计起点位置
            $flake.css({
                left: startPositionLeft,
                opacity : randomStart
            });

            // 加入到容器
            $flakeContainer.append($flake);

            // 开始执行动画
            $flake.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });
            
        }, 200);
    }

})