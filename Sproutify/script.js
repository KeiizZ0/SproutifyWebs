var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 3000 
let timeAutoNext = 7000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 7s linear 1 forwards'
}


function showSlider(type) {
    let activeItem = list.querySelector('.item.active');
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item');

    // Hilangkan class active dari item yang sekarang
    activeItem.classList.remove('active');
    
    if (type === 'next') {
        list.appendChild(sliderItemsDom[0]); // Pindahkan elemen pertama ke akhir
        sliderItemsDom[1].classList.add('active'); // Set elemen berikutnya sebagai active
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]); // Pindahkan elemen terakhir ke awal
        sliderItemsDom[0].classList.add('active'); // Set elemen sebelumnya sebagai active
    }

    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation();
}

