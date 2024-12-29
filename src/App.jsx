import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import React from 'react-dom';
import AOS from 'aos';
import '../node_modules/aos/dist/aos.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEnvelopeOpen } from '@fortawesome/free-regular-svg-icons';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { faSearch } from '@fortawesome/free-solid-svg-icons';


import clearIcond from './assets/icons/sun.png';
import clearIconn from './assets/icons/Moon.png';
import rainIcond from './assets/icons/rainD.png';
import rainIconn from './assets/icons/rainn.png';
import snowIcon from './assets/icons/snowD.png';
import cloudIcond from './assets/icons/broken_cloudsD.png';
import cloudIconn from './assets/icons/FewcloudsN.png';
import drizzleIcon from './assets/icons/ShowerrainD.png';
import misticon from './assets/icons/MistD.png';

import rainback from './assets/backgif/rainback2.gif';
// import snowback from './assets/img/sunnybackground.jpg';
import snowback from './assets/backgif/snowback.gif';
import snowbacknight from './assets/backgif/snowbacknight.gif';
import cloudyback from './assets/backgif/cloudyback1.gif';
import drizzleback from './assets/backgif/drizzleback.gif';
import  sunnyback from './assets/backgif/sunnyback.gif';
import nightback from './assets/backgif/nightclear.gif';






import humidyicon from './assets/img/humidity2.png'
import windicon2 from './assets/img/wind.png';


import './App.css';


export const WeatherDeatiles = ({icon,temp,city,country,lat,log,humidy,wind,main,days}) =>{
  return(
    <>
    <div className="output pb-4">
    <div className="location fs-4 mt-1">City:{city}</div> <div className="location fs-4 mt-1">{days}</div>
  <div className="image">
    <img className='icon-part' data-aos='fade-up'  data-aos-duration='1000' src={icon} alt="sunny"  width='40%'/>
    <div className="main fs-3" >{main}</div>
  </div>
  
 
  <div className="temp fs-2" >{temp} °C </div>
 
  {/* <div className="country fs-5">Country:{country}</div> */}
  <div className=" mt-3 d-flex justify-content-center gap-5 ">
    <span className="lat d-flex fs-5">Lattidude <br />{lat}</span>
  
    <spam className="log fs-5">Longitude <br />{log}</spam>
  </div>
  <div className="data-container   d-flex">
    <div className="element me-5 ">
    <span className="">Humidity</span> <br />
    <img src={humidyicon} alt="" className='hum-img' width='50%'/><div className="humidy-percentage   fs-6">{humidy}:%</div>
    </div>

    <div className="element ms-5 ">
    <span className="">Wind</span> <br />
    <img src={ windicon2} alt=""  className=" hum-img" width='50%'/>
    <div className="humidy-percentage  fs-6"> {wind}:K/H</div>
    </div>

  </div>
  </div>
  </>
  )
};










