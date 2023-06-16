import './App.css';
import { useState,useEffect } from "react";
const api={
  base: "https://api.openweathermap.org/data/2.5/weather",
  key: "731b9b9ff8dcb78778763e4c4396acbd"
}
function App() {
  
  return (
    <div className="App">
          <Weather/>
    </div>
  );
}
function tempToRGBA(temp){
  //0->15->30->40
  //white->blue->yellow->red
  temp = temp -273.15;
  temp = (temp>40 ? 40 : temp<0? 0 : temp);
  let bgRed,bgGreen,bgBlue;
  bgRed= temp>=30? 255 : temp>=15? (temp-15)*255/15 : 255-temp*255/15;
  bgGreen= temp>=30? 255-(temp-30)*255/10 : 255;
  bgBlue= temp>=30? 0: temp>=15? 255-(temp-15)*255/15 : 255;
  return `rgba(${bgRed},${bgGreen},${bgBlue},1)`
}

function Weather(){
  const [weatherInfo,weatherInfoState] = useState(null);
  // const [cityInput,cityInputState] = useState('');
  const [citySearch,citySearchState] = useState('');
  const [renderCF,renderCFState] = useState(true);
  useEffect(() => {
    if (citySearch==="") return;
    weatherInfoState("loading")
    const fetchByCityName = async () => {
      console.log("Run fetch");
      try{
        const response = await fetch(`${api.base}?q=${citySearch}&lang=vi&appid=${api.key}`);
        const result = await response.json();
        weatherInfoState(result);
        // console.log(result);
      }
      catch(error){
        return("error");
      }
    }
    fetchByCityName();
  }, [citySearch]);
  // useEffect(() => {
  //   document.body.style.background = weatherInfo===null? tempToRGBA(0):tempToRGBA(40);
  // }, [weatherInfo]);
  let cityInput;
  //if(citySearch!=="") cityInput=citySearch;
  return(
  <div className="weatherContainer">
    <h1>Thời tiết hiện tại</h1>
    <SearchCity/>
    <CelsiusFahrenheit/>
    <RenderWeather info={weatherInfo} corf={renderCF}/>
  </div>
  );

  //=========== Function for Child components

  function CelsiusFahrenheit(){
    return (<div className="smallInfo">
      <input type="checkbox" defaultChecked={renderCF} onChange={()=>renderCFState(!renderCF)}/>℃
      <input type="checkbox" defaultChecked={!renderCF} onChange={()=>renderCFState(!renderCF)}/>℉
      </div>);
  }

  function SearchCity({info}){
    
    function searchCityName(){
      
      citySearchState(cityInput);
    }
    return (
      <div className="SearchCityContainer">
        <div className="addItem">
          <input id="searchInput" className="searchInput blur" value={cityInput} onChange={(event)=>cityInput=(event.target.value)} placeholder='Tên thành phố'/>                 
          <div className="listItemButtons">
            <button onClick={searchCityName}>Tìm</button>
          </div>
        </div>
      </div>
    );
  }

  function RenderWeather({info, corf}){
    if(info===null)
      return (<div className="listContainer"><h2>Hãy nhập tên thành phố mà bạn muốn biết thời tiết hiện tại.</h2></div>)
    else if(info==="loading")
      return (<div className="listContainer"><h2>Đang lấy dữ liệu</h2></div>)
    else if(info ==="error")
      return (<div className="listContainer"><h2>Đã có lỗi xẩy ra, hãy kiểm tra kết nối internet của bạn!</h2></div>)
    else {
      let code = info.cod;
      if(code===200){
        let description = info.weather[0].description;
        let humidity = weatherInfo.main.humidity;
        let temperature=corf? info.main.temp-273.15 : 9*(info.main.temp-273.15)/5+32;
        let tempColor = tempToRGBA(info.main.temp);
        let cityName = weatherInfo.name;
        document.body.style.background = info===null? tempToRGBA(0):tempColor;
        return (
          <div className="infoContainer">
            <div className='infoName'>{cityName}</div>
            <div className='infoDetailContainer'>
              <div className='smallInfo'>{description}</div>
              <div className="tempShow">{parseFloat(temperature.toFixed(1))}{corf?"°C":"°F"}</div>
              <div className='smallInfo'>Độ ẩm: {humidity}%</div>
            </div>
          </div>
        )
      } else{
        return(<div className="listContainer"><h2>Bạn đã nhập sai tên thành phố. Nhập lại nhé!</h2></div>);
      }
    }
  }
}
export default App;
