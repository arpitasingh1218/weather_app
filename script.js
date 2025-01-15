const inputbox=document.querySelector('.input-box');
const searchBtn=document.getElementById('searchBtn');
const weather_image=document.querySelector('.weather-img');
const temperature=document.querySelector('.temperature');
const description=document.querySelector('.description');
const humidity=document.getElementById('humidity');
const wind_speed=document.getElementById('wind-speed');
const location_not_found=document.querySelector('.location_not_found');
const weather_body=document.querySelector('.weather-body');

async function check_weather(city){
    const api_key="325b39dbbaa0fa9aa04c27c1a00a6c08";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data=await fetch(`${url}`).then(response=>response.json());

    if(weather_data.cod==='404'){
      weather_body.style.display="none";
       location_not_found.style.display="flex";
       
      return;
    }
    location_not_found.style.display="none";
    weather_body.style.display="flex";
    console.log(weather_data);
    const tempCelsius = Math.round(weather_data.main.temp-273.15);
    temperature.innerHTML = `${tempCelsius} °C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind_speed.innerHTML=`${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
      case 'Clouds':
            weather_image.src= './clouds.png';
            break;
      case 'Clear':
            weather_image.src='./sun.png';
            break;
      case 'Mist':
            weather_image.src='./14181782-icon-weather-snow.jpg';
            break;
      case 'Rain':
            weather_image.src='./raining-clouds-weather-8939cc.webp';
            break;
      case 'snow':
            weather_image.src='./snow.jpg';
            break;
    }
}

searchBtn.addEventListener('click',()=>{
    check_weather(inputbox.value);
});