function App() {

useEffect(()=>{
  AOS.init();
})



 
  let api_key = "2c5ad959b1fae8eb19d22ca369ffac7a";
  const [icon, setICon] = useState(clearIcond);
  const [main,setMain] = useState("---")
  const [temp,setTemp] = useState(0);
  const [city,setCity] = useState("---");
  const [country,setCountry] = useState("---");
  const [lat,setLat] = useState(0);
  const [log,setLog] = useState(0);
  const [humidy,setHumdy] = useState(0);
  const [wind,setWind] = useState(0);
  const [text,setText] = useState('');
  const [cityNotFound,setCityNotFound] = useState(false);
  const [loading,setLoading] = useState(false);
  const [background,setBback] = useState(sunnyback);
  const [textcolor, setColor] = useState();
  const [days,setDay] = useState();
  
  const weatherIconMap = {
    "01d":clearIcond,
    "01n":clearIconn,
    "02d":cloudIcond,
    "02n":cloudIconn,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04n":cloudIconn,
    "04d":cloudIcond,
    "09d":rainIcond,
    "09n":rainIconn,
    "10d":rainIcond,
    "10n":rainIconn,
    "13d":snowIcon,
    "13n":snowIcon,
    "50d":misticon,
    "50n":misticon,
    '11d':rainIcond,
    '11n':rainIconn,

  }

  const weatherbackground = {
    "01d": sunnyback,
    "01n": nightback,
    "02d":cloudyback,
    "02n":cloudyback,
    "03d":drizzleback,
    "03n":drizzleback,
    "04n":cloudyback,
    "04d":cloudyback,
    "50d":cloudyback,
    "50n":cloudyback,
    "09d":rainback,
    "09n":rainback,
    "10n":rainback,
    "10d":rainback,
    "13d":snowback,
    "13n":snowbacknight,
    "11d":rainback,
    "11n":rainback,
  }
  const ftextcolor = {
    "01d": "black",
    "01n":"white",
    "02d":"white",
    "02n":"white",
    "03d":"black",
    "03n":"black",
    "04n":"white",
    "04d":"white",
    "50d":"white",
    "50n":"white",
    "09d":"white",
    "09n":"white",
    "10n":"white",
    "10d":"white",
    "13d":"black",
    "13n":"black",
    "11d":"white",
    "11n":"white",
  }

  const day ={
    "01d":"day",
    "02d":"day",
    "03d":"day",
    "04d":"day",
    "50d":"day",
    "09d":"day",
    "10d":"day",
    "13d":"day",
    "11d":"day",
  
  
    "01n":"night",
    "02n":"night",
    "03n":"night",
    "04n":"night",
    "50n":"night",
    "09n":"night",
    "10n":"night",
    "13n":"night",
    "11n":"night",
  }




const Search = async() =>{
   
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
    let res = await fetch(url);
    let data = await res.json();

    if(data.cod === "404"){


      console.log("city not found")
      alert(' City not Found')


      setCityNotFound(true);
      setLoading(false);
      return(data);
    }else{
 
      setText('')
    conf()

    console.log(data)

   

    setTemp(data.main.temp)
    setCountry(data.sys.country)
    setLat(data.coord.lat)
    setLog(data.coord.lon)
    setHumdy(data.main.humidity)
    setCity(data.name)
    setWind(data.wind.speed)
    setMain(data.weather[0].main)

    // const  weatherIconcode = data.weather[0].icon;
    // setICon(weatherIconcode || clearIcon);

    const weatherIconCode = data.weather[0].icon; // e.g., "01d", "02n"

    const mappedIcon = weatherIconMap[weatherIconCode] || clearIcon; // Fallback to clearIcon
    setICon(mappedIcon);

    const mappedback =  weatherbackground[weatherIconCode] || sunnyback ;
    setBback(mappedback);

    const fontcol = ftextcolor[weatherIconCode] || black ;
    setColor(fontcol)

    const wday = day[weatherIconCode] || day ;
    setDay(wday);

    }


    }catch(error){
      console.log('An error occured:'); 
    }finally{
      setLoading(false)
      
    }

    

  }


  const confettiBtn = (data) =>{
   
    if(text.trim()===""){
      console.log('Enter the city name')
            alert('Enter the City Name')
           

    }
    else{
      Search()

  
    
    }
   
    
  
 
  }

  const conf = () =>{
    confetti({
      particleCount:200,
      spread:500,
    })
  }

 

  const conficheck = (data) =>{
    if(data.cod == '400'){
      console.log('enter the valid name')
      alert('Enter the valid Name')
    }else{
      confettiBtn()
    }
  }
 
  const handleKeyDown = (e) =>{
    if(e.key === 'Enter'){

      if(text.trim()===''){
        console.log('Enter the City Name 2') 
        alert('Enter the City Name')
      }else{
        console.log('l;dcmlkwmc')
        Search();
     
      }

    }


    
  }


  return (
    <>

  <div className="main-body"  style={{backgroundImage:`url(${background})`}}>
    <div className="card-body"  >
      <div className="card mt-2" style={{color:textcolor}}>
        <h1 className='mt-2'>Weather App</h1>

        <hr />

        <div className="input-part">
          <input type="text" className='text-center text-dark' name="" id=""  onChange={(e)=> setText(e.target.value)}  value={text}  onKeyDown={handleKeyDown}/>
          <button className='w-button'  onClick={ conficheck}  ><FontAwesomeIcon className=' text-dark'   icon={faSearch}/></button> 
        </div>
        {/* <h1>{city}</h1> */}
        <div className="weather-icon-part">
           {/* <img src={sunny} alt="" /> */}
           <WeatherDeatiles days={days} icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidy={humidy} wind={wind} main={main} />
        
        </div>
      </div>
      </div>
      </div>

    </>
  )
}

export default App;



