import { Weather } from "./weather.js";
import { UI } from "./UI.js"
import { capitalize, formatHour, formatDay } from "./utils.js"


const input = document.querySelector(".search-box__icon");
const searchBox = document.querySelector('.search-box__input');
const searchBo = document.querySelector('.search-box');

//First render we put the city Buenos Aires

(async ()=>{
    await getWeatherData("Buenos Aires")
    searchBo.style.visibility = "visible";
})();

// When we update the data via

input.addEventListener("click",
    () => { getWeatherData() })

searchBox.addEventListener('keydown', (e) => {
    if (e.key == "Enter")
        getWeatherData(searchBox.value)
});


async function  getWeatherData(city) {
    const weather = new Weather(city);
    const data = await weather.getCurrentWeather();
    const dailyData = await weather.getDailyWeather();
    const ui = new UI()
    ui.renderWeatherDetail(data);
    dailyData.forEach((data,index)=>{
        if (index == 7) return;
        console.log(index)
        ui.renderDayCard(data)});

}


