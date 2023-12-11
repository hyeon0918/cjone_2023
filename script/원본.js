// main.js

// 고객센터
// dd a title = "고객센터 열기" → title="고객센터 닫기"
const topMenuDD = document.querySelectorAll("dl.topMenu > dd");

topMenuDD[4].addEventListener("click", e => {
   e.currentTarget.classList.toggle("on");
   if(e.currentTarget.classList.contains("on")) { // contains: 포함되어있는지? / 현재 마우스가 있는 태그에 클래스 on이 포함되어있으면
      e.currentTarget.children[0].setAttribute("title","고객센터 닫기"); // 속성 값을 바꿀 때 / 첫 번째 자식에 속성값을 -로 바꾼다.
   } else { // 클래스 on이 없으면
      e.currentTarget.children[0].setAttribute("title","고객센터 열기"); 
   };
});

/* 주메뉴 - header_wrap에 마우스가 올라가면 ul 내려오고 올라가기 */
// 각 li에 마우스 hover하면 풀다운 메뉴 내려오고 보여야함. 
const headerWrap = document.querySelector(".header_wrap"); 
const gnbMenu = document.querySelectorAll("nav.gnb > ul > li"); // 큰 li 안에 하위 li 5개 저장
const subMenu = document.querySelectorAll(".gnb > ul > li > ul "); // 하위메뉴 ul 4개 저장

/* 주메뉴 풀다운 */
for(var i = 0; i < gnbMenu.length; i++) { // 변수 i는 0이고, gnbMenu의 개수 미만, 하나씩 증가함.
   // mouseover 
   gnbMenu[i].addEventListener("mouseover", (e) => {     // gnbMenu의 li들에 마우스를 올려놨을 때 이벤트가 일어난다.
      // 검색박스에 클래스 on 이 붙어있을 때 주메뉴에 mouseover하면 검색박스는 사라져야 함
      if(srchBox.classList.contains("on")) { // 만약 검색박스에 클래스 on이 붙어있다면
         srchBox.classList.remove("on"); // 클래스 on 제거
         srchOpen.classList.remove("on");
      };
      // 고객센터에 클래스 on 이 붙어있을 때 주메뉴에 mouseover하면 고객센터는 사라져야 함
      if(topMenuDD[4].classList.contains("on")) {
         topMenuDD[4].classList.remove("on");
      }
      headerWrap.classList.add("on");     // headerWrap에 클래스 on을 붙이고,
      subMenu.forEach(item => {     // subMenu(하위메뉴 ul) 각각에 클래스 on을 붙여라.
         item.classList.add("on");
      });
   }); 
   //mouseout
   gnbMenu[i].addEventListener("mouseout", (e) => {      // gnbMenu의 li들에서 마우스를 뺐을 때 이벤트가 일어난다.
      headerWrap.classList.remove("on");     // headerWrap에 붙였던 클래스 on을 제거하고, 
      subMenu.forEach(item => {     // subMenu(하위메뉴 ul) 각각에 붙였던 클래스 on을 제거해라.
         item.classList.remove("on");
      });
   }); 

   // 키보드 tab키 - a태그에 focus
   gnbMenu[i].children[0].addEventListener("focus", (e) => {
      headerWrap.classList.add("on");    
      subMenu.forEach(item => {     
         item.classList.add("on");
      });
   });

   // blur - forcus가 지나갔을 때 다시 돌아오기
   gnbMenu[i].children[0].addEventListener("blur", (e) => {
      headerWrap.classList.remove("on");     
      subMenu.forEach(item => {     
         item.classList.remove("on");
      });
   });
};

/* 로그인 - appear 이미지 */
let appear = ""; // appear이미지 000 00.png ~ 000 56.png 총 57개의 이미지 저장

/* 이미지 태그를 0~56까지 57개 생성해야하므로 for문으로 만들어줌. 기존에 있는 appear값에다 새로운 값을 더해주려면 
   = 울 쓰는게 아니라 += 을 사용해야 함. */
for(var a = 0; a < 57; a++) {
   if(a < 10){
      // a가 10 미만일 때 0000 1~9.png가 되는 조건식 - appear에 이미지 저장
      appear += `<img src="img/appear/appear_0000${a}.png" alt="${a}" />`
   } else {
      // a가 10 이상일 때 000 10~56.png가 되는 조건식
      appear += `<img src="img/appear/appear_000${a}.png" alt="${a}" />`
      // ↑ appear = appear + `<img src="img/appear/appear_000${a}.png" alt="${a}" />` 의 값과 같음.
   };
};
document.querySelector("a.appear").innerHTML = appear; // element요소에 하위요소를 넣어줄 때 innerHTML을 사용함.

