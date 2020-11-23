


let body = document.querySelector('body');

let form = document.querySelector('#textbtnwrap');

// WHAT I NEED TO FIX   2020-11-18  <-- LEFT COLOR CHANGE TEMPERATURE and  & CATCH error should be visible in the weather app instead of console.


/*****************  Everything is inside the addEventListener  *****************/
form.addEventListener('submit', (event) => {
        event.preventDefault ();
        // Selects #textfield from HTML so you can search for anything in the text field.
        let textInput = document.querySelector('#textfield');
        // Connecting "city/country" to the textInput above.
        const city = textInput.value;
        // My API Key.
        const apiKey = '9466fa71f0dcdd5ccf6121c4ed3e583d';
        // My API URL.
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


        // Fetching the weatherURL so we can access all the data inside the API
        fetch(weatherURL).then( (response) => {
            if(response.status >= 200 && response.status < 300){
            return response.json();
        }

        // When nothing in database is found, then this will be sent.
        else if(response.status === 404){
            throw '⚠️I do not recognize the location, I am sorry!';
        }

        // If API key is wrong, this will trigger.
        else if(response.status === 401){
            throw response.statusText;
        }
        // If you do not write anything in the text-field, then this will appear.
        else if(response.status === 400) {
            throw '⚠️Keyboard broken? I can not seem to find any text!';
        }
            
        }
            // All you see on the page is made inside this .then
        ).then( (data) => {
                // console.log(data) shows all the information we need.
                // Selecting .city from HTML and then assigning it to data.name with innerHTML.
                let cityFinder = document.querySelector('.city');
                cityFinder.style.textTransform = 'uppercase';
                let locationEmoji = '🌎';
                cityFinder.innerHTML = locationEmoji + data.name;
                // Selecting .weatherinfo from HTML. The parent of weather information.
                const infoAboutWeather = document.querySelector('.weatherinfo');
                infoAboutWeather.style.display = 'flex';
                // Selecting .temp from HTML and fixing it so that °C will work everytime you search for a city.
                let temp = document.querySelector('.temp');
                let celsiusEmoji = '🌡️';
                let celsius = '°C';
                temp.innerHTML = celsiusEmoji + `${Math.round(data.main.temp)}` + celsius;


                // The color of the body will change depending on how hot or cold it is.
                let colorChange = data.main.temp;
                if(colorChange <= 5) {
                    body.style.background = 'linear-gradient(90deg, rgba(0,143,255,1) 0%, rgba(255,255,255,1) 100%)';
                } else if (colorChange <= 10) {
                    body.style.background = 'linear-gradient(90deg, rgba(251,190,79,1) 0%, rgba(239,255,0,1) 100%)';
                } else if (colorChange <= 15) {
                    body.style.background = 'linear-gradient(90deg, rgba(255,117,0,1) 0%, rgba(255,246,0,1) 100%)';
                } else {
                    body.style.background = 'linear-gradient(90deg, rgba(251,215,63,1) 0%, rgba(255,13,0,1) 100%)';
                }

                // Selecting .desc from HTML and then assigning it to .data.weather[0].description with innerHTML. This will show the description example: few clouds;
                let desc = document.querySelector('.desc');
                desc.style.textTransform = 'uppercase';
                let descEmoji = '☁️';
                desc.innerHTML = descEmoji + data.weather[0].description;
                // The icon image is based on the weather.
                const img = document.querySelector('img');
                img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
                // Selecting .wind and fixing so that the m/s works everytime you search.
                let wind = document.querySelector('.wind');
                let windEmoji = '💨';
                let meterSec = 'm/s';
                // Entering inside the data.wind.speed and adding .meterSec above so m/s works.
                wind.innerHTML = windEmoji + data.wind.speed + meterSec;
                // Selecting .humidity and adding % with humPercent.
                let humidity = document.querySelector('.humidity');
                let humidityEmoji = '💧';
                let humPercent = '%';
                // Entering data.main.humidity and adding .humPercent above so % works.
                humidity.innerHTML = humidityEmoji + data.main.humidity + humPercent;

            }
            
            // This sends the error if the following city/country do not exist or if you leave the textfield empty.
        ).catch( function (sendsError) {
            const img = document.querySelector('img');
            img.src = '';

            let desc = document.querySelector('.desc');
            desc.innerHTML = '';

            let cityFinder = document.querySelector('.city');
            cityFinder.innerHTML = '';

            let temp = document.querySelector('.temp');
            temp.innerHTML = '';

            let wind = document.querySelector('.wind');
            wind.innerHTML = '';

            let humidity = document.querySelector('.humidity');
            humidity.innerHTML = sendsError;

            let error = document.querySelector('.error')
            error.innerHTML = '';



        }
            
        
        );

    }

);


