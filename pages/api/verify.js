import User from "@models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res){
    if (req.method === 'POST'){
        const { token } = req.body
        // verify jwt email token
        jwt.verify(token, process.env.EMAIL_SECRET, async (err, decoded)=>{
            if (!err){
                // update confirmed field in user status to true when verification is successful
                const user = await User.findOneAndUpdate(
                    {email: decoded.email},
                    {confirmed: true},
                    {new: true},
                    )
                
                res.status(200).json("Successfully verified.")
            }else{
                res.status(401).json("Not verified.")
            }
        })
    }
}