/* 로그인 - loop 이미지 */
let loop = ""; // loop이미지 000 00.png ~ 000 81.png 총 82개의 이미지 저장

for(var l = 0; l < 82; l++){
   if(l < 10){
      // l이 10 미만일 때 0000 1 ~ 9.png가 되는 조건식
      loop += `<img src="img/loop/loop_0000${l}.png" alt="${l}" />`
   } else {
      // l이 10 이상일 때 000 10~56.png가 되는 조건식
      loop += `<img src="img/loop/loop_000${l}.png" alt="${l}" />`
   };
};
document.querySelector("a.loop").innerHTML = loop; // element요소에 하위요소를 넣어줄 때 innerHTML을 사용함.

/* 로그인 애니메이션 */

// appear
/* appear 0~56이미지 각각에 animation 속성 적용
animation : ani 2.85s linear 0s 1;
animation : ani 2.85s linear 0.05s 1;
animation : ani 2.85s linear 0.10s 1;

57번째 이미지는
animation : ani 2.85s linear 2.8.s 1;
0~57번까지 이미지가 모두 보이는데 걸리는 시간은 총 2.85s */
const delay = 0.05;
const appearAni = document.querySelectorAll("span.login > a.appear > img");

for(var n = 0; n < 57; n++) { 
   appearAni[n].style.animation = `ani 2.85s linear ${n*delay}s 1`; 
   // appearAni에 저장한 이미지 하나하나에 animation `ani 0.85s linear ${ani*(0.5)} 1` 을 지정하겠다.
};

// document.querySelector("a.appear").innerHTML = appearAni;

// loop
/* loop 0~81 이미지 각각에 animation 속성 적용
animation : ani 4.1s linear 2.85s infinite;
animation : ani 4.1s linear 2.90s infinite;
animation : ani 4.1s linear 2.95s infinite;

0~81번까지 이미지가 모두 보이는데 걸리는 시간은 총 4.1s */
const loopAni = document.querySelectorAll("span.login > a.loop > img");

for(var a = 0; a < loopAni.length; a++) {
   loopAni[a].style.animation = `ani 4.1s linear ${2.85+(a*delay)}s infinite`;
   // loopAni에 저장한 이미지 하나하나에 animation `ani 4.1s linear ${2.85+(a*delay)}s infinite` 을 지정하겠다.
};

/* 검색박스 */
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

/* next 버튼 눌렀을 때
배너번호 1씩 증가
배너번호가 마지막 배너번호보다 크면 배너번호가 다시 0으로.
배너프레임의 left값 -로 변경해서 배너 움직이기 */

let bnnNum = 0;
let lastNum = bnnSection.length-1;
let bnnW = document.body.clientWidth;
console.log(bnnW);
// let bnnW = document.querySelector("body > section").offsetWidth;  // ( section의 offsetWidth값 ) 

window.addEventListener("resize", () => {
   bnnW = document.body.clientHeight;
});


// next 버튼 클릭했을 때
btnNext.addEventListener("click", e => {    // next 버튼을 클릭했을 때 이벤트 발생
   e.preventDefault();
   bnnNum++;   // 배너번호는 1씩 증가
   if(bnnNum > lastNum) bnnNum = 0;    // 만약 배너번호가 마지막 배너번호보다 크면 다시 0으로 돌아간다.

   bnnFrame.style.left=`${-bnnNum * bnnW}px`;  // 배너프레임의 left스타일을 (-배너번호*offsetWidth)px로 변경

   // 롤링버튼 색상변경
   secWhite(bnnNum);

});

// prev 버튼 클릭했을 때
btnPrev.addEventListener("click", e => {    // prev 버튼을 클릭했을 때 이벤트 발생
   e.preventDefault();
   bnnNum--;   // 배너번호는 1씩 감소
   if(bnnNum < 0) bnnNum = lastNum;    // 만약 배너번호가 0보다 작다면 마지막 배너번호로 돌아간다.

   bnnFrame.style.left = `${-bnnNum * bnnW}px`;    // 배너프레임의 left스타일을 (-배너번호*offsetWidth)px로 변경

   // 롤링버튼 색상변경
   secWhite(bnnNum);
});

