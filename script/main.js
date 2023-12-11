// main.js

// 고객센터
const topMenuDD = document.querySelectorAll("dl.topMenu > dd");

topMenuDD[4].addEventListener("click", e => {
   e.currentTarget.classList.toggle("on");
   if(e.currentTarget.classList.contains("on")) { 
      e.currentTarget.children[0].setAttribute("title","고객센터 닫기"); 
   } else { // 클래스 on이 없으면
      e.currentTarget.children[0].setAttribute("title","고객센터 열기"); 
   };
});

// 주메뉴
const headerWrap = document.querySelector(".header_wrap");
const gnbMenu = document.querySelectorAll("nav.gnb > ul > li");
const subMenu = document.querySelectorAll(".gnb > ul > li > ul");

for(var i = 0; i < gnbMenu.length; i++) {
   // mouseover
   gnbMenu[i].addEventListener("mouseover", () => {

      headerWrap.classList.add("on");
      subMenu.forEach(item => {
         item.classList.add("on");
      });

      // 고객센터 클래스 제거
      if(topMenuDD[4].classList.contains("on")){
         topMenuDD[4].classList.remove("on");
      };

      // 검색박스 클래스 제거
      if(srchBox.classList.contains("on")) {
         srchBox.classList.remove("on");
         srchOpen.classList.remove("on");
      };

   });

   // mouseout
   gnbMenu[i].addEventListener("mouseout", () => {
      headerWrap.classList.remove("on");
      subMenu.forEach(item => {
         item.classList.remove("on");
      });
   });

};

// 검색박스
const srchBox = document.querySelector("form.srch");
const srchOpen = document.querySelector(".srch_open");

srchOpen.addEventListener("click", e => {
   e.preventDefault();
   srchOpen.classList.toggle("on");
   srchBox.classList.toggle("on");

   if(e.currentTarget.classList.contains("on")) {
      e.currentTarget.children[0].setAttribute("title","검색입력서식 닫기");
   } else {
      e.currentTarget.children[0].setAttribute("title","검색입력서식 열기");
   };
});

/* 배너 section */
const btnNext = document.querySelector(".next");   // 다음 슬라이드 버튼
const btnPrev = document.querySelector(".prev");   // 이전 슬라이드 버튼
const bnnFrame = document.querySelector(".banner_frame");   // 배너 기차 역할
const bnnSection = document.querySelectorAll(".banner_frame > section");  // 배너 각각 10개
const bnn_rollA = document.querySelectorAll(".rolling li a");  // 롤링버튼 각각 10개

let bnnNum = 0;
let lastNum = bnnSection.length-1;
let bnnW = document.body.clientWidth;
console.log(bnnW);

window.addEventListener("resize", () => {
   bnnW = document.body.clientHeight;
});

// next 버튼 클릭했을 때
btnNext.addEventListener("click", e => {  
   e.preventDefault();
   bnnNum++;   
   if(bnnNum > lastNum) bnnNum = 0;   

   bnnFrame.style.left=`${-bnnNum * bnnW}px`; 

   // 롤링버튼 색상변경
   secWhite(bnnNum);

});

// prev 버튼 클릭했을 때
btnPrev.addEventListener("click", e => { 
   e.preventDefault();
   bnnNum--;   
   if(bnnNum < 0) bnnNum = lastNum;    

   bnnFrame.style.left = `${-bnnNum * bnnW}px`;   

   // 롤링버튼 색상변경
   secWhite(bnnNum);
});

// 오토배너 작동 - setTimeout
function autoBanner() {
   // next 버튼 눌렀을 때 기능
   bnnNum++;  
   if(bnnNum > lastNum) bnnNum = 0;    

   bnnFrame.style.left = `${-bnnNum * bnnW}px`;  

   // 롤링버튼 클릭했을 때
   bnn_rollA.forEach(item => {
      item.classList.remove("on");
   });
   bnn_rollA[bnnNum].classList.add("on");

   secWhite(bnnNum);
   autoBnn = setTimeout(autoBanner, 5000); 
}
let autoBnn = setTimeout(autoBanner, 5000); 

// 재생/멈춤 버튼 
const btnPlay = document.querySelector('.rolling > p > a');
let flag = true;

