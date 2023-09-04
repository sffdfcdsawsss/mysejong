let title1 = ['SyncNext_23Mobile_Ticket','Groove_Open','Listen_on_Spotify','SummerArcademi','SyncNext_23Mobile_Ticket','Groove_Open','Listen_on_Spotify','SummerArcademi','SyncNext_23Mobile_Ticket','Groove_Open','Listen_on_Spotify','SummerArcademi','SyncNext_23Mobile_Ticket','Groove_Open','Listen_on_Spotify','SummerArcademi','SyncNext_23Mobile_Ticket','Groove_Open','Listen_on_Spotify','SummerArcademi','SyncNext_23Mobile_Ticket','Groove_Open','Listen_on_Spotify','SummerArcademi','SyncNext_23Mobile_Ticket','Groove_Open','Listen_on_Spotify','SummerArcademi','SyncNext_23Mobile_Ticket','Groove_Open'];

let title2 = ['2022_SecondhalfEvent', '2022_SpringEvent', '2022_SummerEvent', '2023_Firsthalf_yearEvent','2023_SeaonEvent','2023_SeasonTicket_Event','College_entrance_exam_discount_Event','Dear_Schubert_Ticket_Open_Event','GHOST_STORY','Home_page_member_Event','LOVE_IN_SEOUL 2022','Membership_Event','Musical_again,spring_Event','Points_earned_Event','Rebuilding_Event','Schubert_and_the_Rose_Fairy_Sherbet_Event','Sejong_Chamber_Series_Tickets_Open_Event','2022_SecondhalfEvent', '2022_SpringEvent', '2022_SummerEvent', '2023_Firsthalf_yearEvent','2023_SeaonEvent','2023_SeasonTicket_Event','College_entrance_exam_discount_Event','Dear_Schubert_Ticket_Open_Event','GHOST_STORY','Home_page_member_Event','LOVE_IN_SEOUL 2022','Membership_Event','Musical_again,spring_Event'];


const elEventing = document.querySelectorAll('.eventing li');
const elBlackColor = document.querySelectorAll('li a')
const elColumn1 = document.querySelector('.column1');
const elPageTurn = document.querySelector('.page_turn');
const elPageNumbers = elPageTurn.querySelectorAll('span');
const elBefore= document.querySelectorAll('.eventing li');
let currentPage = 1; // 현재 페이지를 추적


//데이터 가져오기
//fetch('http://openAPI.seoul.go.kr:8088/73716259566c65653534455853574d/json/SJWPerform/10/140') 
fetch('../data/data.json')
    .then(response => {
        if (!response.ok) {
            //데이터를 받아올때 성공적으로 받아왓는지 확인해줌 
            //실패하면 에러 메시지를 보여줌
            throw new Error(`에러: ${response.status}`);
        // 응답이 성공적일 경우 JSON 형식으로 변환하여 반환
    }return response.json();})
    .then(jsonData => {
        let dataAll = jsonData.SJWPerform.row;
        console.log(dataAll);
        let toDate = new Date();
        let data ={e1:[],e2:[],e3:[]};
        dataAll.forEach((obj,key)=>{
            
            let sDate = {
                s1:obj.START_DATE.substring(0,4),
                s2:obj.START_DATE.substring(4,6),
                s3:obj.START_DATE.substring(6),
                day:function(){
                    return new Date(`${this.s1}-${this.s2}-${this.s3}, 00:00:00`);
                }
            }
            let eDate = {
                s1:obj.END_DATE.substring(0,4),
                s2:obj.END_DATE.substring(4,6),
                s3:obj.END_DATE.substring(6),
                day:function(){
                    return new Date(`${this.s1}-${this.s2}-${this.s3}, 23:59:00 `);
                }
            }
            obj.startD = `${sDate.s1}-${sDate.s2}-${sDate.s3}`;
            obj.endD = `${eDate.s1}-${eDate.s2}-${eDate.s3}`;
            
            if(toDate >= sDate.day() && toDate <= eDate.day()) { data.e1.push(obj); }//진행중..
            
            if(toDate < sDate.day()){ data.e2.push(obj); } //진행예정
            
            if(toDate > eDate.day()){ data.e3.push(obj); } //종료..

        })
        
     
        /* ENDLISTHTML(  data.e3  ); */
        
        STARTLISTHTML(  data.e1  );
        elPageTurn.classList.add('active');
        

        elEventing.forEach(function (ele, key) {
            ele.addEventListener('click', function (e) {
                e.preventDefault();
                if (key===0){ //진행중 클릭
                    updatePageContent();
                    STARTLISTHTML(data.e1);
                    elBlackColor[0].classList.add('black');
                    elBlackColor[1].classList.remove('black');
                    elBefore[1].classList.add('active'); // 페이지 넘버 변경
                    elBefore[0].classList.remove('active');
                    elPageTurn.classList.add('active');
                }
                else{   //종료된 클릭
                    updatePageContent();
                    ENDLISTHTML(data.e3)
                    elBlackColor[1].classList.add('black');
                    elBlackColor[0].classList.remove('black');
                    elBefore[0].classList.add('active'); 
                    elBefore[1].classList.remove('active');
                    elPageTurn.classList.remove('active');// 페이지 넘버 변경
                }
            });
        });
    }); 
