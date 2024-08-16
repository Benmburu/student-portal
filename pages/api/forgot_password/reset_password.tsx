import initDB from "@lib/mongodb";
import User from "@models/User";
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError, VerifyErrors } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";

interface DecodedToken{
    email: string;
    confirmed: boolean;
}

interface IUser{
    email: string;
    class: string;
    serviceNumber: string;
    studentName: string;
}
// asynchronous function to handle server-side requests to this page
export default async function handler( req: NextApiRequest, res: NextApiResponse ): Promise<void> {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { token, password } = req.body;  
        try{
            const decoded: DecodedToken = jwt.verify(token, process.env.EMAIL_SECRET as string) as DecodedToken;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            try {
                const user = await User.findOneAndUpdate(
                    {email: decoded.email},
                    {password: hashedPassword},
                    {new: true},
                    ) as IUser;
                // console.log(user)

                if (user) {
                    res.status(200).json("Password changed successfully. You'll be redirected to the login page.");
                } else {
                    res.status(404).json("User not found.");
                }

            }catch (error) {
                res.status(401).json("Password reset link expired.")
            }
        }
        catch(err: unknown){
            if (err instanceof JsonWebTokenError || err instanceof NotBeforeError|| err instanceof TokenExpiredError){
                res.status(401).json("Not verified.")
            }
            else{
                console.error("Error verifying token:", err);
                res.status(500).json("Internal server error.");
            }
        }
    }
  }