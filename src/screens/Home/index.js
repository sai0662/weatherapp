import React, { useState, useEffect } from "react";
import './home.css';

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const apiKeyId = "d885aa1d783fd13a55050afeef620fcb";

const languageMetrics = "&lang=PT&units=metric";

const Home = () => {

    const [cityName, setCityName] = useState("Hyderabad");

    const [weatherData, setWeatherData] = useState([]);

    const [searchValue, setSearchValue] = useState("");

    const [weatherList, setWeatherList] = useState([]);

    const [favouritesList, setFavouritesList] = useState([]);

    const changeHandler = (e) => {
        setSearchValue(e.target.value);
    }

    const fetchData = async (cityName) => {
        const tempetatureData = await fetch(baseUrl + cityName + '&appid=' + apiKeyId + '&' + languageMetrics).then(res => res.json());
        setWeatherData(tempetatureData);
        if (tempetatureData.cod === 200) {
            setCityName(tempetatureData.name);
            const weatherInfo = {
                cityName: tempetatureData.name,
                temp: tempetatureData.main.temp
            }
            setWeatherList([...weatherList, weatherInfo]);
        } else {
            setWeatherData({});
        }
    };

    useEffect(() => {
        fetchData(cityName);
    }, []);

    const onSearchWeatherInfo = (e) => {
        e.preventDefault();
        const isCityNameExists = weatherList.find((item) => item.cityName.toLowerCase() === searchValue.toLowerCase());
        if (isCityNameExists) {
            alert("City name already exists");
            return;
        }
        fetchData(searchValue);
    }

    const onAddFavorite = (weather) => {
        setFavouritesList([...favouritesList, weather]);
    }

    const onRemoveFavorite = (weather) => {
        setFavouritesList(favouritesList.filter((item) => item.cityName !== weather.cityName));
    }

    const showWeatherInfo = () => {
        if (weatherData.cod === 200) {
            return (
                <div style={{display: 'flex'}}>
                <div>
                    <h1 className="cityName">{cityName}</h1>
                    <h1 className="cityName">{Math.round(weatherData?.main?.temp || 0)}°C</h1>
                </div>
                <div className="imageIcon">
                <img src={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`} alt="weather icon" />
                </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>City name not found</h1>
                </div>
            )
        }
    }

    const renderFavoriteList = () => {
        return (
            <div>
                <h1>Favourites list</h1>
                {favouritesList.length === 0 && <p>No favourites added</p>}
                <ul className="allHisList">
                    {favouritesList.map((weather, index) => {
                        const { cityName, temp } = weather;
                        return (
                            <li className="singleFavList" key={index}>{cityName} {Math.round(temp || 0)} C <button className="favButton" onClick={() => onRemoveFavorite(weather)}>Remove from favourites</button></li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    const renderHistoryList = () => {
        return (
            <div>
                <h1>Search History</h1>
                <ul className="allHisList">

                    {weatherList.map((weather, index) => {
                        const { cityName, temp } = weather;
                        const isFacvouriteExists = favouritesList.find((item) => item.cityName === cityName);
                        return (
                            <li className="singleList" key={index}>{cityName} {Math.round(temp || 0)} C <button className="favButton" disabled={isFacvouriteExists} onClick={() => onAddFavorite(weather)}>Add to Favouites</button></li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <div style={{backgroundColor: "white", width: '100%', height: 500, flexDirection: 'row', display: "flex", marginLeft: 120}}>
            <div style={{backgroundColor: "aliceblue", width: '40%', height: 500, marginTop: 80}}>
                        <form onSubmit={onSearchWeatherInfo} className="form">
                             <input type="text" name="city" placeholder="Search for cities" onChange={changeHandler} className="search"/><br /><br />
                             <button type="submit">Search</button>
                         </form>
                         <div>
                            {
                                showWeatherInfo()
                            }
                         </div>
                         <div>
                         {renderHistoryList()}
                         </div>
            </div>
            <div style={{backgroundColor: "aliceblue", width: '40%', height: 500, marginTop: 80, marginLeft: 50}}>
                    {renderFavoriteList()}
            </div>
        </div>
    )
}

export default Home;
