import initDB from "@lib/mongodb";
import User from "@models/User";
import serviceNumbers from "@models/ServiceNumbers";

export default async function handler(req, res) {
  if (req.method === "POST"){
    initDB()
    
    const { service_number, email, password } = req.body;
    try {
      let number = await serviceNumbers.findOne({service_number});
      if (!number) {
        throw new Error("Service number does not exist")
      }else {
        userExists = await User.findOne({ email })
        if (userExists){
          throw new Error("User already exists")
        }else {
          user = User.create({ service_number, email, password })
          res.json(user)
        }
      }

    } catch (error) {
      console.log(error);
    }
  }
  }