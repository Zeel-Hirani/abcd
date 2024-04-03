const dbConnect = require('./zeel')

const updatedata= async()=>{
  let data = await dbConnect.dbConnect();
  let result = await data.updateOne(
    { price:"10000"},{
        $set: { price: "29999"}
    }
    );
  console.warn(result);
}

updatedata();