btnPlay.addEventListener("click", (e) => {
   e.preventDefault();
   if(flag){
      // 멈춤 시작
      clearTimeout(autoBnn);
      btnPlay.classList.add("pause");
      flag = false;
   } else {
      // 재생 시작
      autoBnn = setTimeout(autoBanner, 5000);
      btnPlay.classList.remove("pause");
      flag = true;
   }
});

// 롤링 클릭
const bnnRolLists = document.querySelectorAll(".rolling li");

for(let i = 0; i < bnnRolLists.length; i++){
   bnnRolLists[i].addEventListener("click", (e) => {
      e.preventDefault();
      clearTimeout(autoBnn);
      flag = false;
      btnPlay.classList.add("pause");
      bnnFrame.style.left = `${-i * bnnW}px`;  
      secWhite(i);
   });
}

/* section에 .white가 있으면 각 요소에 클래스 white 붙이기 */ 
const arrowA = document.querySelectorAll(".arrow > a");
const rollingA = document.querySelectorAll(".rolling a");


let secWhite = (bannerNumber) => {

   if(bnnSection[bannerNumber].classList.contains("white")) {
      arrowA.forEach(item => {
         item.classList.add("white");
      })
      rollingA.forEach(item => {
         item.classList.add("white");
      })
   } else { 
      arrowA.forEach(item => {
         item.classList.remove("white");
      })
      rollingA.forEach(item => {
         item.classList.remove("white");
      });
   };

   bnn_rollA.forEach(item => {
      item.classList.remove("on");
   });
   bnn_rollA[bannerNumber].classList.add("on");
};

// container

// 스크롤 도넛움직임
window.addEventListener("scroll", () => {
   let scroll = window.scrollY; 
   console.log(scroll);

   //  도넛 재료
   // 왼쪽 도넛
   const doughnut_Left_S = document.querySelector(".doughnut_Left_S");

   // 가운데 도넛
   const doughnut_Center_M = document.querySelector(".doughnut_Center_M");

   //  화면 별 도넛 스크롤
   if(bnnW < 768) { // 모바일 화면

   // 모바일 화면 도넛
   // 스크롤 값 Left
   doughnut_Left_S.style.top = `${400+scroll*0.5}px`

   // 스크롤 값 center
   doughnut_Center_M.style.top = `${1850-scroll*0.4}px`
      
   // 태블릿 화면 도넛
   // 스크롤 값 Left
   doughnut_Left_S.style.top = `${400+scroll*0.5}px`

   // 스크롤 값 center
   doughnut_Center_M.style.top = `${1850-scroll*0.6}px`

   } else { // pc화면

   // pc화면 도넛

   // 스크롤 값 Left
   doughnut_Left_S.style.top = `${400+scroll*0.5}px`

   // 스크롤 값 center
   doughnut_Center_M.style.top = `${1500-scroll*0.9}px`
   };


   // top 버튼 재료
   const btnTop = document.querySelector("div.top");

   btnTop.addEventListener("click", e => {
      e.preventDefault();
   
      window.scroll({
         top: 0,
         left: 0,
         behavior: 'smooth'
      });
   });

   let bnnH = document.body.clientHeight;
   window.addEventListener('resize',()=>{  
   bnnH = document.body.clientHeight;
   });
   
   // top 버튼의 반복되는 식 함수로 변환
   function topBtnScroll(scrollHt) {
      if(scroll < 0){
      // 탑버튼이 안보일 때
      btnTop.classList.remove("on","ab");
      } else if (scroll > 0 && scroll <= scrollHt) {
      //탑버튼 고정
      btnTop.classList.add('on');
      btnTop.classList.remove('ab');
      } else {
      //탑버튼 absolute
      btnTop.classList.add('ab', "on");
      };
   };

   // top 버튼 스크롤 이벤트
   if(bnnW < 769){ // 모바일 화면
      let PCtopScollH = bnnH - 1200;
      topBtnScroll(PCtopScollH);
   } else if(bnnW > 769 && bnnW < 1025) { // 태블릿 화면
      let PCtopScollH = bnnH - 1200;
      topBtnScroll(PCtopScollH);
   } else { // pc 화면
      let PCtopScollH = bnnH - 1200;
      topBtnScroll(PCtopScollH);
   };
});

/* content3 */
const content3Li = document.querySelectorAll(".content3_inner > div > ul > li"); 

