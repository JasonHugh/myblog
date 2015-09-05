function BoyWalk(){
    //---------------小男孩设置--------------------//
    var getValue = function(className) {
        var elem = $('' + className + '');
            // 走路的路线坐标
        return {
            height: elem.height(),
            top: elem.position().top
        };
    };

    // 路中线的Y轴
    var pathY = function() {
        var data = getValue('.a_background_middle');
        return data.top + data.height / 2;
    }();

    //--------------小男孩大小自适应------------------//
    var boy = $("#boy");
    var scale =  $(document).height() / 1000;
    // 设置元素缩放
    boy.css({
        transform: 'scale(' + scale + ')'
    });
    // 获取人物元素布局尺寸
    var boyHeight = boy.height();
    var boyWidth = boy.width();
    // 计算下缩放后的元素与实际尺寸的一个距离
    var boyInsideLeft = (boyWidth - (boyWidth*scale))/2;
    var boyInsideTop = (boyHeight - (boyHeight*scale))/2;
    //--------------小男孩起始位置------------------//
    boy.css({
        top: pathY - (boyHeight * scale) - boyInsideTop + 10
    });


    //--------------------------小男孩运动-------------------------------//
    // 暂停走路
    function pauseWalk() {
        boy.addClass('pauseWalk');
    }
    // 恢复走路
    function restoreWalk() {
        boy.removeClass('pauseWalk');
    }
    // 开始走路
    function slowWalk() {
        boy.addClass('slowWalk');
    }
    // 计算移动距离
    function calculateDist(direction, proportion) {
        return (direction == "x" ? $(document).width() : $(document).height()) * proportion;
    }
    // 用transition做运动
    function stratRun(options, runTime) {
        var dfdPlay = $.Deferred();
        // 恢复走路
        restoreWalk();
        // 运动的属性
        boy.transition(options,runTime,'linear',function(){dfdPlay.resolve();});
        return dfdPlay;
    }
    // 开始走路
    function walkRun(time, dist, disY) {
        time = time || 3000;
        // 脚动作
        slowWalk();
        // 开始走路
        var d1 = stratRun({
            'left': dist + 'px',
            'top': disY ? disY : undefined
        }, time);
        return d1;
    }

    // 走进商店
    function walkToShop(runTime) {
        var defer = $.Deferred();
        var doorObj = $('.door')
        // 门的坐标
        var offsetDoor = doorObj.offset();
        var doorOffsetLeft = offsetDoor.left;
        // 小孩当前的坐标
        var offsetBoy     = boy.offset();
        var boyOffetLeft = offsetBoy.left;

        // 当前需要移动的坐标
        instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffetLeft + boy.width() / 2) + boyInsideLeft;
        //alert(instanceX)

        // 开始走路
        var walkPlay = stratRun({
            transform: 'translateX(' + instanceX + 'px) scale(0.2)',
            opacity: 0.1
        }, runTime);
        // 走路完毕
        walkPlay.done(function() {
            boy.css({
                opacity: 0
            })
            defer.resolve();
        })
        return defer;
    }

    // 走出店
    function walkOutShop(runTime) {
        var defer = $.Deferred();
        restoreWalk();
        //开始走路
        var walkPlay = stratRun({
            transform: 'translateX(' + instanceX + 'px) scale('+scale+')',
            opacity: 1
        }, runTime);
        //走路完毕
        walkPlay.done(function() {
            defer.resolve();
        });
        return defer; 
    }
    //取花
    function takeFlower() {
        //增加延时等待效果
        var defer = $.Deferred();
        setTimeout(function() {
            //取花
            boy.addClass('slowFlolerWalk')
            defer.resolve()
        }, 1000)
        return defer;
    }

    return {
        // 开始走路
        walkTo: function(time, proportionX, proportionY) {
            var distX = calculateDist('x', proportionX)
            var distY = calculateDist('y', proportionY)
            return walkRun(time, distX, distY);
        },
        // 走进商店
        toShop: function() {
            return walkToShop.apply(null, arguments);
        },
        // 走出商店
        outShop: function() {
            return walkOutShop.apply(null, arguments);
        },
        // 停止走路
        stopWalk: function() {
            pauseWalk();
        },
        // 取花
        takeFlower: function() {
            return takeFlower();
        },
        // 复位初始状态
        resetOriginal: function() {
            this.stopWalk();
            // 恢复图片
            boy.removeClass('slowWalk slowFlolerWalk');
        },
        // 转身动作
        rotate: function() {
           restoreWalk();
           boy.addClass('boy-rotate');
        }
    }
}
