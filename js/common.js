const header = document.querySelector('.head_inner');
const nav = document.querySelector('nav');
const nav_back = document.querySelector('.gnb_bg');

nav.addEventListener('mouseenter', () => {
    header.classList.add('on');
});

nav_back.addEventListener('mouseleave', () => {
    header.classList.remove('on');
});
