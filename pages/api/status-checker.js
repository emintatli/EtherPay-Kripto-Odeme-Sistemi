import { MongoClient } from "mongodb";

const mongo_url_main ="mongodb+srv://autorun12:satellitea10@cluster0.1dybm.mongodb.net";

export default async function sessioncreation(req, res) {
    const request_data=JSON.parse(req.body);
    const client = new MongoClient(mongo_url_main, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      try {
        await client.connect();
        
    const database = client.db("ether_pay");
    const collection = database.collection("transactions");
    const query = {userid:request_data.user,wallet:request_data.wallet};
    const found = await collection.findOne(query);
    console.log(request_data.user)
    console.log(request_data.wallet)
    console.log(found)
  res.status(200).json({status:found.status});
      }
    catch(error){
        console.log(error);
        res.status(500).json({status:"server error"});
    }
    finally {
        await client.close();
    }
      }
    
