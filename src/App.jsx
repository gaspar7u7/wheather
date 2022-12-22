import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'

function App() {
 
  const [ weither, setWeither ] = useState( {} )
  const [ isCelcius, setIsCelcius ] = useState(true)
  const [isUnit, setIsUnit] = useState(true)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    
    axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=1f6dd4ded06112b48b0a855fd2c46d8e` )
    .then( res => setWeither(res.data) )
    }

  },[])

  console.log( weither )

  const tempCelcius = (weither.main?.temp) - 273.15
const trunc = Math.trunc(tempCelcius)
const tempFarenheit = trunc* 9/5 +32
  const truncFarenheit = Math.trunc(tempFarenheit)

  const changeCelcius = () => {
    setIsCelcius(!isCelcius)
    setIsUnit(!isUnit)
  }

  return (
    <div className="App">
     <h1> Wheather App</h1>
     <h4> Cuidad { weither.name }, { weither.sys?.country } </h4>
   <div className="weither">
   <img src= { `http://openweathermap.org/img/wn/${weither.weather?.[0].icon}@2x.png` } alt="" />
   <div>
    <h4> " {weither.weather?.[0].main} " </h4>
     <div><b> Wind speed: </b> { weither.wind?.speed } m/s</div>
    <div> <b> Humidity: </b> { weither.main?.humidity } % </div>
     <div><b> Pressure: </b> { weither.main?.pressure } mb </div>
   </div>
   </div>
   <div> { isCelcius? trunc: truncFarenheit} {isUnit?  '°C'  :  '°F' } </div>
   <button onClick={changeCelcius}>  Change to °F/°C </button>
    </div>
      
  )
}

export default App
