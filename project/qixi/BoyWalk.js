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
        top: pathY - (boyHeight * scale) - boyInsideTop + 20
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
    // 用animate做运动
    function stratRun(options, runTime) {
        var dfdPlay = $.Deferred();
        // 恢复走路
        restoreWalk();
        // 运动的属性
        boy.animate(options,runTime,'linear',function(){dfdPlay.resolve();});
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

    return {
        // 开始走路
        walkTo: function(time, proportionX, proportionY) {
            var distX = calculateDist('x', proportionX)
            var distY = calculateDist('y', proportionY)
            return walkRun(time, distX, distY);
        },
        // 停止走路
        stopWalk: function() {
            pauseWalk();
        },
        setColoer:function(value){
            boy.css('background-color',value)
        }
    }
}
