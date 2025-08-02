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
        if (value == 'dark') {
            console.log('dark');
            e.target.dataset.value = 'light'
            value = 'light'
        }else if(value == 'light'){
            console.log('light');
            e.target.dataset.value = 'dark'
            value = 'dark'
        }
        setTheme(value)
        localStorage.setItem("mode", value);
        console.log({checkMode}, value);
    })
})
const header = document.querySelector('.header')
if (header) {
    const headerCollapsed = document.querySelector('.header--collapsed')
    let search = header.querySelector('.header--collapsed__form__input'),
        searchParent = search.closest('.header--collapsed__form')

    header.querySelector('.header__menu').addEventListener('click',()=>{
        headerCollapsed.classList.add('--active')
        document.documentElement.classList.add('overflow-hidden')
    })
    function headerClose() {
        headerCollapsed.classList.remove('--active')
        document.documentElement.classList.remove('overflow-hidden')
        search.value = ''
    }
    header.querySelector('.header--collapsed__top__close').addEventListener('click',()=>{
        headerClose()
    })
    header.querySelector('.header--collapsed__overlay').addEventListener('click',()=>{
        headerClose()
    })

    search.addEventListener('input',(e)=>{
        if(e.target.value.length > 0){
            searchParent.classList.add('--active')
        }else{
            searchParent.classList.remove('--active')
        }
    })
    header.querySelector('.header--collapsed__form__close').addEventListener('click',(e)=>{
        searchParent.classList.remove('--active')
        search.value = ''
    })

    document.querySelector('.submenu__trigger')?.addEventListener('click',(e)=>{
        e.target.closest('.submenu').classList.toggle('--active')
    })
    document.documentElement.addEventListener('click',(e)=>{
        if (!e.target.closest('.submenu')) {
            document.querySelector('.submenu.--active')?.classList.remove('--active')
        }
    })

    let lastHeaderPosition = 0
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
}

