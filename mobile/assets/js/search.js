const skeleton = document.querySelector('.skeleton');
const content = document.querySelector('.smartsearch-result-summary');

// Tambahkan isi skeleton ke dalam div#skeleton
skeleton.innerHTML = `
<div class="skeleton-box skeleton-text"></div>
<div class="skeleton-box skeleton-text short"></div>
<div class="skeleton-box skeleton-text"></div>
<div class="skeleton-box skeleton-text short"></div>
<div class="skeleton-wrapper gap-3">
    <div>
        <div class="skeleton-box skeleton-image"></div>
        <div class="skeleton-box skeleton-text"></div>
        <div class="skeleton-box skeleton-text short"></div>
    </div>
    <div>
        <div class="skeleton-box skeleton-image"></div>
        <div class="skeleton-box skeleton-text"></div>
        <div class="skeleton-box skeleton-text short"></div>
    </div>
    <div>
        <div class="skeleton-box skeleton-image"></div>
        <div class="skeleton-box skeleton-text"></div>
        <div class="skeleton-box skeleton-text short"></div>
    </div>
</div>
`;

const smartSearch = document.querySelector('.smartsearch')
const smartForm = smartSearch.querySelector('.smartsearch-form')
const smartFormInput = smartForm.querySelector('.smartsearch-form-group-input')
const suggestList = smartSearch.querySelector('.smartsearch-form-suggest-list');
const descBox = smartSearch.querySelector('.smartsearch-result-summary-content');
let timer;
let allProducts = [];

// done searching
function doneSearching() {
    if(smartFormInput.value.length > 0){
        skeleton.style.display = 'block';
        smartSearch.classList.add('--begin')
        setTimeout(() => {
            skeleton.style.display = 'none';
            content.style.display = 'block';
            smartSearch.classList.add('--searching')
        }, 3000);
    }
}

// show loading circular
function showLoading() {
suggestList.innerHTML = `
    <div class="loading border-neutral-200 border-t-primary"></div>
`;
}

// fetch banyak data untuk random suggestion
async function fetchAllProducts() {
showLoading();
    const res = await fetch('https://dummyjson.com/products?limit=100');
    const json = await res.json();
    allProducts = json.products;
    showRandomData();
}

// show random data
function showRandomData() {
    if (!allProducts.length) return;
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    const randomFive = shuffled.slice(0, 5);

    suggestList.innerHTML = ""; // ✅ clear loading first
    randomFive.forEach(p => {
        const div = document.createElement("div");
        div.className = "smartsearch-form-suggest-item";
        div.dataset.id = p.id;
        div.innerHTML = `
            <svg class="text-primary" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14.2499 6.375L9.38245 11.355L7.34245 8.295L3.26245 12.375" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/><path d="M12.1875 6H14.7375V8.55" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/></svg>
            <span>${p.title}</span>
            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.875 15.375L6.125 6.625" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="round"/><path d="M5.125 14.375V5.625H13.875" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="round"/></svg>
        `;
        suggestList.appendChild(div);
    });
}

// show filter data
async function showFilteredData(query) {
    showLoading();
    const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
    const json = await res.json();
    const results = json.products.slice(0, 5);

    suggestList.innerHTML = "";
    if (results.length) {
        results.forEach(p => {
            const div = document.createElement("div");
            div.className = "smartsearch-form-suggest-item";
            div.dataset.id = p.id;
            div.innerHTML = `
                <svg class="text-primary" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14.2499 6.375L9.38245 11.355L7.34245 8.295L3.26245 12.375" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/><path d="M12.1875 6H14.7375V8.55" stroke="currentColor" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/></svg>
                <span>${p.title}</span>
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.875 15.375L6.125 6.625" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="round"/><path d="M5.125 14.375V5.625H13.875" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="round"/></svg>
            `;
            suggestList.appendChild(div);
        });
    } else {
        suggestList.innerHTML = `<div class="not-found">Not Found</div>`;
    }
}

// display result
function displayResult(el) {
    descBox.innerHTML = ''
    const id = el.dataset.id;
    
    // cari product berdasarkan id
    const product = allProducts.find(p => p.id == id) || null;
    
    smartForm.classList.remove('active');
    doneSearching()
    if (product) {
        let para = document.createElement("p")
        para.textContent = product.description;
        descBox.appendChild(para)
    } else {
        // kalau hasil dari search (belum ada di allProducts)
        let para = document.createElement("p")
        para.textContent = p.description;
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(p => 
            descBox.appendChild(para)
        );
    }
}

// submit input
document.querySelector('.smartsearch-form-group-submit').addEventListener('click',(e)=>{
    e.preventDefault()
    doneSearching()
})

// keyup input
smartFormInput.addEventListener('keyup',(e)=>{
    e.preventDefault()
    console.log(smartFormInput.value)
    if (e.key === 'Enter' || e.keyCode === 13) {
        const list = document.querySelectorAll('.smartsearch-form-suggest-item')
        list.forEach(item => {
            if (smartFormInput.value == item.querySelector('span').textContent.toLowerCase()) {
                displayResult(item)
                doneSearching()
            }
        });
        smartFormInput.blur()

    }
    if(smartFormInput.value.length == 0){
        smartForm.classList.remove('--typing')
    }else{
        smartForm.classList.add('--typing')
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
        const query = smartFormInput.value.trim();
        if (!query) {
        showRandomData();
        return;
        }
        showFilteredData(query);   // fetch sesuai value input
    }, 300);
})

// focus input
smartFormInput.addEventListener('focus',(e)=>{
    if(smartFormInput.value.length != 0){
        smartForm.classList.add('--typing')
    }
    smartForm.classList.add('--focus');
    const query = smartFormInput.value.trim();
    if (query) {
        showFilteredData(query);   // kalau sudah ada value, langsung fetch sesuai value
    } else {
        if (allProducts.length) {
        showRandomData();
        } else {
        fetchAllProducts();
        }
    }
})

// blur input
smartFormInput.addEventListener('blur',(e)=>{
    setTimeout(() => smartForm.classList.remove("--focus"), 150);
})

// remove value click
document.querySelector('.smartsearch-form-group-remove').addEventListener('click',(e)=>{
    e.preventDefault()
    smartForm.classList.remove('--typing')
    smartFormInput.value = ''
    smartFormInput.focus()
    
    content.style.display = 'none';
    smartSearch.classList.remove('--begin','--searching')

})

// item suggest click
suggestList.addEventListener('click', e => {
    const item = e.target.closest('.smartsearch-form-suggest-item'); // ✅ get parent
    if (!item) return;
    
    smartFormInput.value = item.querySelector("span").textContent; // set input with title
    displayResult(item)
});

// swiper
var swiper = new Swiper(".smartsearch-result-summary-swiper", {
    slidesPerView: "auto",
    spaceBetween: 14,
});