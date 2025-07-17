var checkMode = localStorage.getItem("mode");
function setTheme(param) {
    if(param === 'dark'){
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
    } else if (param === 'light'){
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
    }
}
setTheme(checkMode)

document.querySelectorAll('.header-theme').forEach((item)=>{
    item.addEventListener('click',(e)=>{
        let value = e.target.dataset.value;
        console.log(value);
        if (value == 'dark') {
            e.target.dataset.value = 'light'
            value = 'light'
        }else if(value == 'light'){
            e.target.dataset.value = 'dark'
            value = 'dark'
        }
        setTheme(value)
        localStorage.setItem("mode", value);
        console.log({checkMode}, value);
    })
})
// const header = document.querySelector('.header')
// if (header) {
//     // const
//     //     navbarCollapsed = document.querySelector('.navbar--collapsed'),
//     //     // headerMenu = header.querySelector('.header__menu'),
//     //     navbarCollapsedClose = document.querySelector('.navbar--collapsed__top__close')
//         // headerSearch = header.querySelector('.header--search__button'),
//         // headerForm = header.querySelector('.header--search__form'),
//         // headerFormClose = header.querySelector('.header--search__form__close'),

//     // headerMenu.addEventListener('click',()=>{
//     //     navbarCollapsed.classList.add('--active')
//     // })
//     // navbarCollapsedClose.addEventListener('click',()=>{
//     //     navbarCollapsed.classList.remove('--active')
//     // })
//     // headerSearch.addEventListener('click',()=>{
//     //     header.classList.add('--searchCollapsed')
//     //     headerForm.classList.add('--active')
//     // })
//     // headerFormClose.addEventListener('click',()=>{
//     //     header.classList.remove('--searchCollapsed')
//     //     headerForm.classList.remove('--active')
//     // })

//     // document.querySelector('.submenu').addEventListener('click',(e)=>{
//     //     e.target.querySelector('.submenu').classList.toggle('--active')
//     // })
// }

let lastScrollTop = 0,
    lastHeaderPosition = 0
window.addEventListener('scroll', function() {
    //unsticky header
    let scrollHeaderTop = window.pageYOffset || document.documentElement.scrollTop,
        limitHeader = document.querySelector('.navbar').offsetHeight + document.querySelector('.header').offsetHeight;
    // if(window.innerWidth < 1024){
        if (scrollHeaderTop  > limitHeader){
            if (scrollHeaderTop  > lastHeaderPosition) {
                document.querySelector('.header').classList.add('--unsticky')
            } else {
                document.querySelector('.header').classList.remove('--unsticky')
            }
        }
    // }
    lastHeaderPosition = scrollHeaderTop;
})

if (document.querySelector('.headline--updates')) {
    
    var updateSwiper = new Swiper(".headline--updates__swiper", {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: 'true',
        navigation: {
            nextEl: ".headline--updates .swiper-button-next",
            prevEl: ".headline--updates .swiper-button-prev",
        },
    });
}