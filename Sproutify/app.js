const cityInput = document.querySelector('.city-input')
const searchBtn = document.querySelector('.search-btn')

const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')
const weatherInfoSection = document.querySelector('.weather-info')
const detailSection = document.querySelector('.detail-container')

const cityTxt = document.querySelector('.city')
const humidityTxt = document.querySelector('.humidity-value')
const temperatureTxt = document.querySelector('.temp')
const conditionTxt = document.querySelector('.condition')
const windSpeedTxt = document.querySelector('.wind-value')
const weatherSummaryImg = document.querySelector('.weather-summary-img')
const currenDateTxt = document.querySelector('.current-date')

const forecastItemsContainer = document.querySelector('.forecast-items-container')

const apiKey = '6e580ae8d4ad24d6c68cae64befa67f1'

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})

cityInput.addEventListener('keydown', (event) => {
    if(event.key == 'Enter' && cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()   
    }
})

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

    const respond = await fetch(apiUrl)
    return respond.json()
}

function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.png'
    if (id <= 321) return 'drizzle.png'
    if (id <= 531) return 'rainy.png'
    if (id <= 622) return 'snowy.png'
    if (id <= 781) return 'atmosphere.png'
    if (id <= 800) return 'clear.png'
    else return 'cloudy.png'
}

function getCurrentDate() {
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-US', options)
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city)

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        detailSection.style.display = 'none'
        return
    }
    console.log(weatherData)

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed },
    } = weatherData

    cityTxt.textContent = country
    temperatureTxt.textContent = Math.round(temp) + ' °C'
    conditionTxt.textContent = main
    humidityTxt.textContent = humidity + '%'
    windSpeedTxt.textContent = speed + ' M/s'
    weatherSummaryImg.src = `images/${getWeatherIcon(id)}`
    currenDateTxt.textContent = getCurrentDate()

    await updateForecastsInfo(city)
    showDisplaySection(weatherInfoSection)
    detailSection.style.display = 'block'
}

async function updateForecastsInfo(city) {
    const forecastsData = await getFetchData('forecast', city)

    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    forecastItemsContainer.innerHTML = ''
    await forecastsData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastItems(forecastWeather)
        }
    })
}

function updateForecastItems(weatherData){
    const{
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = weatherData

    const dateTaken = new Date(date)
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }
    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption)

    const forecastItem = `
        <div class="forecast-item">
            <h5 class="forecast-item-date regular">${dateResult}</h5>
            <img src="images/${getWeatherIcon(id)}" class="forecast-item-img">
            <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
        </div>
        `
    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem)
}

function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFoundSection].forEach(section => section.style.display = 'none')

    section.style.display = 'flex'
}


// Function to generate random data
function generateRandomData(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Function to generate random data
function generateRandomData(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Generate random data for monthly rainfall and humidity trends
const monthlyRainfallData = generateRandomData(12, 50, 300); // Random values between 50 and 300 mm
const humidityTrendData = generateRandomData(12, 30, 100); // Random values between 30% and 100%
const yearlyRainfallData = [1000, 1100, 1200, 950, 1050, 1000, 1150, 1300, 1250, 1100];
const tempComparisonData = [24, 26, 28, 25, 30, 32, 33, 35, 34, 32, 30, 28];

// Colors for charts
const colors = {
    rainfall: 'rgba(54, 162, 235, 0.6)',
    rainMovement: 'rgba(75, 192, 192, 0.6)',
    tempComparison: 'rgba(255, 99, 132, 0.6)',
    humidity: 'rgba(153, 102, 255, 0.6)',
};

// Create Monthly Rainfall Chart
const monthlyRainfallCtx = document.getElementById('monthlyRainfallChart').getContext('2d');
const monthlyRainfallChart = new Chart(monthlyRainfallCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Monthly Rainfall (mm)',
            data: monthlyRainfallData, // Use random data
            backgroundColor: 'rgba(0, 123, 255, 0.8)', // Increased opacity (80%)
            borderColor: '#ffffff', // Line color (for bar edges)
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#ffffff' // Grid line color
                },
                ticks: {
                    color: '#ffffff' // Y-axis ticks color
                }
            },
            x: {
                ticks: {
                    color: '#ffffff' // X-axis ticks color
                },
                grid: {
                    color: '#ffffff' // Grid line color
                }
            }
        }
    }
});

