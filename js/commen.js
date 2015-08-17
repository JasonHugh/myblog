$('#nav_ul li').mouseover(function(){
	$(this).children('a').addClass('current');
	$(this).children('ul').show();
})
$('#nav_ul li').mouseout(function(){
	$(this).children('a').removeClass('current');
	$('#nav_ul>li>a').eq(0).addClass('current');
	$(this).children('ul').hide();
})
//轮播
var img_num = $('.slide-box li').length;
$('.slide-btn li').mouseover(function(){
	var index = $(this).index();
	var is_now = $('.slide-box li').eq(index).css('display');
	if(is_now != 'list-item'){
		$('.slide-btn li').removeClass('slide-btn-active');
		$(this).addClass('slide-btn-active');
		$('.slide-box li').fadeOut()
		$('.slide-box li').eq(index).fadeIn();
		clearInterval(id);
		id = setInterval('slide_clock()',4000);
	}
})
var id = setInterval('slide_clock()',4000);
function slide_clock(){
	var index = $('.slide-btn li[class="slide-btn-active"]').index();
	var time = 1000
	if(index == img_num-1){
		$('.slide-btn li').removeClass('slide-btn-active');
		$('.slide-btn li').eq(0).addClass('slide-btn-active');
		$('.slide-box li').fadeOut(time)
		$('.slide-box li').eq(0).fadeIn(time);
	}else{
		$('.slide-btn li').removeClass('slide-btn-active');
		$('.slide-btn li').eq(index+1).addClass('slide-btn-active');
		$('.slide-box li').fadeOut(time)
		$('.slide-box li').eq(index+1).fadeIn(time);
	}
}