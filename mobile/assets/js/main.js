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
    let search = headerCollapsed.querySelector('.header--collapsed__form__input'),
        searchParent = search.closest('.header--collapsed__form')

    header.querySelector('.header__menu').addEventListener('click',()=>{
        headerCollapsed.classList.add('--active')
        document.documentElement.classList.add('overflow-hidden')
    })
    function headerClose() {
        headerCollapsed.classList.remove('--active')
        document.documentElement.classList.remove('overflow-hidden')
        searchParent.classList.remove('--active')
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


    console.group('article share')
    var shareParent = document.querySelectorAll('.detail__share'),
    shareUrl = window.location.href,
    shareTitle = document.title
    
    if (shareParent) {
        
        shareParent.forEach(item => {   
            var shareButton = item.querySelector('.detail__share__button'),
            shareCopy = item.querySelector('.detail__share__copy'),
            shareCancel = item.querySelector('.detail__share__cancel')
            // expand dropdown
            shareButton.addEventListener('click', async (e) => {
                e.preventDefault()
                if (navigator.share) {
                    console.log('native');
                    try {
                        await navigator.share({
                            title: shareTitle,
                            url: shareUrl,
                        });
                        console.log('Shared successfully');
                    } catch (err) {
                        console.error('Error sharing:', err);
                    }
                } else {
                    console.log('collapsed');
                    item.classList.toggle('--collapsed')
                }
            })
            // social media share
            console.log('socmed');
            item.querySelector('.detail__share__social__button--facebook').href = "https://www.facebook.com/sharer/sharer.php?u="+ encodeURIComponent(shareUrl) +"%2F&amp;src=sdkpreparse"
            item.querySelector('.detail__share__social__button--x').href = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(shareUrl) + "&text=" + encodeURIComponent(shareTitle)
            item.querySelector('.detail__share__social__button--whatsapp').href = "https://wa.me/?text="+ encodeURIComponent(shareTitle + " " + shareUrl)
            item.querySelector('.detail__share__social__button--telegram').href = "https://t.me/share/url?url=" + encodeURIComponent(shareUrl) + "&text="+ encodeURIComponent(shareTitle)
            item.querySelector('.detail__share__social__button--linkedin').href = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(shareUrl)
            
            // copy link
            shareCopy.addEventListener('click', (e) => {
                console.log('copy');
                navigator.clipboard.writeText(shareUrl);
                shareCopy.querySelector('span').textContent = 'Link Copied!';
                setTimeout(() => {
                    shareCopy.querySelector('span').textContent = 'Copy Link';
                }, 2000);
                e.preventDefault()
            });
            // click close
            shareCancel.addEventListener('click', (e) => {
                item.classList.remove('--collapsed')
                e.preventDefault()
            })
            // click outside
            document.addEventListener('click', (e) => {
                if (!item.contains(e.target)) {
                    item.classList.remove('--collapsed')
                }
            });
        });
        console.groupEnd(); 
        
        let readpageAuthor = document.querySelector('.detail__author')
        readpageAuthor?.addEventListener('click', (e) => {
            readpageAuthor.classList.toggle('--collapsed')
        })
    }

    const detailInfo = document.querySelectorAll('.detail__info');
if (detailInfo) {
    detailInfo.forEach(item => {   
        const likeBtn = item.querySelector('.detail__reaction--like');
        const dislikeBtn = item.querySelector('.detail__reaction--dislike');
        const likeCount = likeBtn.querySelector('.detail__reaction__count');
        const dislikeCount = dislikeBtn.querySelector('.detail__reaction__count');
        
        let liked = false;
        let disliked = false;
        let countLike = parseInt(likeCount.textContent, 10);
        let countDislike = parseInt(dislikeCount.textContent, 10);
        
        likeBtn.addEventListener('click', () => {
            if (liked) {
                // Remove like
                liked = false;
                countLike--;
                likeBtn.classList.remove('--active');
            } else {
                // Add like
                liked = true;
                countLike++;
                likeBtn.classList.add('--active');
                
                // If dislike was active, remove it
                if (disliked) {
                    disliked = false;
                    countDislike--;
                    dislikeBtn.classList.remove('--active');
                }
            }
            likeCount.textContent = countLike;
            dislikeCount.textContent = countDislike;
        });
        
        dislikeBtn.addEventListener('click', () => {
            if (disliked) {
                // Remove dislike
                disliked = false;
                countDislike--;
                dislikeBtn.classList.remove('--active');
            } else {
                // Add dislike
                disliked = true;
                countDislike++;
                dislikeBtn.classList.add('--active');
                
                // If liked, remove like
                if (liked) {
                    liked = false;
                    countLike--;
                    likeBtn.classList.remove('--active');
                }
            }
            likeCount.textContent = countLike;
            dislikeCount.textContent = countDislike;
        });
    });
}
}

