import { capitalize, formatHour, formatDay } from "./utils.js"

export class Weather {

    constructor(city) {
        this.city = city;
        this.apiKey = "cf39a76fd2d3920e61697d25c3cd18d3";
        this.coordinates;
        this.units = 'metric'
    }

    getCoordinates() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.apiKey}`
        const promise = fetch(url);
        return promise
            .then((response) => response.json())
            .then((response) => {
                const coord = {
                    lat: response.coord.lat,
                    lon: response.coord.lon
                }
                return coord
            })
            .catch((error) => console.log(error))
    }



    getDataWeather() {
        const coordinates = this.getCoordinates()
        return coordinates
            .then((coordinates) => {
                const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=${this.units}&appid=${this.apiKey}`
                return fetch(url)
            })
            .then(a => a.json())
    }

    getCurrentWeather(){
        const weatherData = this.getDataWeather();
        return weatherData.then((data) =>{
            console.log(data)
            const description = capitalize(data.current.weather[0].description)
            this.timezone_offset = data.timezone_offset
            const time = formatHour(data.current.dt, data.timezone_offset)
            const date = formatDay(data.current.dt, data.timezone_offset)
            const city = capitalize(this.city)
            const icon = data.current.weather[0].icon;
            const temp = data.current.temp;
            const currentData    = {
                temp,
                city,
                description,
                date,
                time,
                icon,
            }
            return currentData
        })
    }


    async getDailyWeather(){
        const weatherData = await this.getDataWeather();
        const dailyWeather = weatherData.daily.map( e => ({ min:e.temp.min , max:e.temp.max, day:formatDay(e.dt,this.timezone_offset), icon: e.weather[0].icon}))
        return dailyWeather
    }
}