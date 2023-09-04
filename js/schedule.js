//탭 메뉴 써클, 라인포인트
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu_item');
    const linePoints = document.querySelectorAll('.line_point');
    const menuCircles = document.querySelectorAll('.menu_circle');
  
    menuItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        menuItems.forEach((menuItem) => {
          menuItem.classList.remove('active');
        });
        linePoints.forEach((linePoint) => {
          linePoint.style.display = 'none';
        });
        menuCircles.forEach((circle) => {
          circle.style.display = 'none';
        });
  
        item.classList.add('active');

        menuCircles[index].style.display = 'inline-block';
      });
    });
  
    // 초기에 첫 번째 메뉴 선택 표시
    menuItems[0].classList.add('active');
    menuCircles[0].style.display = 'inline-block';
    
  });


//탭 메뉴 콘텐츠보이기
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu_item');
    const container1 = document.querySelector('.container_1');
    const container2 = document.querySelector('.container_2');
    
    menuItems[0].classList.add('active');
    container1.style.display = 'block';
    container2.style.display = 'none';

    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            menuItems.forEach((menuItem) => {
                menuItem.classList.remove('active');
            });
            item.classList.add('active');

            if (index === 0) {
                container1.style.display = 'block';
                container2.style.display = 'none';
            } else if (index === 1) {
                container1.style.display = 'none';
                container2.style.display = 'block';
            }
        });
    });

 




    let schedule = [],data;

    fetch('../data/data.json')
    .then(res=>res.json())
    .then(res=>{
      data = res.SJWPerform.row;
      
      data.forEach(d=>{
        schedule.push({
          sy:d.START_DATE.substr(0,4),
          sm:d.START_DATE.substr(4,2),
          sd:d.START_DATE.substr(6,2),
          ey:d.END_DATE.substr(0,4),
          em:d.END_DATE.substr(4,2),
          ed:d.END_DATE.substr(6,2)
        });
      })

      datepickerFn();
      $('.today').trigger('click');
    })

    //달력에 스케줄아이콘 출력
    function datepickerFn(){
      schedule.forEach(item=>{
        for(let i=item.sd; i<=item.ed; i++ ){
          let sDay = new Date(`${item.sy},${item.sm},${i} 09:00:00`).getTime();
          let eDay = new Date(`${item.ey},${item.em},${i} 09:00:00`).getTime();
          $(`.day[data-date=${sDay}]`).addClass('sche');
          $(`.day[data-date=${eDay}]`).addClass('sche');
        } 
      })
      
    }

    //달력 클릭 이벤트 -> 공연리스트 출력 (JSON)
    function dataList(get){
      
      let imgIcon = {"세종M씨어터":"../imgs/schedule/M.png","세종대극장":"../imgs/schedule/G.png","세종S씨어터":"../imgs//schedule/S.png", "세종체임버홀":"../imgs//schedule/CH.png" }
      let findD = {y:get.getFullYear(),m:get.getMonth()+1,d:get.getDate()};
      let result = [],resultTag='';
      
      schedule.forEach((item,k)=>{
        for(let i=item.sd; i<=item.ed; i++ ){
          if(i == findD.d){
            result.push(k);
          }
        }
      })
      
      result.forEach(item=>{
        let placeName = imgIcon[data[item].PLACE_NAME];

        resultTag += `<li class="list_1" data-key="${item}">
                          <img src="${placeName || imgIcon['세종M씨어터']}" alt="">
                          <a>${data[item].TITLE}</a>
                      </li>`
      })
      $('.list').html(resultTag)
      $('.right_title h3').html(`${findD.m}월 ${findD.d}일`)

      dataPop()
    }
    const listItems = document.querySelectorAll('.list li');
    const boxes = document.querySelectorAll('.box_ele');

    listItems.forEach((listItem, index) => {
        listItem.addEventListener('click', (e) => {

            boxes.forEach((box) => {
                box.classList.remove('active');
                console.log('1');
            });
            boxes[index].classList.add('active');
        });
    });
    //공연리스트 -> 팝업박스
    function dataPop() {

      $('.list li').on('click', function() {
        let box = document.querySelector('.box_list');
        let key = $(this).data().key;
        
        let popupContent = `<div class="box_ele ele_1">
                              <div class="thumb">
                                <img src="${data[key].FILE_URL_MI}" alt="Place Icon">
                              </div>
                              <div class="box_right">
                                <span>${data[key].PLACE_NAME}</span>
                                <p>${data[key].START_DATE} ~ ${data[key].END_DATE}</p>
                                <h3>${data[key].TITLE}</h3>
                                <button><a href="#">상세보기</a></button>
                              </div>
                            </div>`;
        
        box.innerHTML = popupContent; 
        $('.popup').fadeIn();
      });
    }
    
    $('.schedule_left').datepicker({
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        showWeekDays: true,
        language: 'ko',
    })
    .on('changeMonth',function(){
      setTimeout(()=>{datepickerFn(schedule)},50)
    })
    .on('changeDate',function(e){
      setTimeout(()=>{datepickerFn(schedule)},50);
      let getDate = new Date(e.dates[0])
      dataList(getDate);
    });

    

    




    
});

