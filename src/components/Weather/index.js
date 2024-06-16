import React, { useState, useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaSun, FaMoon } from 'react-icons/fa';
import { format } from 'date-fns';
import {useTheme} from '../../context/ThemeContext'
import clear from '../../assets/clear.png';
import humidity from '../../assets/humidity.png';
import wind from '../../assets/wind.png';
import cloud from '../../assets/cloud.png';
import drizzle from '../../assets/drizzle.png';
import rain from '../../assets/rain.png';
import snow from '../../assets/snow.png';
import './index.css';


const apiKey = '4342c3127095afd6bd08bba77294e800';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const {theme,changeTheme} = useTheme()
    const inputRef = useRef();

    const fontColur = theme ? '#b0b1b8' : '#fff'

    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow
    };

    const formatDateTime = (date) => {
        const formattedDate = format(date, 'EEEE, MMMM do, yyyy');
        const formattedTime = format(date, 'hh:mm:ss a');
        return {
            date: formattedDate,
            time: formattedTime
        };
    };
    

    const search = async (city) => {
        if (city === '') {
            alert('Enter City Name');
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;
            const { date, time } = formatDateTime(new Date());
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icons: icon,
                date: date, 
                time: time  
            });
        } catch (error) {
            setWeatherData(null);
            console.log(error);
        }
    };

    useEffect(() => {
        search('Bangalore');
    }, []);

    const toggleMode = () => {
        changeTheme()
    };

    return (
        <div className={`weather ${theme ? 'dark-mode' : 'light-mode'}`}>
            <div className="top-right">
                <button className={`mode-toggle ${theme ? 'dark-toggle-btn' : 'light-toggle-btn'}`} onClick={toggleMode}>
                    {theme ? <FaSun/>: <FaMoon/>}
                </button>
             </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter city or Zip code"
                    ref={inputRef}
                    className={`input-element ${theme ? 'dark-mode-color' : 'light-mode-color'}`}
                />
                <div className={`search-icon-container ${theme ? 'dark-mode-color' : 'light-mode-color'}`}>
                    <CiSearch
                        className={theme ? 'search-icon-dark' : 'search-icon-light'}
                        onClick={() => search(inputRef.current.value)}
                    />
                </div>
            </div>
            {weatherData && (
                <>
                    <img
                        src={weatherData.icons}
                        alt="cloudy"
                        className="sun"
                    />
                    <p className={`temperature ${theme ? 'dark-text-colour' : 'light-text-colour'}`}>{weatherData.temperature}°c</p>
                    <p className={`location ${theme ? 'dark-text-colour' : 'light-text-colour'}`}>{weatherData.location}</p>
                    <p className={`date ${theme ? 'dark-text-colour' : 'light-text-colour'}`}>{weatherData.date}</p> 
                    <p className={`time ${theme ? 'dark-text-colour' : 'light-text-colour'}`}>{weatherData.time}</p> 
                    <div className="weather-data">
                        <div className="col">
                            <img
                                src={humidity}
                                alt="humidity"
                            />
                            <div>
                                <p className={`${theme ? 'dark-text-colour' : 'light-text-colour'}`}>{weatherData.humidity} %</p>
                                <span className={`${theme ? 'dark-text-colour' : 'light-text-colour'}`}>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img
                                src={wind}
                                alt="wind"
                            />
                            <div>
                                <p className={`${theme ? 'dark-text-colour' : 'light-text-colour'}`}>{weatherData.windSpeed} Km/h</p>
                                <span className={`${theme ? 'dark-text-colour' : 'light-text-colour'}`}>Wind</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
