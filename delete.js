const dbConnect = require('./zeel');

const deleteData= async ()=>{
    let data = await dbConnect.dbConnect();
    let result = await data.deleteMany(
    
    {
    name: 'i phone 15',
    }
    
    )
    console.warn(result);
    if(result.acknowledged)
    {
        console.log("record deleted");
    }
}
deleteData();