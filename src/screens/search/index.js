import React, { useState, useEffect} from "react";
import './search.css';


const Search = () => {
    const [city, setCity] = useState("");
    const [result, setResult] = useState("");
    const [cityTemp, setCityTemp] = useState('Hyderabad');
    const [fav, setFav] = useState([]);

    const changeHandler = (e) => {
        setCity(e.target.value);
    }

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityTemp}&appid=d885aa1d783fd13a55050afeef620fcb`)
        .then(res => res.json())
        .then(response => {
          const kelvin = response.main.temp;
          const celsius = kelvin - 273.15;
          setCityTemp(""+cityTemp+" "+Math.round(celsius)+"°C");
        })
      }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`)
        .then(res => res.json())
        .then(data => {
            const kelvin = data.main.temp;
            const celsius = kelvin - 273.15;
            setResult("Temperature at "+city+"\n"+Math.round(celsius)+"°C");
            console.log(result);
            setCity("");
        }).catch(error => console.log(error))
    }

    const favList = () => {
            setFav([...fav, {result}]);
            console.log(fav);
    }

    const deleteFavList = (result) => {
        let temp = fav.filter((e) => e.result !== result);
        setFav(temp);
    }
return(
    <div>
        <center>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">weather app</h4>
                    <h1>{cityTemp}</h1>
                    <form onSubmit={submitHandler}>
                        <input type="text" name="city" onChange={changeHandler} value={city}/><br/><br/>
                        <input type="submit" value="Get Temperature" />
                    </form><br/><br/>
                    <h1>{result}</h1> 
                    <button onClick={favList}>Add to favourites</button>
                </div>
                {/* {
                    fav.map((items,index) => (
                        <h1>{items.name} {Math.round(items.main.temp - 273.15)+"°C"}</h1>
                    ))
                } */}
                <div>
                    <h1>Favouites list</h1>
                {
                    fav.map((item, index) => (
                        <div className="fav-list">
                        <h1>{item.result}</h1>
                        <button onClick={() => deleteFavList(item.result)}>del</button>
                        </div>

                    ))
                }
                </div>
            </div>
        </center>
    </div>
)
}

export default Search;