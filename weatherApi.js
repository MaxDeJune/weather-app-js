import { moonPhases } from "./moonPhases.js";

const link = "http://api.weatherapi.com/v1/forecast.json?"; 
const key = "06e64a3d290447faabf35242230302";
const days = 3;  

let store = {};

const getWeatherData = async (city) => {
    try {
        const response = await fetch(`${link}key=${key}&q=${city}&days=${days}&aqi=no&alerts=no&lang=ru`); 
        const data = await response.json(); 
        console.log(data);

        let {current: {
                temp_c: temp, feelslike_c: feelslike, wind_kph: wind, pressure_mb: pressure, humidity, is_day: isDay, condition: {text: condition, icon}
            },
            forecast: {
                forecastday: {
                    0: {
                        day: {condition: {text: condition1, icon: icon1}}, 
                        astro: {moon_phase: moonPhase, sunrise, sunset, moonrise, moonset},
                        hour: {13: {temp_c: dayTemp1}, 23: {temp_c: nightTemp1}}
                    }, 
                    1: {
                        day: {condition: {text: condition2, icon: icon2}},
                        hour: {13: {temp_c: dayTemp2}, 23: {temp_c: nightTemp2}}
                    }, 
                    2: {
                        day: {condition: {text: condition3, icon: icon3}},
                        hour: {13: {temp_c: dayTemp3}, 23: {temp_c: nightTemp3}}
                    }
                }
            }} = data; 

            store = {
                city, 
                current: {
                    temp, feelslike, wind, pressure, humidity, isDay, condition, icon
                }, 
                astro: {
                    moonPhase, moonrise, moonset, sunrise, sunset
                }, 
                forecast: {
                    today: {condition1, icon1, dayTemp1, nightTemp1}, 
                    tomorrow: {condition2, icon2, dayTemp2, nightTemp2}, 
                    afterTomorrow: {condition3, icon3, dayTemp3, nightTemp3}
                }
            };

            console.log(store); 
            console.log(store.current.condition);
            renderCurrent(); 
    } catch(error) {
        console.log(error);
    }
}

const current = document.querySelector(".grid-container");

const markupCurrent = () => {
    return `<div class="current">
                <h1>${store.city}</h1>
                <a href="https://weather.com" style="pointer-events: none;"><img src="${store.current.icon}" alt="icon"></a>
                <h2>${store.current.condition}</h2>
                <p>${store.current.temp}°</p>
                <p>Чувствуется как</p>
                <p>${store.current.feelslike}°</p>
                <p>Ветер ${store.current.wind} км/ч</p>
                <p>Влажность ${store.current.humidity} %</p>
                <p>Давление ${store.current.pressure} mm</p>
            </div> 
            <div class="forecast">
                <p>Прогноз на 3 дня</p>
                <div class="3days_items">
                    <div class="today">
                        <p>Сегодня</p>
                        <p>${store.forecast.today.condition1}</p>
                        <a href="https://weather.com" style="pointer-events: none;"><img src="${store.forecast.today.icon1}" alt="icon"></a>
                        <p>Днём ${store.forecast.today.dayTemp1}</p>
                        <p>Ночью ${store.forecast.today.nightTemp1}</p>
                    </div>
                    <div class="tomorrow">
                        <p>Завтра</p>
                        <p>${store.forecast.tomorrow.condition2}</p>
                        <a href="https://weather.com" style="pointer-events: none;"><img src="${store.forecast.tomorrow.icon2}" alt="icon"></a>
                        <p>Днём ${store.forecast.tomorrow.dayTemp2}</p>
                        <p>Ночью ${store.forecast.tomorrow.nightTemp2}</p>
                    </div>
                    <div class="after_tomorrow">
                        <p>Послезавтра</p>
                        <p>${store.forecast.afterTomorrow.condition3}</p>
                        <a href="https://weather.com" style="pointer-events: none;"><img src="${store.forecast.afterTomorrow.icon3}" alt="icon"></a>
                        <p>Днём ${store.forecast.afterTomorrow.dayTemp3}</p>
                        <p>Ночью ${store.forecast.afterTomorrow.nightTemp3}</p>
                    </div>
                </div>
            <div>
            <div class="astro">Астрономические данные на сегодня
                <div class="astro_items">
                    <div class="moon_phase">
                        <div>${moonPhases(store.astro.moonPhase)}</div>
                        <div>
                            <p>Луна</p>
                            <p>Восход: ${store.astro.moonrise}</p>
                            <p>Заход: ${store.astro.moonset}</p>
                        </div>
                        <div>
                            <p>Солнце</p>
                            <p>Восход: ${store.astro.sunrise}</p>
                            <p>Заход: ${store.astro.sunset}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
};

const renderCurrent = () => {
    current.innerHTML = markupCurrent(); 
}
 
export { getWeatherData };