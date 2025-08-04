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
// live lip6

// const header = document.querySelector('.site-header')
// window.addEventListener('scroll', function() {
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     const headerNext = document.querySelector('.container-main')
//     const rect = headerNext.getBoundingClientRect();
//     const headerHeight = header.offsetHeight;
//     const offsetTop = rect.top + scrollTop - headerHeight; // Akurat meskipun layout dinamis
//     if (scrollTop > offsetTop) {
//         header.classList.add('fixed-header_slim');
//         header.nextElementSibling.style.marginTop = headerHeight + 'px'
//     } else {
//         header.classList.remove('fixed-header_slim');
//         header.nextElementSibling.style.marginTop = ''
//     }
// })
// end live lip6

let lastHeaderPosition = 0
const header = document.querySelector('.header')
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const rect = header.nextElementSibling.getBoundingClientRect();
    const headerHeight = header.offsetHeight;
    const offsetTop = rect.top + scrollTop - headerHeight; // Akurat meskipun layout dinamis
    if (scrollTop > offsetTop) {
        header.classList.add('--stick');
        header.nextElementSibling.style.marginTop = headerHeight + 'px'
        if (scrollTop > offsetTop + 100) {
            if (scrollTop  > lastHeaderPosition) {
                header.classList.add('--unsticky')
            } else {
                header.classList.remove('--unsticky')
            }
        }
    } else {
        header.classList.remove('--stick');
        header.nextElementSibling.style.marginTop = ''
    }
    lastHeaderPosition = scrollTop;
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