import initDB from "@lib/mongodb";
import User from "@models/User";
import serviceNumbers from "@models/ServiceNumbers";
import jwt from "jsonwebtoken";
import transporter from "@lib/nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST"){
        // start database connection
        initDB()
        
        const { serviceNumber, name, email, password } = req.body;

        try {
            // check if student exists
            const serviceNumberExists = await serviceNumbers.findOne({ serviceNumber });

            if (!serviceNumberExists) {
                res.status(401).json("Service Number does not exist")

            }else {
                // check is student is already registered
                let userExists = await User.findOne({ serviceNumber })

                if (userExists){
                    res.status(401).json("User already registered")

                }else {
                    // register student only if they're unregistered
                    const user = await User.create({ serviceNumber, name, email, password })

                    // sign the jwt email token using the EMAIL_SECRET
                    const emailToken = jwt.sign({ email: user.email }, process.env.EMAIL_SECRET, {
                        expiresIn: "1d",
                    })

                    // create the url to be sent via email
                    const url = `http://localhost:3000/verify/${emailToken}`
                    transporter.sendMail({
                        to: "bennjuguna0@gmail.com",
                        from: "akirajin01@gmail.com",
                        subject: "Confirm email",
                        html: `Please click on this <a href=${url}>link</a> to verify your account.`
                    })  

                    // give response to the client-side
                    res.status(200).json("User created successfuly. Click on the link sent to your email to verify your account.")
                }
            }

        } catch (error) {
            // log any errors
            console.log(error);
        }
    }
  }