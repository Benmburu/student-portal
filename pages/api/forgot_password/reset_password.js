import initDB from "@lib/mongodb";
import User from "@models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// asynchronous function to handle server-side requests to this page
export default async function handler(req, res) {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { token, password } = req.body;        

        jwt.verify(token, process.env.EMAIL_SECRET, async (err, decoded)=>{
            if (!err){
                // update password when verification of the token is successful
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                try {
                    const user = await User.findOneAndUpdate(
                        {email: decoded.email},
                        {password: hashedPassword},
                        {new: true},
                        )
                    // console.log(user)
                    res.status(200).json("Password changed successfully. You'll be redirected to the login page.")
                } catch (error) {
                    res.status(401).json("Password reset link expired.")
                }
                
            }else{
                res.status(401).json("Password reset link expired.")
            }
        })
    }
  }