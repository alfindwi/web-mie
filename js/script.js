// toggle class active untuk menu
const navbarNav = document.querySelector(".navbar-nav");

//ketika menu di click
document.querySelector('#menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// toggle class active untuk search
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
}


//klik di luar element
const menu = document.querySelector('#menu');
const sb = document.querySelector ('#search-button');
const sc = document.querySelector("#shopping-cart-button")
document.addEventListener('click', function(e){
    if(!menu.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active')
    }
    if(!sb.contains(e.target) && !searchForm.contains(e.target)){
        searchForm.classList.remove('active')
    }
    if(!sc.contains(e.target) && !shoppingCart.contains(e.target)){
        shoppingCart.classList.remove('active')
    }
});


// modal box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };
})


// klik close
document.querySelector('.modal .close-action').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
}

// klik luar modal
const modal = document.querySelector('#item-detail-modal');
window.onclick = (e) => {
    if (e.target === itemDetailModal){
        itemDetailModal.style.display = 'none';
    }
}

