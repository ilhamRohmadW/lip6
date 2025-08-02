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

document.querySelectorAll('.switch-theme').forEach((item)=>{
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

let lastHeaderPosition = 0
const header = document.querySelector('.header')
window.addEventListener('scroll', function() {
    let scrollHeaderTop = window.pageYOffset || document.documentElement.scrollTop,
        limitHeader = header.nextElementSibling.offsetTop
        if (scrollHeaderTop  > limitHeader){
            if (scrollHeaderTop  > lastHeaderPosition) {
                header.classList.add('--unsticky')
            } else {
                header.classList.remove('--unsticky')
            }
        }
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