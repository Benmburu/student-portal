import Admin from "@models/Admin";
import jwt from "jsonwebtoken";
import transporter from "@lib/nodemailer";
import initDB from "@lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface IAdmin{
    serviceNumber: string;
    email: string;
    password: string;
    verificationCode: number;
    name: string;
    role: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse ): Promise<void> {
    if (req.method === 'POST'){
        const { email } = req.body
        initDB()
        
        const user = await Admin.findOne({ email }) as IAdmin;
        console.log(user)
        // send jwt email token for password reset
        if (user){        
            
            const emailToken = jwt.sign({ email: user.email }, process.env.EMAIL_SECRET as string, {
                expiresIn: "1d",
            })

            // create the url to be sent via email
            const url = `http://localhost:3000/admin/forgot_password/verify/${emailToken}`
            transporter.sendMail({
                to: email,
                from: "ndukdeftec@gmail.com",
                subject: "Confirm email",
                html: `Please click on this <a href=${url}>link</a> to reset your password.`
            })  

            // give response to the client-side
            res.status(200).json("Click on the link sent to your email to reset your password.")
        }else{
            res.status(401).json("Admin not found.")
        }
    }else{
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method?.toUpperCase()} Not Allowed`)
    }
}