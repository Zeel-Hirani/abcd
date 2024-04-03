

// const dbConnect= require('./mongodb')

// dbConnect().then((resp) => {
//         resp.find({}).toArray().then((data) => {
//         console.warn(data)
//     })

// })
// console.warn(dbConnect());

//const main =async ()=>{
//    let data = await dbConnect();
//   data =await data.find().toArray();
//    console.warn(data);
//}

//main();
// console.warn(dbConnect());
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const database = 'shop'
const client = new MongoClient(url);

async function dbConnect() 
{
    let result = await client.connect();
    db = result.db(database);
    return db.collection('mobile');
}

module.exports={dbConnect};


// const main = async ()=>{
//     let data = await dbConnect();
//     data = await data.find({}).toArray();
//     console.warn(data);
// }
// main()

// const insert = async()=>{
//     const db=await dbConnect();
//     const result =await db.insert(
//  [
//     {name:'note 5',price:15999,company:'mobile'}

//  ]
//   )
// if(result.acknowledged)
// {
//     console.log("Data inserted");
// }
// }
// insert();