// 오토배너 작동 - setTimeout 사용, 재귀함수 사용, 5초마다
function autoBanner() {
   // next 버튼 눌렀을 때 기능
   bnnNum++;   // 배너번호는 1씩 증가
   if(bnnNum > lastNum) bnnNum = 0;    // 만약 배너번호가 마지막 배너번호보다 크면 다시 0으로 돌아간다.

   bnnFrame.style.left = `${-bnnNum * bnnW}px`;   // 배너프레임의 left스타일을 (-배너번호*offsetWidth)px로 변경

   // 롤링버튼 클릭했을 때
   bnn_rollA.forEach(item => {
      item.classList.remove("on");
   });
   bnn_rollA[bnnNum].classList.add("on");

   secWhite(bnnNum);
   autoBnn = setTimeout(autoBanner, 5000); // 재귀함수
}
let autoBnn = setTimeout(autoBanner, 5000); // 최초 함수호출

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
      bnnFrame.style.left = `${-i * bnnW}px`;   // 배너프레임의 left스타일을 (-배너번호*offsetWidth)px로 변경
      secWhite(i);
   });
}

/* 만약 현재 배너번호에 해당되는 section에 클래스 white가 있다면
클래스 white를 붙여주고, section에 클래스 white가 없다면 white 제거 */

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

/* container */
/* content1 */

// 반복되는 것은 for문으로 / 자주 사용되는 것은 함수로 만들어서 사용.
const quickSpan = document.querySelectorAll(".content1 > ul > li > a > span"); // span 4개 모두 저장 [span0,1,2,3]

// for문으로 quick01-04 이미지 가져오기
for(let q = 0; q < 4; q++) { // quickSpan[0] ~ quickSpan[3]
   
   let quick = "";
   
   for(let a = 0; a < 20; a++) {  // 이미지 번호 0~19번
      
      if(a<10){ // 이미지 번호가 10 미만일 경우 
         quick += `<img src="img/quick0${q+1}/quick0${q+1}_0000${a}.png" alt="${a}" />` // q+1을 하는 이유는 q는 0부터 시작한다고 지정했기 때문 / 이미지 0000 0~9.png 로 가져오기
      } else { // 이미지 번호가 10 이상일 경우
         quick += `<img src="img/quick0${q+1}/quick0${q+1}_000${a}.png" alt="${a}" />`// q+1을 하는 이유는 q는 0부터 시작한다고 지정했기 때문 / 이미지 000 0~9.png 로 가져오기
      };
   };
   // document.querySelector("span.quick1").innerHTML = quick1; // 처음에 했던 방식은 span.quick1안에 이미지 20장을 저장한 quickOne을 하위html로 넣어줌.
   quickSpan[q].innerHTML = quick; // span.quick1안에 이미지 20장을 저장한 quickOne을 하위html로 넣어줌.
};

// 애니메이션 적용하기
const content1Li = document.querySelectorAll(".content1 ul li"); // .content1안에 들어있는 li 4개 모두 저장

// mouseover 했을 때
for(let i = 0; i < content1Li.length; i++){ // i는 0부터 시작, content1Li의 개수보다 작으면서 하나씩 증가
   content1Li[i].addEventListener("mouseover", e => { // content1Li[i]에 mouseover 했을 때 이벤트 발생
      for(let k=0; k < 20; k++){ // k는 0부터 시작, 20보다 작고, 하나씩 증가
         let imgLi = e.currentTarget.children[0].children[0].children; // 20개의 이미지 포함
         // imgLi는 현재 타겟이 되어있는 li의 자식(a태그), 그 자식(span 태그)의 자식 모두 → 이미지 20장 모두를 저장하는 변수
         imgLi[k].style.animation = `ani 1s linear ${delay * k}s 1`; 
         // 이미지 20장 모두 저장하는 변수인 imgLi[k]에 애니메이션 스타일 지정 → 애니메이션의 총 시간은 1초이고, delay(0.05초)*k(0~19)초 딜레이되었다가 1초 진행.
      }
   })
};

// mouseout 했을 때
for(let i = 0; i < content1Li.length; i++){ // i는 0부터 시작, content1Li의 개수보다 작으면서 하나씩 증가
   content1Li[i].addEventListener("mouseout", e => { // content1Li[i]에 mouseout 했을 때 이벤트 발생
      for(let k=0; k < 20; k++){ // k는 0부터 시작, 20보다 작고, 하나씩 증가
         let imgLi = e.currentTarget.children[0].children[0].children; // 20개의 이미지 포함
         // imgLi는 현재 타겟이 되어있는 li의 자식(a태그), 그 자식(span 태그)의 자식 모두 → 이미지 20장 모두를 저장하는 변수
         imgLi[k].style.animation = "none";
         // imgLi[k]에 지정했던 애니메이션을 없앰.
      }
   })
};


