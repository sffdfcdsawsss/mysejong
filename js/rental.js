//슬라이드
document.addEventListener('DOMContentLoaded', function() {
    const slideContainer = document.querySelector('.notice_slide');
    const slides = slideContainer.querySelectorAll('p');
    let currentSlideIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.transform = 'translateY(0)';
                slide.style.opacity = '1';
            } else {
                slide.style.transform = 'translateY(-100%)';
                slide.style.opacity = '0';
            }
        });
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    showSlide(currentSlideIndex);
    setInterval(nextSlide, 3000); 
});

//라인메뉴
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


//탭메뉴이동
  document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu_item');
    const tableContainers = document.querySelectorAll('.table_radius');

    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            menuItems.forEach((menuItem) => {
                menuItem.classList.remove('active');
            });

            item.classList.add('active');
            tableContainers.forEach((tableContainer) => {
                tableContainer.style.display = 'none';
            });

            if (index === 0) {
                document.querySelector('.all_ele').style.display = 'block';
            } else if (index === 1) {
                document.querySelector('.ongoing').style.display = 'block';
                
            } else if (index === 2) {
                document.querySelector('.ended').style.display = 'block';
            }
        });
    });
});


//데이터 페이징
document.addEventListener('DOMContentLoaded', () => {
  const announcementListElement = document.querySelector('.table_radius.all_ele tbody');
  const pageLinks = document.querySelectorAll('.page a');
  const jsonFilePath = '../data/rental_data.json';
  const itemsPerPage = 10;
  let currentPage = 1;

  function createAnnouncementRow(item) {
      const newRow = document.createElement('tr');
      
      newRow.innerHTML = `
          <td>${item.번호}</td>
          <td><a href="#">${item.제목}</a></td>
          <td>${item.공고기간}</td>
          <td>${item.작성일}</td>
          <td><img src="../imgs/rental/${item.상태 === '진행중' ? 'state.png' : 'state_2.png'}" alt="" class="${item.상태 === '진행중' ? 'going' : 'end'}"></td>
      `;
      return newRow;
  }

  fetch(jsonFilePath)
  .then(response => response.json())
  .then(data => {
    const allEleAnnouncementListElement = document.querySelector('.table_radius.all_ele tbody');
    const ongoingAnnouncementListElement = document.querySelector('.table_radius.ongoing tbody');
    const endedAnnouncementListElement = document.querySelector('.table_radius.ended tbody');

    data.forEach(item => {
      const newRow = createAnnouncementRow(item);

      if (item.상태 === '진행중') {
        allEleAnnouncementListElement.insertBefore(newRow.cloneNode(true), allEleAnnouncementListElement.firstChild);
        ongoingAnnouncementListElement.appendChild(newRow.cloneNode(true));
      } else {
        allEleAnnouncementListElement.appendChild(newRow.cloneNode(true));
        endedAnnouncementListElement.appendChild(newRow.cloneNode(true));
      }
    });

      // 데이터 로딩이 완료된 후에 페이지 초기화
      showPage(currentPage);
      pageLinks[currentPage - 1].classList.add('active'); // 첫 번째 페이지에 active 클래스 추가
    })

    .catch(error => {
      console.error('Error during fetching or processing JSON:', error);
    });

  function showPage(pageNumber) {
    const allAnnouncementList = document.querySelectorAll('.table_radius.all_ele tbody tr');
    const startIdx = (pageNumber - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    allAnnouncementList.forEach((row, index) => {
      if (index >= startIdx && index < endIdx) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    });
  }


  showPage(currentPage);
  pageLinks[currentPage - 1].classList.add('active'); // 첫 번째 페이지에 active 클래스 추가
  pageLinks[2].classList.add('active');
  
  pageLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      currentPage = parseInt(event.target.textContent);
      showPage(currentPage);

      // 클릭된 페이지의 링크에 active 클래스 추가
      pageLinks.forEach(link => {
        link.classList.remove('active');
      });
      event.target.classList.add('active');
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const pageLinks = document.querySelectorAll('.page a');
  const jsonFilePath = '../data/rental_data.json';
  const itemsPerPage = 10;
  let currentPage = 1;

  let endedAnnouncementListElement;

  function createAnnouncementRow(item) {
      const newRow = document.createElement('tr');
      
      newRow.innerHTML = `
          <td>${item.번호}</td>
          <td><a href="#">${item.제목}</a></td>
          <td>${item.공고기간}</td>
          <td>${item.작성일}</td>
          <td><img src="../imgs/rental/${item.상태 === '진행중' ? 'state.png' : 'state_2.png'}" alt="" class="${item.상태 === '진행중' ? 'going' : 'end'}"></td>
      `;
      return newRow;
  }

  fetch(jsonFilePath)
  .then(response => response.json())
  .then(data => {
    endedAnnouncementListElement = document.querySelector('.table_radius.ended tbody');

    data.forEach(item => {
      const newRow = createAnnouncementRow(item);

      if (item.상태 !== '진행중') {
        endedAnnouncementListElement.appendChild(newRow.cloneNode(true));
      }
    });

    showPage(currentPage);
    pageLinks[currentPage - 1].classList.add('active');
  })
  .catch(error => {
    console.error('Error during fetching or processing JSON:', error);
  });

  function showPage(pageNumber) {
    const endedAnnouncementList = endedAnnouncementListElement.querySelectorAll('tr');
    const startIdx = (pageNumber - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;

    endedAnnouncementList.forEach((row, index) => {
      if (index >= startIdx && index < endIdx) {
        row.style.display = 'table-row';
      } else {
        row.style.display = 'none';
      }
    });
  }

  pageLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        currentPage = parseInt(event.target.textContent);

        pageLinks.forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');

        showPage(currentPage);
    });
  });
}); 







// 미디어쿼리
document.addEventListener('DOMContentLoaded', function() {
  // DOMContentLoaded 이벤트가 발생했을 때 실행될 코드
  media();
});

function media() {
  const m = window.matchMedia('(max-width:640px)');
  const elGoingImg = document.querySelectorAll(".going");
  const elEndImg = document.querySelectorAll(".end");

  function changeImageSrc(images, newSrc) {
      images.forEach(image => {
          image.src = newSrc;
      });
  }

  if (m.matches) {
      changeImageSrc(elGoingImg, "../imgs/rental/m_state.png");
      changeImageSrc(elEndImg, "../imgs/rental/m_state_2.png");
  } else {
      changeImageSrc(elGoingImg, "../imgs/rental/state.png");
      changeImageSrc(elEndImg, "../imgs/rental/state_2.png");
  }
}


