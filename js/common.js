$('body main').before('<header></header>').after('<footer></footer>').after('<aside></aside>');
$('body header').after("<div class='gnb_mobile'></div>");
if($('main').hasClass('index')){
    $('header').load('./html/main_header_footer.html .header_wrap, .header-search-container',search)
    $('footer').load('./html/main_header_footer.html .footer_inner');
    $('aside').load('./html/main_header_footer.html aside a');
    $('.gnb_mobile').load('./html/main_header_footer.html .cont_wrap');
}
else {
    $('header').load('../html/header_footer.html .header_wrap, .header-search-container', search);
    $('footer').load('../html/header_footer.html .footer_inner');
    $('aside').load('../html/header_footer.html aside a');
    $('.gnb_mobile').load('../html/header_footer.html .cont_wrap');
}


setTimeout(function () {
    // 상단 메뉴 프로필 아이콘 클릭 시 로그인 페이지 이동
    const log = document.querySelectorAll(".link_profile");
    log.forEach(function (v, k) {
        v.addEventListener("click", function (e) {
            e.preventDefault();
            const userInfo = JSON.parse(sessionStorage.getItem("kakao_user_info"));

            if (userInfo) {
                // If user info exists, redirect to mypage.html
                window.location.href = "./html/mypage.html";
            } else {
                alert("로그인 페이지로 이동합니다.")
                // If user info does not exist, redirect to login.html
                window.location.href = $('main').hasClass('index') ? "./html/login.html" : "./login.html";

            }
        });
    });
}, 500);


document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.querySelector('header .header_wrap .btn_ham').addEventListener('click', function () {
            document.querySelector('body').classList.add('off');
            document.querySelector('.gnb_mobile').classList.add('on');
        });
        document.querySelector('.gnb_mobile .btn_close').addEventListener('click', function () {
            document.querySelector('body').classList.remove('off');
            document.querySelector('.gnb_mobile').classList.remove('on');
        });

        const $topBtn = document.querySelector("aside");
        $topBtn.onclick = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, 500);
});

function search(){
    const searchpop = document.querySelector(".header-search-container");
    const openbtn = document.querySelector("header .header_wrap .gnb_btn .btn_search");
    const closebtn = document.querySelector(".hd-search-close");

    openbtn.addEventListener('click', function(){
        searchpop.classList.add('active');
    })
    closebtn.addEventListener('click',function(){
        searchpop.classList.remove('active');

    })
}


const elGroup = document.querySelectorAll('.group');

function show(entries, observer) {
    entries.forEach(function (entry) {
        console.log(entry.target);
        if (entry.isIntersecting) {
            entry.target.classList.add('mem')
            observer.unobserve(entry.target);
        }
    })
}

let opt = {
    rootMargin: '0px',
    threshold: 0.3
}

const intersection = new IntersectionObserver(show, opt);
// intersection.observe(elDiv);
elGroup.forEach(function (div) {
    intersection.observe(div);
});



document.addEventListener('scroll', function () {
    let box = document.querySelector('aside');
    let winH = window.innerHeight;

    if (window.pageYOffset > winH) {
        box.style.opacity = `1`;
        box.style.transition =`0.5s`;
        
    }
})