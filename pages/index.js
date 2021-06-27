import Head from 'next/head'
import Image from 'next/image'
import {useEffect,useState} from "react"
import Countdown from 'react-countdown';
export default function Home() {
  const [time_left,setTime_left]=useState("1:00:00");

  useEffect(()=>{
    if(!localStorage.getItem("time")){
      localStorage.setItem("time",Date.now()+10000)
      
    }
  
    setTime_left(<Countdown date={parseInt(localStorage.getItem("time")) + 60000*60} />)
  },[])
  return (
    
  <>
  <div className="d-flex justify-content-center align-items-center main">
  <div className="card container">
    <div className="card-body d-flex justify-content-center">
    <Image src="/logo.png" width="310" height="78"></Image>
    </div>
 
  </div>
  </div>
  </>
  )
}
