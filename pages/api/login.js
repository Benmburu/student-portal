import initDB from "@lib/mongodb";
import User from "@models/User";
import bcrypt from "bcryptjs";
import transporter from "@lib/nodemailer";

// asynchronous function to handle server-side requests to this page
export default async function handler(req, res) {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { serviceNumber, password } = req.body;        

        try {
            // check if user is registered            
            const user = await User.findOne({ serviceNumber })
            if (!user){
                return res.status(401).json("Invalid email or password")
            }
            
            // check if password is correct
            const isPasswordMatched = await bcrypt.compare( password, user.password )
            if (!isPasswordMatched){
                return res.status(401).json("Invalid email or password")
            }

            if (!user.confirmed){
                return res.status(401).json("Please verify email.")
            }else{
                // send client-side response that login details are okay
                res.status(200).json("Login successful")

                // generate verification code
                const verificationCode = Math.floor(1000 + Math.random() * 9000)

                // save verification code in the database
                const user = await User.findOneAndUpdate(
                    {serviceNumber: serviceNumber},
                    {verificationCode: verificationCode},
                    {new: true},
                    )

                // send email containing the verification code
                // change this function if you want to send the verification code through text instead
                transporter.sendMail({
                    to: email,
                    from: "noreply@gmail.com", //gmail, by default, uses the senders email address as the senders so this field is unchangeable
                    subject: "Verification code",
                    html: `Your verification code is:<br><strong>${verificationCode}</strong> <br>Please do not share it with anyone.`
                }) 
            }

        } catch (error) {
            // log errors
            console.log(error);
        }
    }
  }