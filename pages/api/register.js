import initDB from "@lib/mongodb";
import User from "@models/User";
import serviceNumbers from "@models/ServiceNumbers";

initDB()
// export default async function handler(req, resp){
//     try{
//         const client = await initDB;
//         const db = client.db("student_details");

//         const student_details = await db
//             .collection("reg_number")
//             .find({})
//             .sort({metacritic: -1})
//             .limit(10)
//             .toArray();

//         resp.json(student_details)
//     } catch(e) {
//         console.error(e);
//     }
// }

export default async function handler(req, res) {
  
    try {
      let numbers = await serviceNumbers.find({});
      if (numbers) {
        return res.json(numbers)
      }

    } catch (error) {
      console.log(error);
    }
  }