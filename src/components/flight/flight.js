import './flight.css'
export default function Flight({flight}){
  const numberToMonth = ['янв','февр','марта','апр','мая','июня','июля','авг','сент','окт','нояб','дек']

  const departure0 = flight.legs[0].segments[0]
  const arrival0 = flight.legs[0].segments
  const arrival0Lenght = flight.legs[0].segments.length

  const departure1 = flight.legs[1].segments[0]
  const arrival1 = flight.legs[1].segments
  const arrival1Lenght = flight.legs[1].segments.length
  
  return (
    <div className="flight">
    {/*---------------------------УДОБНЕЕ БУДЕТ ОРИЕНТИРОВАТЬСЯ ПО КОММЕНТАРИЯМ---------------------------*/}
      <div className="flight_header">
        <span className="flight_header_caption">{flight.carrier.caption}</span>
        <div className='flight_header_price' style={{paddingRight:"20px"}}>
          <span style={{fontSize:"20px"}}>{flight.price.total.amount} ₽</span>
          <span>Стоимость для одного взрослого пассажира</span>
        </div>
        
      </div>



      {/*--------------------------------------ПЕРЕЛЕТ В ОДНУ СТОРОНУ--------------------------------------*/}
      <div className='flight_position' style={{borderBottom:"2px solid blue"}}>
        {/*------------------------Город и аэропорт прилета/вылета------------------------*/}
          <p className='flight_position_title'>
            {departure0.departureCity.caption}, {departure0.departureAirport.caption}({departure0.departureAirport.uid}) -> 

            ({arrival0[0].arrivalAirport.uid}) {(arrival0Lenght === 2 && arrival0[1].arrivalCity !== undefined) ? arrival0[1].arrivalCity.caption : arrival0[0].arrivalCity.caption}, {arrival0Lenght === 2 ? arrival0[1].arrivalAirport.caption : arrival0[0].arrivalAirport.caption}</p>
          <div className='flight_position_time'> 
        {/*------------------------Дата и время вылета------------------------*/}
          <p>{departure0.departureDate.slice(11,16)} <span style={{color:"blue",fontSize:"17px"}}>{parseInt(departure0.departureDate.slice(8,10))}{numberToMonth[parseInt(departure0.departureDate.slice(5,7)) - 1]}</span></p>
        {/*------------------------Время перелета------------------------*/}
          <p> 
          <svg xmlns="http://www.w3.org/2000/svg" style={{width:"17px",height:"17px",marginRight:"2px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {Math.floor(flight.legs[0].duration/60)}ч {flight.legs[0].duration%60}минут</p>
        {/*------------------------Дата и время прилета------------------------*/}
          <p>{arrival0Lenght === 2 ? arrival0[1].arrivalDate.slice(11,16) : arrival0[0].arrivalDate.slice(11,16)} <span style={{color:"blue",fontSize:"17px"}}>{parseInt(arrival0.slice(-1)[0].arrivalDate.slice(8,10))}{numberToMonth[parseInt(arrival0.slice(-1)[0].arrivalDate.slice(5,7)) - 1]}</span></p>
        </div>
        {/*------------------------Количество пересадок------------------------*/}
        <span className={`flight_position_stop ${arrival0Lenght < 2 && "withoutContent"}`}>{arrival0Lenght === 2 ? `${arrival0Lenght - 1} пересадка` : (arrival0Lenght >= 3 ? `${arrival0Lenght - 1} пересадки` : "")} </span>

        <span>Рейс выполняет: {flight.carrier.caption}</span>
      </div>



      {/*--------------------------------------ПЕРЕЛЕТ В ДРУГУЮ СТОРОНУ--------------------------------------*/}
      <div className='flight_position'>
        {/*------------------------Город и аэропорт прилета/вылета------------------------*/}
          <p className='flight_position_title'>{(departure1.departureCity !== undefined) && departure1.departureCity.caption}, {departure1.departureAirport.caption}({departure1.departureAirport.uid}) -> ({arrival1[0].arrivalAirport.uid}) {arrival1Lenght === 2 ? arrival1[1].arrivalCity.caption : arrival1[0].arrivalCity.caption}, {arrival1Lenght === 2 ? arrival1[1].arrivalAirport.caption : arrival1[0].arrivalAirport.caption}</p>
          <div className='flight_position_time'> 
        {/*------------------------Дата и время вылета------------------------*/}
            <p>{departure1.departureDate.slice(11,16)} <span style={{color:"blue",fontSize:"17px"}}>{parseInt(departure1.departureDate.slice(8,10))}{numberToMonth[parseInt(departure1.departureDate.slice(5,7)) - 1]}</span></p>
        {/*------------------------Время перелета------------------------*/}
            <p> 
              <svg xmlns="http://www.w3.org/2000/svg" style={{width:"17px",height:"17px",marginRight:"2px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {Math.floor(flight.legs[1].duration/60)}ч {flight.legs[1].duration%60}минут
            </p>
        {/*------------------------Дата и время прилета------------------------*/}
            <p>{arrival1Lenght === 2 ? arrival1[1].arrivalDate.slice(11,16) : arrival1[0].arrivalDate.slice(11,16)} <span style={{color:"blue",fontSize:"17px"}}>{parseInt(arrival1.slice(-1)[0].arrivalDate.slice(8,10))}{numberToMonth[parseInt(arrival1.slice(-1)[0].arrivalDate.slice(5,7)) - 1]}</span></p>
          </div>
        {/*------------------------Количество пересадок------------------------*/}
          <span className={`flight_position_stop ${arrival1Lenght < 2 && "withoutContent"}`}>{arrival1Lenght === 2 ? `${arrival1Lenght - 1} пересадка` : (arrival1Lenght >= 3 ? `${arrival1Lenght - 1} пересадки` : "")}</span>

          <span>Рейс выполняет: {flight.carrier.caption}</span>
      </div>
      
     
      <button className="button-5">Выбрать</button>
    </div>
  )
}