//달력옵션
function dateFn(){
  $('#datePicker')
      .datepicker({
         format: 'yyyy-mm-dd', //데이터 포맷 형식(yyyy : 년 mm : 월 dd : 일 )
         startDate: '-10d', //달력에서 선택 할 수 있는 가장 빠른 날짜. 이전으로는 선택 불가능 ( d : 일 m : 달 y : 년 w : 주)
         endDate: '+10d', //달력에서 선택 할 수 있는 가장 느린 날짜. 이후로 선택 불가 ( d : 일 m : 달 y : 년 w : 주)
         autoclose: true, //사용자가 날짜를 클릭하면 자동 캘린더가 닫히는 옵션
         calendarWeeks: false, //캘린더 옆에 몇 주차인지 보여주는 옵션 기본값 false 보여주려면 true
         clearBtn: false, //날짜 선택한 값 초기화 해주는 버튼 보여주는 옵션 기본값 false 보여주려면 true
         datesDisabled: ['2019-06-24', '2019-06-26'], //선택 불가능한 일 설정 하는 배열 위에 있는 format 과 형식이 같아야함.
         daysOfWeekDisabled: [0, 6], //선택 불가능한 요일 설정 0 : 일요일 ~ 6 : 토요일
         daysOfWeekHighlighted: [3], //강조 되어야 하는 요일 설정
         disableTouchKeyboard: false, //모바일에서 플러그인 작동 여부 기본값 false 가 작동 true가 작동 안함.
         immediateUpdates: false, //사용자가 보는 화면으로 바로바로 날짜를 변경할지 여부 기본값 :false
         multidate: false, //여러 날짜 선택할 수 있게 하는 옵션 기본값 :false
         multidateSeparator: ',', //여러 날짜를 선택했을 때 사이에 나타나는 글짜 2019-05-01,2019-06-01
         templates: {
            leftArrow: '&laquo;',
            rightArrow: '&raquo;',
         }, //다음달 이전달로 넘어가는 화살표 모양 커스텀 마이징
         showWeekDays: true, // 위에 요일 보여주는 옵션 기본값 : true
         title: '테스트', //캘린더 상단에 보여주는 타이틀
         todayHighlight: true, //오늘 날짜에 하이라이팅 기능 기본값 :false
         toggleActive: true, //이미 선택된 날짜 선택하면 기본값 : false인경우 그대로 유지 true인 경우 날짜 삭제
         weekStart: 0, //달력 시작 요일 선택하는 것 기본값은 0인 일요일
         language: 'ko', //달력의 언어 선택, 그에 맞는 js로 교체해줘야한다.
      })
      .on('changeDate', function (e) {
         /* 이벤트의 종류 */
         //show : datePicker가 보이는 순간 호출
         //hide : datePicker가 숨겨지는 순간 호출
         //clearDate: clear 버튼 누르면 호출
         //changeDate : 사용자가 클릭해서 날짜가 변경되면 호출 (개인적으로 가장 많이 사용함)
         //changeMonth : 월이 변경되면 호출
         //changeYear : 년이 변경되는 호출
         //changeCentury : 한 세기가 변경되면 호출 ex) 20세기에서 21세기가 되는 순간

         console.log(e);
         // e.date를 찍어보면 Thu Jun 27 2019 00:00:00 GMT+0900 (한국 표준시) 위와 같은 형태로 보인다.
      });
}

//리스트 현재날짜
document.addEventListener('DOMContentLoaded', function() {
    const dateElement = document.querySelector('.right_title h3');
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const formattedDate = `${month}월 ${day}일`;

    dateElement.textContent = formattedDate;
});

