import initDB from "@lib/mongodb";
import Admin from "@models/Admin";
import bcrypt from "bcryptjs";
import transporter from "@lib/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

interface IUser{
    serviceNumber: string;
    password: string;
    email: string;
    verificationCode: string;
    confirmed: boolean;
}

// asynchronous function to handle server-side requests to this page
export default async function handler( req: NextApiRequest, res: NextApiResponse ): Promise<void> {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { serviceNumber, password } = req.body;    

        try {
            // check if user is registered            
            let user = await Admin.findOne({ serviceNumber }) as IUser;
            // console.log(user)

            if (!user){
                return res.status(401).json("Invalid email or password")
            }
            
            // check if password is correct
            const isPasswordMatched = await bcrypt.compare( password, user.password )
            if (!isPasswordMatched){
                return res.status(401).json("Invalid email or password")
            }

            // send client-side response that login details are okay
            res.status(200).json("Login successful")

            // generate verification code
            const verificationCode = Math.floor(1000 + Math.random() * 9000).toString()

            // save verification code in the database
            user = await Admin.findOneAndUpdate(
                {serviceNumber: serviceNumber},
                {verificationCode: verificationCode},
                {new: true},
                ) as IUser;

            // send email containing the verification code
            // change this function if you want to send the verification code through text instead
            console.error(user.email)
            transporter.sendMail({
                to: user.email,
                from: "noreply@gmail.com", //gmail, by default, uses the senders email address as the senders so this field is unchangeable
                subject: "Verification code",
                html: `Your verification code is:<br><strong>${verificationCode}</strong> <br>Please do not share it with anyone.`
            }) 


        } catch (error) {
            // log errors
            console.log(error);
        }
    }else{
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method?.toUpperCase()} Not Allowed`)
    }
  }