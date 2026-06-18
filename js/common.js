const header = document.querySelector('.head_inner');
const nav = document.querySelector('nav');
const nav_back = document.querySelector('.gnb_bg');
const menuItems = document.querySelectorAll('.main_menu > li');

[nav, nav_back].forEach(el => {
    el.addEventListener('mouseenter', () => {
        header.classList.add('on');
    });

    el.addEventListener('mouseleave', () => {
        header.classList.remove('on');
    });
});

menuItems.forEach((item) => {

  item.addEventListener('mouseenter', () => {
    item.classList.add('active');
  });

  item.addEventListener('mouseleave', () => {
    item.classList.remove('active');
  });

});


const slides = document.querySelector('.main_1 .slides');
const slide = document.querySelectorAll('.main_1 .slides > div');

const prev = document.querySelector('.main_1 .prev');
const next = document.querySelector('.main_1 .next');

const playBtn = document.querySelector('.main_1 .play');
const stopBtn = document.querySelector('.main_1 .stop');

const currentNum = document.querySelector('.current');
const totalNum = document.querySelector('.total');
const bar = document.querySelector('.bar span');

let current = 0;
let timer;

totalNum.innerText = String(slide.length).padStart(2,'0');


// 슬라이드 이동
function moveSlide() {
    slides.style.transform = `translateX(-${current * 100}%)`;

    // 숫자 변경
    currentNum.innerText =
    String(current + 1).padStart(2,'0');


    // 진행바
    bar.style.width =
    `${((current + 1) / slide.length) * 100}%`;
}


// 다음
function nextSlide() {

    current++;

    if(current >= slide.length){
        current = 0;
    }

    moveSlide();
}


// 이전
function prevSlide() {

    current--;

    if(current < 0){
        current = slide.length - 1;
    }

    moveSlide();
}


// 자동재생 시작
function startSlide(){

    timer = setInterval(nextSlide, 5000);

}


// 정지
function stopSlide(){

    clearInterval(timer);

}


// 처음 실행
startSlide();



// ▶ 재생버튼 클릭
playBtn.addEventListener("click",()=>{

    stopSlide();

    playBtn.style.display = "none";
    stopBtn.style.display = "block";

});


// ■ 정지버튼 클릭
stopBtn.addEventListener("click",()=>{

    startSlide();

    stopBtn.style.display = "none";
    playBtn.style.display = "block";

});



// 좌우 버튼
next.addEventListener("click",()=>{

    nextSlide();

});


prev.addEventListener("click",()=>{

    prevSlide();

});