// 카카오로그인 정보 불러오기
// 카카오로그인 정보 불러오기
// 카카오로그인 정보 불러오기
const kakaoidinfo = sessionStorage.getItem('kakao_user_info');
const userInfo = JSON.parse(kakaoidinfo);

const joininner = document.querySelector(".join");
const usernameinner = document.querySelector(".user_name");

/* usernameinner.innerHTML = `${userInfo.user_name}`; */


// joininner.innerHTML = `가입일자 : ${userInfo.join}`;


//방문횟수 추적
//방문횟수 추적
//방문횟수 추적


// 쿠키에서 방문 횟수 가져오기


let visitCount = parseInt(getCookie('visitCount')) || 0;

const visitWidth = document.querySelector('.progress-inner');
const visitinner = document.querySelector('.visitdate');
const Rating = document.querySelector('.Rating');
const Rating1 = document.querySelector('.Rating1');
const point = document.querySelector('.point');
const pointday = document.querySelector('.point-day');
const pointtype = document.querySelector('.point-type');
const pointeventname = document.querySelector('.point-eventname');
const pointscore = document.querySelector('.point-score');
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
const day = currentDate.getDate();

let pointdayinner =`${year}년 ${month}월 ${day}일`;

var random_number = Math.floor(Math.random() * 12000) + 1;

point.innerHTML = `${random_number}`;

console.log(point)

function memberRating() {
    console.log(123)
    if (random_number > 9999) {
        Rating.innerHTML = `시그니처`;
        Rating1.innerHTML = `시그니처`;

        visitWidth.style.width = (12.5 * 9) + '%';
    } else if (random_number > 5999) {
        Rating.innerHTML = `스페셜`;
        Rating1.innerHTML = `스페셜`;
        visitWidth.style.width = (12.5 * 4) + '%';
    } else if (random_number > 2999) {
        Rating.innerHTML = `스타트`;
        Rating1.innerHTML = `스타트`;
        visitWidth.style.width = (12.5 * 2) + '%';
    } else {
        Rating.innerHTML = `웰컴 (Welcome)`;
        Rating1.innerHTML = `웰컴 (Welcome)`;
        visitWidth.style.width = (12.5 * 1) + '%';
    }
}
pointday.innerHTML = `${pointdayinner}`;
pointtype.innerHTML = `방문`;
pointeventname.innerHTML = `홈페이지 방문하고 포인트받자!`;
pointscore.innerHTML = `+ ${random_number}`;

// 방문 횟수 증가
visitCount++;
visitinner.innerHTML = `${visitCount}회`;


// 쿠키에 방문 횟수 저장
setCookie('visitCount', visitCount);

// 쿠키를 가져오는 함수
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// 쿠키를 설정하는 함수
function setCookie(name, value) {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 예: 1년 뒤 만료
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
}

memberRating();