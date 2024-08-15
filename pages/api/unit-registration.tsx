import Units from "@models/Units";
import initDB from "@lib/mongodb";
import Classes from "@models/Classes";
import User from "@models/User";
import RegisteredUnits from "@models/RegisteredUnits";
import { NextApiRequest, NextApiResponse } from "next";

interface IUser{
    email: string;
    class: string;
    serviceNumber: string;
    studentName: string;
}

interface IRegisteredUnits{
    serviceNumber: string;
    studentName: string;
    className: string;
    registeredUnits: string[];
}
// asynchronous function to handle server-side requests to this page
export default async function handler( req: NextApiRequest, res: NextApiResponse ): Promise<void> {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { action, email } = req.body;    
        console.log(email)

        try {
            let user = await User.findOne({ email }) as IUser;
            let className = user.class
            let serviceNumber = user.serviceNumber
            let studentName = user.studentName

            if (action === "get"){
                const units = await Units.find({ className }) as IRegisteredUnits[];
                // console.log(units)
                res.status(200).json({ units })
            }
            else if (action === "add"){
                const { action, email, registeredUnits } = req.body;
                const units = await RegisteredUnits.create({ serviceNumber, studentName, className, registeredUnits }) as IRegisteredUnits[];
                console.log(units)
                res.status(200).json({ units })
            }
            

        } catch (error) {
            // log errors
            console.log(error);
            res.status(400).json("Failed.")
        }
    }else{
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method?.toUpperCase()} Not Allowed.`)
    }
  }