import initDB from "@lib/mongodb";
import User from "@models/User";
import bcrypt from "@models/bcrypt.js";

export default async function handler(req, res) {
  if (req.method === "POST"){
        initDB()
        
        const { service_number, password } = req.body;

        try {            
            const user = await User.findOne({ email })
            if (!user){
                throw new Error("Invalid email or password")
            }
                
            const isPasswordMatched = await bcrypt.compare( password, user.password )
            if (!isPasswordMatched){
                throw new Error("Invalid email or password")
            }
            
            return user

        } catch (error) {
            console.log(error);
        }
    }
  }