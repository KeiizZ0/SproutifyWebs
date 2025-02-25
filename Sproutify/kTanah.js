//code for humburger menu
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar')

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    const isActive = sidebar.classList.contains('active');
    
    hamburger.innerHTML = isActive ? '✖' : '&#9776;';
    hamburger.classList.toggle('x-active', isActive);
});

//code active button
const zoneLinks = document.querySelectorAll('.zones a');
const unitLinks = document.querySelectorAll('.unit-container a');


zoneLinks.forEach(link => {
    link.addEventListener('click', function() {
        zoneLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});

unitLinks.forEach(link => {
    link.addEventListener('click', function() {
        unitLinks.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});


//code diagrams
document.addEventListener('DOMContentLoaded', function () {
    const barChart = document.getElementById('bar-chart');
    const weekBtn = document.getElementById('week-btn');
    const monthBtn = document.getElementById('month-btn');
    const yearBtn = document.getElementById('year-btn');

    function generateBars(count) {
        barChart.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = '0'; 

            barChart.appendChild(bar);

            setTimeout(() => {
                bar.style.height = Math.random() * 100 + '%';
            }, i * 100);
        }
    }

    //change bar 
    weekBtn.addEventListener('click', function () {
        generateBars(7); 
        setActive(weekBtn);
        updateDate('week');
    });

    monthBtn.addEventListener('click', function () {
        generateBars(30); 
        setActive(monthBtn);
        updateDate('month');
    });

    yearBtn.addEventListener('click', function () {
        generateBars(12);
        setActive(yearBtn);
        updateDate('year');
    });

    // code active button
    function setActive(activeBtn) {
        [weekBtn, monthBtn, yearBtn].forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    generateBars(7);

    // update the date
    function updateDate(period) {
        const startDateElement = document.getElementById("startDate");
        const endDateElement = document.getElementById("endDate");

        const startDate = "July 24";
        
        if (period === 'week') {
            startDateElement.textContent = startDate;
            endDateElement.textContent = "July 30";
        } else if (period === 'month') {
            startDateElement.textContent = startDate;
            endDateElement.textContent = "August 24";
        } else if (period === 'year') {
            startDateElement.textContent = startDate;
            endDateElement.textContent = "July 24";
        }
    }
});


//code for area and option
const selectElement = document.getElementById("isi");
const areaText = document.getElementById("area-text");

selectElement.addEventListener("change", function() {
    const selectedValue = selectElement.value;

    areaText.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${selectedValue}`;
});


const rectangle = document.querySelector('.dotted-rectangle');
const overlay = document.querySelector('.data-overlay');

const zonePositions = {
    'zone-2': { top: '37%', left: '50%', rotate: '-3deg', overlayLeft: '37%', overlayTop: '40%' },  
    'zone-3': { top: '36%', left: '25%', rotate: '3deg', overlayLeft: '40%', overlayTop: '40%' }, 
    'zone-4': { top: '36%', left: '62%', rotate: '-4deg', overlayLeft: '50%', overlayTop: '40%' } 
};

const zoneData = {
    'zone-1': {
        temperature: '22°C',
        temperatureText: 'Normal',
        soil: '93%',
        soilText: 'Tinggi',
        water: '75%',
        waterText: 'Cukup',
        waterPlants: '60%',
        waterPlantsText: 'Baik',
        nutrition: 'High',
        nutritionText: 'Optimal'
    },
    'zone-2': {
        temperature: '24°C',
        temperatureText: 'Tinggi',
        soil: '80%',
        soilText: 'Biasa',
        water: '70%',
        waterText: 'Cukup',
        waterPlants: '65%',
        waterPlantsText: 'Baik',
        nutrition: 'Medium',
        nutritionText: 'Cukup'
    },
    'zone-3': {
        temperature: '20°C',
        temperatureText: 'Rendah',
        soil: '90%',
        soilText: 'Baik',
        water: '60%',
        waterText: 'Kurang',
        waterPlants: '70%',
        waterPlantsText: 'Baik',
        nutrition: 'High',
        nutritionText: 'Optimal'
    },
    'zone-4': {
        temperature: '22°C',
        temperatureText: 'Normal',
        soil: '85%',
        soilText: 'Sedang',
        water: '75%',
        waterText: 'Cukup',
        waterPlants: '60%',
        waterPlantsText: 'Baik',
        nutrition: 'Low',
        nutritionText: 'Kurang'
    }
};

function animateValue(element, start, end, duration) {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };

    window.requestAnimationFrame(step);
}


zoneLinks.forEach(zone => {
    zone.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        zoneLinks.forEach(z => z.classList.remove('active'));
        this.classList.add('active');
        
        const zoneId = this.id;

        
        if (zoneId !== 'zone-1') {
            const { top, left, rotate, overlayLeft, overlayTop } = zonePositions[zoneId];
            rectangle.style.top = top;
            rectangle.style.left = left;

            if (rotate) {
                rectangle.style.transform = `rotate(${rotate})`; 
            } else {
                rectangle.style.transform = ''; 
            }

            overlay.style.left = overlayLeft;
            overlay.style.top = overlayTop;

            const data = zoneData[zoneId];
            
            animateValue(document.getElementById('temperature-value'), 0, parseInt(data.temperature), 1000); 
            animateValue(document.getElementById('soil-value'), 0, parseInt(data.soil), 1000);
            animateValue(document.getElementById('water-value'), 0, parseInt(data.water), 1000);
            animateValue(document.getElementById('water-plants-value'), 0, parseInt(data.waterPlants), 1000);
            animateValue(document.getElementById('nutrition-value'), 0, data.nutrition === 'High' ? 100 : data.nutrition === 'Medium' ? 70 : 40, 1000);

            document.getElementById('temperature-text').textContent = data.temperatureText;
            document.getElementById('soil-text').textContent = data.soilText;
            document.getElementById('water-text').textContent = data.waterText;
            document.getElementById('water-plants-text').textContent = data.waterPlantsText;
            document.getElementById('nutrition-text').textContent = data.nutritionText;

            rectangle.style.animation = 'none'; 
            overlay.style.animation = 'none';
            
            setTimeout(() => {
                rectangle.style.animation = 'expandRectangle 1s forwards'; 
                overlay.style.animation = 'popupOverlay 1.5s forwards'; 
            }, 10);
        } else {
            rectangle.style.top = '37%';
            rectangle.style.left = '37%';
            rectangle.style.transform = '';

            overlay.style.top = '40%';    
            overlay.style.left = '24%';  

            rectangle.style.animation = 'none'; 
            overlay.style.animation = 'none'; 

            setTimeout(() => {
                rectangle.style.animation = 'expandRectangle 1s forwards'; 
                overlay.style.animation = 'popupOverlay 1.5s forwards'; 
            }, 10);
        }
    });
});

const input = document.getElementById('input');
 
input.addEventListener('input', function(){
    const inputvalue = input.value;

    if (inputvalue.trim() !== "") {
        rectangle.style.display = 'block';
        overlay.style.display = 'block';

        rectangle.style.animation = 'expandRectangle 1s forwards';
        overlay.style.animation = 'popupOverlay 1s forwards';
    }
    else {
        rectangle.style.display = 'none';
        overlay.style.display = 'none';
    }
})