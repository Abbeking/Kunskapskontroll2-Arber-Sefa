const apiKey = '9466fa71f0dcdd5ccf6121c4ed3e583d';
const inputText = document.querySelector('.weather-text');
// let cityName = 'Laholm';

let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${apiKey}`



fetch(url).then(
    function(response) {
        return response.json();
    }
).then(
    function(data) {
        console.log(data);
    }
)