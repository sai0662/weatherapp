import { useEffect, useState } from "react";
import './home.css'

const favCitys = [
  {
    id: 1,
    city: 'Delhi',
    temp: "29°C",
  },
  {
    id: 2,
    city: 'Tirupati',
    temp: "29°C",
  },
  {
    id: 3,
    city: 'Mumbai',
    temp: "30°C",
  }
]

function Home() {
  const [cityTemp, setCityTemp] = useState('hyderabad');

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityTemp}&appid=d885aa1d783fd13a55050afeef620fcb`)
    .then(res => res.json())
    .then(response => {
      const kelvin = response.main.temp;
      const celsius = kelvin - 273.15;
      setCityTemp("Temperature at "+cityTemp+" "+Math.round(celsius)+"°C");
    })
  }, [])

  return (
    <div>
      <h1>{cityTemp}</h1>
      <div className="fav-header">
        <h1>Favorite Locations</h1>
      </div>
      <div className="list">
        {
          favCitys.map((item,index) => (
            <div className="list-view"> 
              <h1>{item.city} {item.temp}</h1>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Home;