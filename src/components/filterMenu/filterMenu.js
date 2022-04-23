import { useState } from 'react'
import './radioButton.css'
export default function FilterMenu({companyNames,flightsInfo,setFlightsInfo}){
  //flightsInfo.map(flight=> console.log(flight.flight.price.total.amount))
  const [prices,setPrices] = useState("")
  
  const handlePriceSort =(value)=>{
    if(value=="По возрастанию"){
      console.log("aboba")
      setFlightsInfo(flightsInfo.sort((a,b)=>a.flight.price.total.amount - b.flight.price.total.amount))
    }
  }
  return(
    <div>
      <div>
        <h3>Сортировать</h3>
        <label className="rad-label" onClick={()=>handlePriceSort("По возрастанию")}>
          <input type="radio" className="rad-input" name="rad"/>
          <div className="rad-design"></div>
          <div className="rad-text">По возрастанию цены</div>
        </label>
        <label className="rad-label">
          <input type="radio" className="rad-input" name="rad"/>
          <div className="rad-design"></div>
          <div className="rad-text">По убыванию цены</div>
        </label>
        <label className="rad-label">
          <input type="radio" className="rad-input" name="rad"/>
          <div className="rad-design"></div>
          <div className="rad-text">По времени в пути</div>
        </label>
      </div>
      <div>
        <h3>Фильтровать</h3>
        <label className="rad-label">
          <input type="radio" className="rad-input" name="rad"/>
          <div className="rad-design square"></div>
          <div className="rad-text">1 пересадка</div>
        </label>
        <label className="rad-label">
          <input type="radio" className="rad-input" name="rad"/>
          <div className="rad-design square"></div>
          <div className="rad-text">Без пересадок</div>
        </label>
      </div>
      <div>
        <h3>Цена</h3>
        <label className='rad-label price'>От <input type="text" className="price_input" placeholder='0'/></label>
        <label className='rad-label price'>До <input type="text" className="price_input" placeholder='10000000'/></label>
      </div>
      <div>
        <h3>Авиакомпании</h3>
        {Array.from(companyNames).map(item=> <p key={item}>{item}</p>)}
      </div>
    </div>
  )
}