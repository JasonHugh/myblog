$('.icon-list').click(function(){
	var w = $('.slide-nav').width()
  if($('.slide-nav').offset().left==0)
    $('.slide-nav').animate({left:-w},500)
  else
    $('.slide-nav').animate({left:0},500)
})
$('.content').click(function(){
	var w = $('.slide-nav').width()
  if($('.slide-nav').offset().left==0)
    $('.slide-nav').animate({left:-w},500)
})
$('header').click(function(){
	var w = $('.slide-nav').width()
  if($('.slide-nav').offset().left==0)
    $('.slide-nav').animate({left:-w},500)
})