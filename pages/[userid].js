import Head from 'next/head'
import Image from 'next/image'
import {useEffect,useState} from "react"
import Countdown from 'react-countdown';
export async function getServerSideProps(context){
	const urlId= context.params.userid ; 
	const req= context.req;
	const res = context.res; 

     
        return {
            props:{
                token:req.cookies.token||"",
                urlid:urlId,
                }
           }

}
export default function UserID(props) {
  const spinner = <div class="spinner-border text-primary m-3" role="status"></div>
  const [loading,SetLoading]=useState(false);
  const [wallet_adress,set_wallet_adress]=useState("");
    const [time_left,setTime_left]=useState("");
    const [Proptoken,setProptoken]=useState("");
    const [barcode,Setbarcode]=useState("");
    const [status,SetStatus]=useState("waiting");
  useEffect(()=>{
    if(!localStorage.getItem("time")){
      localStorage.setItem("time",Date.now()+10000)
      
    }
  
    setTime_left(<Countdown date={parseInt(localStorage.getItem("time")) + 60000*60} />)
  },[])
  const statusChecker=async()=>{
    const timerID = setInterval(async function() {
        const request = await fetch("/api/status-checker",{
          method:"POST",
          body:JSON.stringify({user:props.urlid,wallet:localStorage.getItem("eth_adress")})
        });
        const data=await request.json();

      if(data.status==="confirmed"){
        clearInterval(timerID);
        SetStatus("confirmed");
        const request = await fetch("/api/session-creation",{
          method:"POST",
          body:JSON.stringify({type:"clear-cookie"})
        });
        const data=await request.json();
        localStorage.clear();
      }
      else if (data.status==="session_timed_out"){
        clearInterval(timerID);
        SetStatus("timed_out");
        localStorage.clear();
      }
    },60*1000);
  }

  useEffect(async()=>{
      if(!props.token){
        localStorage.clear();
        SetLoading(true);
        const wallet_request=await fetch("/api/session-creation",{
            method:"POST",
            body:JSON.stringify({user:props.urlid})
        });
        
        const wallet_request_data=await wallet_request.json();
        set_wallet_adress(wallet_request_data.eth_adress)
        localStorage.setItem("eth_adress",wallet_request_data.eth_adress)
        localStorage.setItem("barcode",wallet_request_data.qr)
        SetLoading(false);
      }
      Setbarcode(localStorage.getItem("barcode"));
     set_wallet_adress(localStorage.getItem("eth_adress"));
      setProptoken(props.token);

     statusChecker();
  },[])
  return (
    
  <>
  <div className="d-flex justify-content-center align-items-center main">
  <div className="card container">
    <div className="card-body d-flex justify-content-center">
  <div className="card w-25">
    <div className="card">
    <div className="card-body">
    <Image src="/logo.png" width="310" height="78"></Image>
     </div>
    </div>
    <div className="card">
    <div className="card-body d-flex justify-content-center align-items-center">
   {!loading?<>{barcode&&<Image src={barcode} width="300px" height="300px"/>}</>:<div class="card d-flex flex-column justify-content-center align-items-center"><p>{spinner}</p><span className="m-3 text-center"><b> Ödeme işlemi başlatılıyor lütfen bekleyiniz...</b></span></div>}
     </div>
    </div>
  </div>
  <div className="card w-75">
   <div className="card-body">
     
     
     <div className="alert alert-primary d-flex flex-column align-items-center" role="alert">
         <p><b>Kullanıcı : {props.urlid}</b></p>
   <p className="text-center">Lütfen ödeme yapmak istediğiniz tutarı aşağıdaki adrese gönderin.İlgili birim yaptığınız ödeme tutarınca kredilendirecektir.<b>Ethereum ağı ile gönderdiğinizden emin olun.</b></p>
    <b className="text-center text-danger">BSC desteklenmez!</b>
   <p className="text-danger"> <b>Minimum transfer 0.0002 ETH</b> dir. Bu tutarın altındaki transferler sistem tarafından algılanmaz.</p>
<div className="input-group mb-3 w-75">
  <span className="input-group-text" id="basic-addon1"> <Image src="/ethereum.svg" width="20" height="20"></Image><b></b></span>
  <input type="text" className="form-control" value={wallet_adress} aria-label="Username" aria-describedby="basic-addon1"/>
  
</div>
{status!=="confirmed"&&<div class="alert alert-warning" role="alert"><b>{time_left}</b></div>}
{status==="confirmed"&&<><div className="alert alert-success d-flex justify-content-center align-items-center" role="alert"><Image src="/checked.svg" width="50px" height="50px"/><span className="p-3">Ödeme işlemi onaylandı.Pencereyi kapatabilirsiniz.</span></div></>}
{status==="timed_out"&&<><div className="alert alert-warning" role="alert">Ödeme işleminin süresi doldu!</div></>}
{status!=="confirmed"&&<><div className="spinner-border" role="status"></div><span >Ödeme Bekleniyor...</span></>}
{Proptoken&&`Kurtarılan session: ${Proptoken}`}<br/>
<p>Aktif Ethereum Network : <b>Ropsten Test Ağı</b></p>
      </div>
    
   </div>
  </div>
    </div>
  </div>
  </div>
  
  </>
  )
}
