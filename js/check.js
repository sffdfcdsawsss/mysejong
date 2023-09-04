const elReservation =document.querySelectorAll('ul li'),
      elLia =document.querySelectorAll('li a'),
      elExit =  document.querySelector('.title::after');
      //팝업으로 띄워 주세요 라네요
      elLia.forEach(function (ele, key) {
          ele.addEventListener('click', function (e) {
/*               e.preventDefault(); */
              if (key===0){
                history.pushState(null, null, './check.html');
                elReservation[0].classList.add(`color`);
                elReservation[1].classList.remove(`color`);
                elLia[0].classList.add(`color`);
                elLia[1].classList.remove(`color`);
            }
            else{
                history.pushState(null, null, './packagecheck.html');
                elReservation[1].classList.add(`color`);
                elReservation[0].classList.remove(`color`);54
                elLia[1].classList.add(`color`);
                elLia[0].classList.remove(`color`);

            }
        });

    });
    elReservation.forEach((ele,key)=>{
    
        ele.addEventListener('click',(e)=>{
            if (key===2) {
                elReservation[2].classList.add(`color`);
                elReservation[3].classList.remove(`color`);
            }
            if(key ===3){
                elReservation[2].classList.remove(`color`);
                elReservation[3].classList.add(`color`);

            }
        })
    })
    elExit.addEventListener('click', ()=>{
        const popup1=  window.open("../html/check.html",  "checkpopup_1", "width=1000, height=800init");
        popup1.close();
    });
