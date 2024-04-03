

const dbConnect =require("./zeel")

// const insert = async()=>{
//     const db=await dbConnect.dbConnect();
//     const result =await db.insert(
//     {name:'note 5',price:15999,company:'mobile'}
//   )
//   console.log(result);
// }
// insert();

const main = async ()=>{
    let data = await dbConnect.dbConnect();
    data = await data.find().toArray();
    console.warn(data);
}
main()