// 스크롤 도넛움직임
window.addEventListener("scroll", () => {
   let scroll = window.scrollY; 
   console.log(scroll);

   //  도넛 재료
   // 왼쪽 도넛
   const doughnut_Left_L = document.querySelector(".doughnut_Left_L");
   const doughnut_Left_S = document.querySelector(".doughnut_Left_S");
   const combine_Left = document.querySelector(".combine_Left");

   // 가운데 도넛
   const doughnut_Center_M = document.querySelector(".doughnut_Center_M");

   // 오른쪽 도넛
   const doughnut_Right_M = document.querySelector(".doughnut_Right_M");
   const combine_Right = document.querySelector(".combine_Right");

   //  화면 별 도넛 스크롤
   if(bnnW < 768) { // 모바일 화면

   // 모바일 화면 도넛
   // 스크롤 값 Left
   combine_Left.style.top = `${scroll-900*0.8}px`
   doughnut_Left_S.style.top = `${400+scroll*0.5}px`

   // 스크롤 값 center
   doughnut_Center_M.style.top = `${1850-scroll*0.4}px`

   // 스크롤 값 right
   if(scroll < 1219) { 
      combine_Right.style.top = `${scroll-700*0.8}px`
   } else {
      combine_Right.style.top = `${scroll*0.8}px`
      doughnut_Right_M.style.top = `${scroll*0.8}px`
   };

      
   } else if (bnnW > 769 && bnnW < 1025) { // 태블릿 화면
      
   // 태블릿 화면 도넛
   // 스크롤 값 Left
   combine_Left.style.top = `${scroll-900*0.8}px`
   doughnut_Left_S.style.top = `${400+scroll*0.5}px`

   // 스크롤 값 center
   doughnut_Center_M.style.top = `${1850-scroll*0.6}px`

   // 스크롤 값 right
   if(scroll < 1219) { 
      combine_Right.style.top = `${scroll-700*0.7}px`
   } else {
      combine_Right.style.top = `${scroll*0.7}px`
      doughnut_Right_M.style.top = `${scroll*0.7}px`
   };

   } else { // pc화면

   // pc화면 도넛

   // 스크롤 값 Left
   combine_Left.style.top = `${scroll-900*0.8}px`
   doughnut_Left_S.style.top = `${400+scroll*0.5}px`
   doughnut_Left_L.style.top = `${1310-scroll*0.4}px`

   // 스크롤 값 center
   doughnut_Center_M.style.top = `${1500-scroll*0.9}px`

   // 스크롤 값 right
   if(scroll < 1219) { 
      combine_Right.style.top = `${scroll-700*0.7}px`
   } else {
      combine_Right.style.top = `${scroll*0.7}px`
      doughnut_Right_M.style.top = `${scroll*0.7}px`
   };

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
/* li 하나하나에 mouseover 하면 li에 클래스 on이 붙어라, mouseout하면 on 지우기 */
const content3Li = document.querySelectorAll(".content3_inner > div > ul > li"); // li 30개 저장

for(var i = 0; i < content3Li.length; i++) {
   // mouseover
   content3Li[i].addEventListener("mouseover", (e) => {
      e.currentTarget.classList.add("on");
   });
   content3Li[i].addEventListener("mouseout", (e) => {
      e.currentTarget.classList.remove("on");
   });
};

/* content3 - 엔터테인먼트 */
/* ul의 li를 클릭하면 클릭한 li의 클래스와 동일한 이름을 갖고 있는 div ul li만 화면에 보이도록!
li를 클릭하기 전 div ul li는 보이지 않음. */
// 속성값 변화 setAttribute / 속성값 가져오기 getAttribute("class")
// 변수에 있는 값과 일치한 값을 찾는 것 switchCase

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

      /* switch 변수에 있는 값이랑 정확하게 일치하는 값은 무엇인가 찾는 것 
      case에 들어가는 클래스명은 문자열이기 때문에 따옴표를 붙여주어야 적용됨. 
      반드시 case로 찾을 변수를 입력하고 식을 실행한 후 break로 끝내줘야 함. */
      switch(className){
         case "all" : 
         display(content3Li);
            // content3Li.forEach(item => {
            //    item.style.display = "block";
            // });
            break ;

         case "ent" :
            display(ent);
            // ent.forEach(item => {
            //    item.style.display = "block";
            // });
            break;

         case "shop" :
            display(shop);
            // shop.forEach(item => {
            //    item.style.display = "block";
            // });
            break;

         case "diner" :
            display(diner);
            // diner.forEach(item => {
            //    item.style.display = "block";
            // });
            break;

         case "trav" :
            display(trav);
            // trav.forEach(item => {
            //    item.style.display = "block";
            // });
            break;

         case "life" :
            display(life);
            // life.forEach(item => {
            //    item.style.display = "block";
            // });
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