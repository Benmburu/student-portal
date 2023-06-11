import initDB from "@lib/mongodb";
import User from "@models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST"){
    // start database connection
        initDB()
        
        const { serviceNumber, password } = req.body;        

        try {
            // check if user is registered            
            const user = await User.findOne({ serviceNumber })
            if (!user){
                return res.status(400).json("Invalid email or password")
            }
            
            // check if password is correct
            const isPasswordMatched = await bcrypt.compare( password, user.password )
            if (!isPasswordMatched){
                return res.status(400).json("Invalid email or password")
            }
            
            // return response
            res.status(200).json("Login successful")

        } catch (error) {
            // log errors
            console.log(error);
        }
    }
  }