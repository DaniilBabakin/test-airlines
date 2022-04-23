import { useEffect, useState } from 'react'
import FilterMenu from '../components/filterMenu/filterMenu'
import Flight from '../components/flight/flight'
import Header from '../components/header/header'
import data from '../flights.json'
import './main.css'
export default function Main(){
  const [flightsInfo,setFlightsInfo] = useState(data.result.flights.slice(0,29)) //отфильтрованные перелеты
  useEffect(() => {
    console.log(flightsInfo)
  }, [flightsInfo])
  
  let names = []
  data.result.flights.slice(0,29).filter(item=> names.push(item.flight.carrier.caption))
  return(
    <div style={{background:"#f0f1f5"}}>
      <Header/>
      <div className='container'>
        <FilterMenu companyNames={new Set(names)} flightsInfo={flightsInfo} setFlightsInfo={setFlightsInfo}/>
        <div style={{display:"flex",flexDirection:"column"}}>
        {flightsInfo.map(item=> <Flight key={item.flightToken} flight={item.flight}/>)}
        </div>
      </div>
    </div>
  )
}