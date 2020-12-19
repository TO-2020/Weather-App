const button = document.querySelector('#input-button');
//
//
button.addEventListener('click', () => {getWeather()});
//
//
const locationDisplay = document.querySelector('.location');
const temperatureDisplay = document.querySelector('.temperature');
const feelslikeDisplay = document.querySelector('.feels_like')
const weatherDisplay = document.querySelector('.weather');
//
//
async function getWeather() {
    document.querySelector(".error").style.display = "none";
    const location = document.querySelector("#input-box").value;
    const Wurl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=15c98029e5362a3464650c29a1d93762`;

    try{

        loadDisplay();

        const response1 = await fetch(Wurl,{
            mode: 'cors',
        });

        if (response1.status === ( 400 || 404 )) {
            throw Error;
        } 
        
        else {
            const data = await response1.json();

            const img = document.querySelector("#img");

            const weather = data.weather[0].main;
            
            const Iurl = `https://api.giphy.com/v1/gifs/translate?api_key=S0ZY81WDlaIvq3G9djpD3krxh3eb868F&s=${weather}`;
            
            const response2 = await fetch(Iurl, {
                mode: 'cors',
            });

            if (response2.status === ( 400 || 404 )) {
                throw Error;
            };

            const data2 = await response2.json();

            img.src = data2.data.images.original.url;

            fillData(data.name,data.sys.country,data.main.temp,data.main.feels_like,data.weather[0].main);
    }}

    catch{

        document.querySelector('.error').style.display = "inline";

    }
}
//
//
function fillData(location,country,temperature,feels_like,weather){
    locationDisplay.innerHTML = JSON.stringify(location).replace('"','').replace('"','')+', '+JSON.stringify(country).replace('"','').replace('"','');
    temperatureDisplay.innerHTML = "Temperature: "+JSON.stringify((temperature-273.15).toFixed(1)).replace('"','').replace('"','')+'\u00B0';
    feelslikeDisplay.innerHTML = "Feels like: "+JSON.stringify((feels_like-273.15).toFixed(1)).replace('"','').replace('"','')+'\u00B0';
    weatherDisplay.innerHTML = "Weather: "+JSON.stringify(weather).replace('"','').replace('"','');
}
//
//
function loadDisplay(){
    locationDisplay.innerHTML = '';
    temperatureDisplay.innerHTML = '';
    feelslikeDisplay.innerHTML = '';
    weatherDisplay.innerHTML = '';
    img.src = 'loading.gif';
}