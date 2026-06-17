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