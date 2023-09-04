//메인 베너 스와이퍼
//메인 베너 스와이퍼
//메인 베너 스와이퍼
//메인 베너 스와이퍼
function mainbannerswiper() {
    var swiper = new Swiper(".bannerwrap", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
mainbannerswiper();

//인기프로그램 스와이퍼
//인기프로그램 스와이퍼
//인기프로그램 스와이퍼
//인기프로그램 스와이퍼
function popularityswiper() {
    const prevbtn = document.querySelector(".prev");
    const nextbtn = document.querySelector(".next");
    const progressbar = document.querySelector(".bullet-color");
    const swipercontainer = document.querySelector(".swiper-con");
    const swiperpagenum = document.querySelector("#count");
    const ppcontent = document.querySelector(".pp-contents");

    let count = 0;
    let prevmax = 6;
    let nextmax = 0;
    let widthnum = 1;

    prevbtn.addEventListener("click", function () {
        if (count > 0) {
            count--;
            swipercontainer.style.transform = `translateX(-${count * 105}%)`;
            widthnum -= 1;
            progressbar.style.width = `${widthnum * 16.5}%`;
            swiperpagenum.textContent = widthnum; // 숫자 갱신
        }
    });

    nextbtn.addEventListener("click", function () {
        if (count < prevmax - 1) {
            count++;
            swipercontainer.style.transform = `translateX(-${count * 105}%)`;
            widthnum += 1;
            progressbar.style.width = `${widthnum * 16.5}%`;
            swiperpagenum.textContent = widthnum; // 숫자 갱신
        }
    });
    function auto(){
        if (count <= prevmax - 1) {
            count++;
            swipercontainer.style.transform = `translateX(-${count * 100}%)`;
            widthnum += 1;
            progressbar.style.width = `${widthnum * 16.5}%`;
            swiperpagenum.textContent = widthnum; // 숫자 갱신
            console.log(count);
        } 
        if( count >= prevmax-0.5){
            
            count =0;
            swipercontainer.style.transform = `translateX(0%)`;
            widthnum = 1;
            progressbar.style.width = `${widthnum * 16.5}%`;
            swiperpagenum.textContent = widthnum; // 숫자 갱신
        }
    }
    function showSliding() {
        setInterval(auto, 3000);
    }
    showSliding();
}
popularityswiper();

//세종시즌 박스 아이템
//세종시즌 박스 아이템
//세종시즌 박스 아이템
function sejongseason() {
    const boxitems = document.querySelectorAll(".S-boxs");

    boxitems.forEach(function (ele) {
        ele.addEventListener("click", function () {
            boxitems.forEach(function (otherEle) {
                if (otherEle !== ele) {
                    otherEle.classList.remove("active");
                }
            });
            ele.classList.add("active");
        });
    });
}

sejongseason();
//세종시즌 스와이퍼
//세종시즌 스와이퍼
//세종시즌 스와이퍼
function sejonswiper() {
    var swiper = new Swiper(".S-mobile-sle", {
        spaceBetween: 30,
        centeredSlides: true,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false,
        // },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}
sejonswiper();

// 20230828 추가
window.onload=function(){
    addMetaTagToIndexPage();
};

function addMetaTagToIndexPage(){
    const mediaQueryList = window.matchMedia('screen and (max-width:640px)');   
    let $meta = document.querySelector('meta[name=viewport]');
    if(mediaQueryList.matches) $meta.content = "width=320, initial-scale=0.5, user-scalable=no";
    else $meta.content = "width=device-width, initial-scale=1.0";
    $meta.parentElement.prepend($meta);
}


