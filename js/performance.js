$(document).ready(function () {
    $('main.performance .visual .fade_slider').slick({
        fade: true,
        swipe:false,
        arrows:false,
        asNavFor:'.recommend_slider'
    });
    $('main.performance .visual .recommend_slider').slick({
        arrows:false,
        slidesToShow:5,
        slidesToScroll:1,
        infinite:true,
        autoplay:true,
        autoplaySpeed:2000,
        variableWidth:true,
        focusOnSelect:true,
        centerMode:true,
        touchThreshold:1000,
        asNavFor:'.fade_slider'
    });
	const $btn_like = $('main.performance .sorting .performance_list > li figure figcaption .info_wrap .btn_like');
    $btn_like.on('click', function(){ $(this).toggleClass('on'); });

    $('.btn_wrap button').on('click', function(){ $('.btn_wrap button').removeClass('on'); $(this).addClass('on'); });
});