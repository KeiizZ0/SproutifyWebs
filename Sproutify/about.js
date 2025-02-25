function openCard(card) {
    card.classList.add('open');
}

function closeCard(card) {
    card.classList.remove('open');
}

// Timeline Animation Trigger on Scroll
window.addEventListener('scroll', function () {
    const items = document.querySelectorAll('.timeline-item');
    const triggerBottom = window.innerHeight / 5 * 4;

    items.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;

        if (itemTop < triggerBottom) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});