// Create Yearly Rainfall Chart
const yearlyRainfallCtx = document.getElementById('yearlyRainfallChart').getContext('2d');
const yearlyRainfallChart = new Chart(yearlyRainfallCtx, {
    type: 'line',
    data: {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [{
            label: 'Yearly Rainfall (mm)',
            data: yearlyRainfallData,
            fill: false,
            borderColor: '#007bff', // Standard color for the line
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgb(255,255,255,0.8)' // Grid line color
                },
                ticks: {
                    color: 'rgb(255,255,255,0.8)' // Y-axis ticks color
                }
            },
            x: {
                ticks: {
                    color: 'rgb(255,255,255,0.8)' // X-axis ticks color
                },
                grid: {
                    color: 'rgb(255,255,255,0.8)' // Grid line color
                }
            }
        }
    }
});


// Create Temperature Comparison Chart
const tempComparisonCtx = document.getElementById('temperatureComparisonChart').getContext('2d');
const tempComparisonChart = new Chart(tempComparisonCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Temperature (°C)',
            data: tempComparisonData,
            fill: false,
            borderColor: colors.tempComparison, // Standard color for the line
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgb(255,255,255,0.8)' // Grid line color
                },
                ticks: {
                    color: 'rgb(255,255,255,0.8)' // Y-axis ticks color
                }
            },
            x: {
                ticks: {
                    color: 'rgb(255,255,255,0.8)' // X-axis ticks color
                },
                grid: {
                    color: 'rgb(255,255,255,0.8)' // Grid line color
                }
            }
        }
    }
});

// Create Humidity Trends Chart
const humidityTrendCtx = document.getElementById('humidityTrendsChart').getContext('2d');
const humidityTrendsChart = new Chart(humidityTrendCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Humidity (%)',
            data: humidityTrendData, // Use random data
            backgroundColor: 'rgba(255, 193, 7, 0.8)', // Increased opacity (80%)
            borderColor: '#ffffff', // Line color (for bar edges)
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#ffffff' // Grid line color
                },
                ticks: {
                    color: '#ffffff' // Y-axis ticks color
                }
            },
            x: {
                ticks: {
                    color: '#ffffff' // X-axis ticks color
                },
                grid: {
                    color: '#ffffff' // Grid line color
                }
            }
        }
    }
});

// Fungsi untuk menghasilkan suhu acak
async function generateRandomTemp() {
    return Math.floor(Math.random() * (35 - 18 + 1)) + 18; // Rentang 18°C - 35°C
}

// Fungsi untuk memperbarui suhu secara async
async function updateTemperatures() {
    const tempElements = document.querySelectorAll('.monthly-item-temp');
    
    for (let tempElement of tempElements) {
        const randomTemp = await generateRandomTemp(); // Menunggu suhu acak
        tempElement.textContent = `${randomTemp} °C`; // Mengupdate nilai suhu
    }
}

// Fungsi untuk mengacak gambar cuaca
async function generateRandomWeatherImage() {
    const images = ['rainy.png', 'cloudy.png', 'clear.png', 'atmosphere.png', 'drizzle.png', 'mist.png']; // Pilihan gambar cuaca
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex]; // Menunggu hasil gambar acak
}

// Fungsi untuk memperbarui gambar cuaca secara async
async function updateWeatherImages() {
    const imgElements = document.querySelectorAll('.monthly-item-img');
    
    for (let imgElement of imgElements) {
        const randomImage = await generateRandomWeatherImage(); // Menunggu gambar acak
        imgElement.src = `images/${randomImage}`; // Mengupdate sumber gambar
    }
}

// Fungsi utama yang berjalan ketika halaman dimuat
async function initializeWeatherData() {
    await updateTemperatures(); // Menunggu proses update suhu selesai
    await updateWeatherImages(); // Menunggu proses update gambar selesai
}

// Panggil fungsi utama ketika halaman selesai dimuat
window.onload = function() {
    initializeWeatherData(); // Menjalankan fungsi secara async
};