/*  
    1. 현재시간<끝나는시간 => 진행중 이벤트 출력
    getDay()<endDate
    STARTLISTHTML() 출력
    출력 된 곳에 innerHTML()=`${endDate}` 출력

    근데 이미 있어 그러면 추가 해줘야지
    에러) 종료된 진행중 이 이미 있음 &&을 줘서 추가를 해야하나? 
    에러) 

    2. 현재시간>끝나는시간 => 종료된 이벤트 출력
    getDay()>endDate
    ENDLISTHTML() 출력
    출력 된 곳에 innerHTML()=`${}~${endDate}` 출력


*/
/* 진행중 이벤트 선택시 나오는 리스트를 뽑는 함수 */
function STARTLISTHTML(obj) {
    obj.forEach((item,key)=>{
        const listItem = document.createElement('li');    
        const imageElement = document.createElement('img');
        imageElement.src = item.FILE_URL_MI; // 이미지 URL 설정
        imageElement.alt = item.TITLE; // 이미지 대체 텍스트 설정
        listItem.innerHTML += `
            <div class="bgimg">
                <img src="../imgs/event/${title1[key]}.png" alt="">
            </div>
            <div class="txtbox">
                <b>${item.TITLE}</b>
                <p>${item.startD} ~ ${item.endD}</p>
            </div>
        `;
        listItem.addEventListener('click', function (e) {
            // 아이템에 걸려있는 링크로 이동
            window.location.href = item.PERFORM_URL;
        })
        elColumn1.appendChild(listItem); //지정된 부모 요소에 새로운 자식 요소를 추가하는 데 사용
    })
    
    
}

/* 종료된 이벤트 선택시 나오는 리스트를 뽑는 함수 */
function ENDLISTHTML(obj) {
    obj.forEach((item,key)=>{
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="bgimg">
                <div class="end">

                    <img src="../imgs/event/end_event/${title2[key]}.png" alt="">
                    <div class="blur">

                    </div>
                </div>
                <div class="end_contants">
                    <p>
                        종료된 이벤트
                    </p>
                </div>
            </div>
            <div class="txtbox">
                <b>${item.TITLE}</b>
                <p>${item.startD} ~ ${item.endD}</p>
            </div>
        `;
        listItem.addEventListener('click', function (e) {
            // 아이템에 걸려있는 링크로 이동
            window.location.href = item.PERFORM_URL;
        })
        elColumn1.appendChild(listItem);
    })
}

//페이지를 다음으로 전환하는 함수
function nextPage() {
    if (currentPage === 1) {
        currentPage++;
        ENDLISTHTML(data.e2); // 종료된 이벤트 목록을 업데이트
        updatePageNumbers();
    }
}

//페이지를 이전으로 전환하는 함수
function prevPage() {
    if (currentPage === 2) {
        currentPage--;
        STARTLISTHTML(data.e1); // 진행중 이벤트 목록을 업데이트
        updatePageNumbers();
    }
}

//페이지 전환
function updatePageContent() {
    elColumn1.innerHTML = ''; // Clear the existing content
    const totalEvents = title1.length; // 진행 중 이벤트의 총 개수

    if (currentPage === 1) {
        elBefore[1].classList.add('active'); // 페이지 넘버 변경
        elBefore[0].classList.remove('active');
        elPageTurn.classList.add('active');
    } else {
        elBefore[0].classList.add('active'); 
        elBefore[1].classList.remove('active');
        elPageTurn.classList.remove('active');// 페이지 넘버 변경
    }
    
    updatePageNumbers(totalEvents);
}

function updatePageNumbers(totalEvents) {
    const totalPages = Math.ceil(totalEvents / 4); // 페이지 수 계산

    // 페이지 번호 업데이트
    for (let i = 0; i < 4; i++) {
        elPageNumbers[i + 2].textContent = i + 1;
    }
}

// 페이지가 로드될 때 초기화
window.onload = function () {
    elEventing.forEach(function (ele, key) {
        
    });
}
    /* elEventing.forEach(function (ele, key) {
        ele.addEventListener('click', function (event) {
            event.preventDefault();
            currentPage = key + 1; // 페이지 번호를 클릭한 요소에 따라 설정
            //updatePageContent();
            if (key === 0) {
                elBlackColor[0].classList.add('black');
                elBlackColor[1].classList.remove('black');
            } else {
                elBlackColor[1].classList.add('black');
                elBlackColor[0].classList.remove('black');
            }
        });
    });
    // 각 페이지 번호에 이벤트 추가
    for (let i = 0; i < 4; i++) {
        elPageNumbers[i + 1].addEventListener('click', function () {
            currentPage = i + 1; // 페이지 번호 설정
            updatePageContent();
        });
    }
};
elPageNumbers[2].addEventListener('click', nextPage); */