for(var i = 0; i < content3Li.length; i++) {
   // mouseover
   content3Li[i].addEventListener("mouseover", (e) => {
      e.currentTarget.classList.add("on");
   });
   content3Li[i].addEventListener("mouseout", (e) => {
      e.currentTarget.classList.remove("on");
   });
};

/* content3 - li */
const group = document.querySelectorAll(".content3_inner > ul > li > a"); // a태그 5개
const ent = document.querySelectorAll(".content3_inner > div > ul > li.ent"); // ent가 붙은 li들
const shop = document.querySelectorAll(".content3_inner > div > ul > li.shop"); // shop가 붙은 li들
const diner = document.querySelectorAll(".content3_inner > div > ul > li.diner"); // diner가 붙은 li들
const trav = document.querySelectorAll(".content3_inner > div > ul >  li.trav"); // trav가 붙은 li들
const life = document.querySelectorAll(".content3_inner > div > ul > li.life"); // life가 붙은 li들

for(let k = 0; k < group.length; k++) {
   group[k].addEventListener("click", e => { // a태그를 클릭했을 때 이벤트 발생
      e.preventDefault(); // a태그 점핑속성 제거
      group.forEach(item => { // a태그를 클릭했을 때 a태그 각각
         item.classList.remove("on"); // 클래스 on 제거하고
      });
      e.currentTarget.classList.add("on"); // 현재 타깃( a태그 )이 된 것만 클래스 on 추가

      content3Li.forEach(item => { // 각각
         item.style.display = "none"; // display: none;
      });

      let className = e.currentTarget.parentElement.getAttribute("class"); // 현재 타깃이 된 a태그의 부모인 li의 클래스를 가져와라.s
      console.log(className);

      switch(className){
         case "all" : 
         display(content3Li);
            break ;

         case "ent" :
            display(ent);
            break;

         case "shop" :
            display(shop);
            break;

         case "diner" :
            display(diner);
            break;

         case "trav" :
            display(trav);
            break;

         case "life" :
            display(life);
            break;

         // 만약 정확하게 일치하는 값이 없을 때
         default :
            console.log("일치하는 값이 없습니다.")
            break;
      };

      /* switch문 - 반복되는 것 함수로 제작 */
      function display(liName) {
         liName.forEach(item => {
         // liName에는 같은 class이름을 가진 li배열이 들어감 그래서 forEach문을 사용하는 것임.
            item.style.display = "block";
         });
      };
   });
};

/* footer 시작 */
const familySite = document.querySelector(".footer_inner > dl > dd.family_site");

familySite.addEventListener("click", e => {
   e.preventDefault();
   familySite.classList.toggle("on");

   if(e.currentTarget.classList.contains("on")) {
      familySite.children[0].setAttribute("title","닫기"); 
   } else { 
      familySite.children[0].setAttribute("title","열기"); 
   };
});

// 모바일
// 모바일 햄버거 버튼
const mobBtn = document.querySelector(".mobBtn");

const body = document.querySelector("body");
const bg = document.querySelector("div.bg");

const mobAll = document.querySelector("div.mob");
const mobClose = document.querySelector("div.mobBtn_close"); // 모바일 전체보기 닫기버튼

mobBtn.addEventListener("click", e =>{
   e.preventDefault();

   body.classList.add("on")
   bg.classList.add("on")
   mobAll.classList.add("on")
   mobClose.classList.add("on")
});

mobClose.addEventListener("click", e => {
   e.preventDefault();

   body.classList.remove("on");
   bg.classList.remove("on");
   mobAll.classList.remove("on");
   mobClose.classList.remove("on");
});

/* mob topmenu 고객센터 열고 닫기 */
const mobTopCS = document.querySelector("div.mob > .mob_topMenu > dd:nth-of-type(5)");

mobTopCS.addEventListener("click", e => {
   e.preventDefault();

   mobTopCS.classList.toggle("on");
   if(mobTopCS.classList.contains("on")) {
      mobTopCS.children[0].setAttribute("title", "고객센터 닫기");
   } else { 
      mobTopCS.children[0].setAttribute("title", "고객센터 열기"); 
   };
});

/* mob 주메뉴 버튼 */
const mobAco = document.querySelectorAll("nav.mob_gnb > ul > li.aco"); // li 3개

mobAco.forEach(item => {
   item.addEventListener("click", e => {
      item.classList.toggle("on");
   });
});