import User from "@models/User";
import jwt from "jsonwebtoken";
import transporter from "@lib/nodemailer";

export default async function handler(req, res){
    if (req.method === 'POST'){
        const { email } = req.body
        
        // const user = await User.findOne({ email })
        const user = await User.findOne({ email })
        console.log(user)
        // send jwt email token for password reset
        if (user){        
            
            const emailToken = jwt.sign({ email: user.email }, process.env.EMAIL_SECRET, {
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
            res.status(401).json("User not found.")
        }
    }
}