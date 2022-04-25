import { useEffect, useState } from 'react'
import CheckBox from './checkBox'
import './radioButton.css'
export default function FilterMenu({companyNames,flightsInfo,setFlightsInfo,backup}){
  const [filterByNames,setFilterByNames] = useState([]) //фильтрация по названию компании
  const [startPrice,setStartPrice] = useState(0)  //начальная цена
  const [endPrice,setEndPrice] = useState(10000000) //конечная цена 
  const newFlights = [...flightsInfo] //копия массива с информацией о полетах(без него не работает sort,пробовал все методы)

  //Сортировка по цене 
  const handlePriceSort =(value)=>{
    if(value==="По возрастанию"){
      setFlightsInfo(newFlights.sort((a,b)=>a.flight.price.total.amount - b.flight.price.total.amount))
    }
    if(value==="По убыванию"){
      setFlightsInfo(newFlights.sort((a,b)=>b.flight.price.total.amount - a.flight.price.total.amount))
    }
    if(value==="По времени в пути"){
      setFlightsInfo(newFlights.sort((a,b)=>(a.flight.legs[0].duration + a.flight.legs[1].duration) - (b.flight.legs[0].duration + b.flight.legs[1].duration)))
    }
  }
  
  //Фильтрация по пересадкам 
  const handleFilterSort = (value) => {
    if(value==="Сбросить фильтры"){
      setFlightsInfo(backup)
    }
    if(value==="1 пересадка"){
      filterByNames.length > 0 ? setFlightsInfo(backup.filter((item)=> filterByNames.some((value)=>item.flight.carrier.caption.includes(value))).filter((flight)=> flight.flight.legs[0].segments.length >=2 || flight.flight.legs[1].segments.length >=2)) : setFlightsInfo(backup.filter((flight)=> flight.flight.legs[0].segments.length >=2 || flight.flight.legs[1].segments.length >=2))
    }
    if(value==="Без пересадок"){
      filterByNames.length > 0 ? setFlightsInfo(backup.filter((item)=> filterByNames.some((value)=>item.flight.carrier.caption.includes(value))).filter((flight)=> flight.flight.legs[0].segments.length < 2 && flight.flight.legs[1].segments.length < 2)) : setFlightsInfo(backup.filter((flight)=> flight.flight.legs[0].segments.length < 2 && flight.flight.legs[1].segments.length < 2))
      
    }
  }
  
  //Фильтрация по цене(от и до)
  useEffect(() => {
    setFlightsInfo(backup.filter((flight)=> flight.flight.price.total.amount >= startPrice && flight.flight.price.total.amount <= endPrice))
    // eslint-disable-next-line
  }, [startPrice,endPrice])

  //Управление состоянием input'ов начальной и конечной цены
  const handlePriceRange = (e) => {
    if(e.target.id === "startPrice" & e.target.validity.valid){
      setStartPrice(Number(e.target.value))
    }
    if(e.target.id === "endPrice" & e.target.validity.valid){
      setEndPrice(Number(e.target.value))
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
        <label className="rad-label" onClick={()=>handlePriceSort("По убыванию")}>
          <input type="radio" className="rad-input" name="rad"/>
          <div className="rad-design"></div>
          <div className="rad-text">По убыванию цены</div>
        </label>
        <label className="rad-label" onClick={()=>handlePriceSort("По времени в пути")}>
          <input type="radio" className="rad-input" name="rad"/>
          <div className="rad-design"></div>
          <div className="rad-text">По времени в пути</div>
        </label>
      </div>
      <div>
        <h3>Фильтровать</h3>
        <label className="rad-label" onClick={()=>handleFilterSort("1 пересадка")}>
          <input type="radio" className="rad-input" name="rad1"/>
          <div className="rad-design square"></div>
          <div className="rad-text">1 пересадка</div>
        </label>
        <label className="rad-label" onClick={()=>handleFilterSort("Без пересадок")}>
          <input type="radio" className="rad-input" name="rad1"/>
          <div className="rad-design square"></div>
          <div className="rad-text">Без пересадок</div>
        </label>
        <label className="rad-label" onClick={()=>handleFilterSort("Сбросить фильтры")}>
          <input type="radio" className="rad-input" name="rad1"/>
          <div className="rad-design square"></div>
          <div className="rad-text">Сбросить фильтры</div>
        </label>
      </div>
      <div>
        <h3>Цена</h3>
        <label className='rad-label price'>От <input type="text" className="price_input" placeholder='0' pattern="[0-9]*" id="startPrice" value={startPrice} onChange={handlePriceRange}/></label>
        <label className='rad-label price'>До <input type="text" className="price_input" placeholder='10000000' pattern="[0-9]*" id="endPrice" value={endPrice} onChange={handlePriceRange}/></label>
      </div>
      <div>
        <h3>Авиакомпании</h3>
        {Array.from(companyNames).map(item=> <CheckBox key={item} item={item} filterByNames={filterByNames} setFilterByNames={setFilterByNames} backup={backup} setFlightsInfo={setFlightsInfo} flightsInfo={flightsInfo}/>)}
      </div>
    </div>
  )
}