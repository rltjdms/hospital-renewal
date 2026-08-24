// 헤더 및 메뉴

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

// Main1 
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


//Main3

let doctors = [];
let doctorCurrent = 0;
let doctorTimer; //카드 자동재생
let doctorRestartTimer; //화살표 클릭시 잠시 멈추고 자동재생


// 요소 선택
const doctorTrack = document.getElementById("doctorTrack");

const doctorNext =
    document.querySelector(".doctor_slides .next");

const doctorPrev =
    document.querySelector(".doctor_slides .prev");

const slideCurrent =
    document.getElementById("slideCurrent");

const slideTotal =
    document.getElementById("slideTotal");


// JSON 데이터 가져오기
fetch("./data/doctor.json")

    .then(res => res.json())

    .then(data => {

        doctors = data;


        // 총 의료진 수
        slideTotal.textContent =
            String(doctors.length).padStart(2, "0");


        // 의료진 카드 생성
        createDoctorCards();


        // 첫 번째 카드 표시
        moveDoctor();

    });

function createDoctorCards(){

    doctorTrack.innerHTML = "";


    doctors.forEach((doctor) => {

        // 카드 생성
        const card =
            document.createElement("div");


        card.classList.add("doctor_card");


        // 카드 기본 HTML
        card.innerHTML = `

            <div class="doctor_img">
                <img
                    src="${doctor.img}"
                    alt="${doctor.name}"
                >
            </div>

            <div class="doctor_txt">

                <div class="name">

                    <span>
                        ${doctor.position}
                    </span>

                    <strong>
                        ${doctor.name}
                    </strong>

                </div>


                <div class="career"></div>

            </div>

        `;


        // 경력 영역
        const career =
            card.querySelector(".career");


        // 경력을 하나씩 추가
        doctor.career.forEach(item => {

            const p =
                document.createElement("p");

           // "현)"이 들어간 문장이라면 current 클래스 추가
            if (item.includes("현)")) {
                p.classList.add("current");
            }

            p.textContent = item;

            career.appendChild(p);

        });



        // 완성된 카드 추가
        doctorTrack.appendChild(card);

    });

}



// 슬라이드 이동

function moveDoctor(){

    const card =
        doctorTrack.querySelector(".doctor_card");


    if(!card) return;


    // 카드 하나의 너비
    const cardWidth =
        card.offsetWidth;


    // 카드 사이 간격
    const gap = 30;


    // 카드 이동
    doctorTrack.style.transform =
        `translateX(-${doctorCurrent * (cardWidth + gap)}px)`;


    // 현재 번호
    slideCurrent.textContent =
        String(doctorCurrent + 1).padStart(2, "0");

}

// 다음 버튼

doctorNext.addEventListener("click", () => {

    doctorCurrent++;


    if(doctorCurrent >= doctors.length){

        doctorCurrent = 0;

    }


    moveDoctor();

});

// 이전 버튼

doctorPrev.addEventListener("click", () => {

    doctorCurrent--;


    if(doctorCurrent < 0){

        doctorCurrent =
            doctors.length - 1;

    }


    moveDoctor();
    restartDoctorSlide();

});

// 의료진 자동 슬라이드
function startDoctorSlide() {

    doctorTimer = setInterval(() => {

        doctorCurrent++;

        if (doctorCurrent >= doctors.length) {
            doctorCurrent = 0;
        }

        moveDoctor();
        restartDoctorSlide();

    }, 3500);

}

fetch("./data/doctor.json")

    .then(res => res.json())

    .then(data => {

        doctors = data;

        slideTotal.textContent =
            String(doctors.length).padStart(2, "0");

        createDoctorCards();

        moveDoctor();

        // 자동 슬라이드 시작
        startDoctorSlide();

    });



// 자동재생 멈추기
function stopDoctorSlide() {

    clearInterval(doctorTimer);

}
// 화살표 클릭 후 잠깐 쉬기
function restartDoctorSlide() {

    // 기존 자동재생 정지
    stopDoctorSlide();

    // 기존 재시작 예약도 취소
    clearTimeout(doctorRestartTimer);

    // 3초 후 자동재생
    doctorRestartTimer = setTimeout(() => {

        startDoctorSlide();

    }, 3000);

}



// Main4

const section = document.querySelector(".main_4");
const text = section.querySelector(".main_4 .main_text_box");
const items = section.querySelectorAll(".main_4 .treatment_item");

window.addEventListener("scroll", () => {

    const rect = section.getBoundingClientRect();

    // main_4가 화면 상단에 도달한 후 스크롤 거리
    const scrollY = Math.max(0, -rect.top);

    const maxScroll = window.innerHeight * 3;

    const progress = Math.min(
        scrollY / maxScroll,
        1
    );


    /* =====================
       왼쪽 텍스트
    ===================== */

    if (progress > 0.05) {
        text.classList.add("show");
    } else {
        text.classList.remove("show");
    }


    /* =====================
       카드 애니메이션
    ===================== */

    items.forEach((item, index) => {

        // 카드별 시작 위치
        const startY = [
            700,
            1000,
            1300,
            1600,
            1900
        ][index];


        // 카드별 최종 위치
        const endY = [
            200,      // 1번
            300,    // 2번 아래
            200,      // 3번
            300,    // 4번 아래
            200       // 5번
        ][index];


        // 카드마다 등장 타이밍
        const delay = index * 0.12;


        // 각 카드 진행도
        const itemProgress = Math.min(
            Math.max(
                (progress - delay) / 0.35,
                0
            ),
            1
        );


        // 시작 위치 → 최종 위치
        const y =
            startY + (endY - startY) * itemProgress;


        item.style.transform =
            `translateY(${y}px)`;

        item.style.opacity =
            itemProgress;

    });

});