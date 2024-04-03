const dbConnect = require('./zeel')

const insert = async ()=>{
    const db = await dbConnect.dbConnect();
    const result = await db.insertMany(
     [
        { name:'note 50',company:'vivo',price:"11111"},
          {name:'note 60',company:'oppo',price:"11100"},
          {name:'note 70',company:'oppo',price:"10001"}
     ]
    );
    console.warn(result);
    if(result.acknowledged)
    {
        console.log("Data inserted")
    }
}
insert()