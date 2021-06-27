import cookie from "cookie"
import QRCode from 'qrcode'
import Wallet from "../../libs/VanityEth"
import { sha256 } from 'js-sha256';
import { MongoClient } from "mongodb";
const mongo_url_main ="MONGO_DB_URL_BURAYA";

function tokenHandler(user){
  
    const date=Date.now()
    const secretKey="secret"; 
    const longText=date.toString()+secretKey+user;
    const token=sha256(longText);
    return token; 
  
}
function ethgenerator() {

    const wallet=Wallet.getVanityWallet()
    return wallet
  }
  async function DBconnect(status,session,wallet,total_funds){
    const client = new MongoClient(mongo_url_main, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try{
      await client.connect();
      const database = client.db("ether_pay");
      const collection = database.collection("transactions");
      const filter = { wallet:wallet,session:session };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          total:total_funds,
          status:status,
        },
      };
      const result = await collection.updateOne(filter, updateDoc,options);

    }
    catch(error){
      console.log(error)
    }
    finally {
      await client.close();
    }
  }

  async function dbCreator(total,session,wallet,wallet_private,status,userid){
    const client = new MongoClient(mongo_url_main, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try{
      await client.connect();
      const database = client.db("ether_pay");
      const collection = database.collection("transactions");
      const doc = { total:total, session:session,wallet:wallet,wallet_private:wallet_private,status:status,userid:userid};
      const result = await collection.insertOne(doc);
    }
    catch(error){
      console.log(error)
    }
    finally {
      await client.close();
    }
  }

  async function cuzdanTracker(wallet,session,userid){
    let i=0;
    const timerID = setInterval(async function() {
      const request=await fetch(`https://api-ropsten.etherscan.io/api?module=account&action=balance&address=${wallet}&tag=latest&apikey=ETHER_SCAN_API_BURAYA`);
      const data= await request.json();
      console.log(data)
      i++;
      if(i>10){  
        console.log("invertal out")
        clearInterval(timerID);
        DBconnect("session_timed_out",session,wallet,data.result);
        
      }                   
      else if(data.result>100000000000000){//0.0001 ETH
        console.log("funds were deposited");
        clearInterval(timerID); 
        DBconnect("confirmed",session,wallet,data.result);
        
      }
  }, 60*1000); // 60sn de bir
   
  }
  
    
  
export default async function sessioncreation(req, res) {
        const request_data=JSON.parse(req.body);
        const token=tokenHandler(request_data.user);
        if(request_data.type==="clear-cookie"){
          res.setHeader("Set-Cookie",cookie.serialize("token","",
        {httpOnly:true,
          secure:process.env.NODE_ENV!=="development", //https
          expires:new Date(0),
          sameSite:"strict",
          path:"/",
        }))
        res.status(200).json({ type:"session cleared"})
        }
        else{
          res.setHeader("Set-Cookie",cookie.serialize("token",token,
          {httpOnly:true,
            secure:process.env.NODE_ENV!=="development", //https
            maxAge:60*60,
            sameSite:"strict",
            path:"/",
          }))
        
      
        const new_wallet=ethgenerator();
        const new_qr=await QRCode.toDataURL(new_wallet.address); // private için privKey
        res.status(200).json({ type:"new_generate",eth_adress:new_wallet.address,qr:new_qr})
        console.log(`session başlatıldı`)
          await dbCreator(0,token,new_wallet.address,new_wallet.privKey,"waiting",request_data.user);
        await cuzdanTracker(new_wallet.address,token,request_data.user);
      }
  }

  
  