import { useEffect } from "react"

export default function CheckBox({item,filterByNames,setFilterByNames,backup,setFlightsInfo,flightsInfo}) {
  useEffect(() => {
    filterByNames.length === 0 ? setFlightsInfo(backup) : setFlightsInfo(backup.filter((item)=> filterByNames.some((value)=>item.flight.carrier.caption.includes(value)) ))
    // eslint-disable-next-line
  }, [filterByNames])
  
  const handleChange = (e) => {
    e.target.checked ? setFilterByNames(oldArray => [...oldArray,e.target.value]) : setFilterByNames( filterByNames.filter((item) => !item.includes(e.target.value)) )
  }
  return(
    <div style={{marginTop:"5px",fontSize:"18px",paddingLeft:"20px"}}>
      <input type={"checkbox"} id={item} value={item} onChange={handleChange} style={{marginRight:'5px'}}/>
      <label htmlFor={item}>{item}</label>
    </div>
  )
}