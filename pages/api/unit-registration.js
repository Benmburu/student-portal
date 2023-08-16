import Units from "@models/Units";
import initDB from "@lib/mongodb";
import Classes from "@models/Classes";
import User from "@models/User";
import RegisteredUnits from "@models/RegisteredUnits";

// asynchronous function to handle server-side requests to this page
export default async function handler(req, res) {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { action, email } = req.body;    
        console.log(email)

        try {
            let user = await User.findOne({ email })
            let className = user.class
            let serviceNumber = user.serviceNumber
            let studentName = user.studentName

            if (action === "get"){
                const units = await Units.find({ className })
                // console.log(units)
                res.status(200).json({ units })
            }
            else if (action === "add"){
                const { action, email, registeredUnits } = req.body;
                const units = await RegisteredUnits.create({ serviceNumber, studentName, className, registeredUnits })
                console.log(units)
                res.status(200).json({ units })
            }
            

        } catch (error) {
            // log errors
            console.log(error);
            res.status(400).json("failed")
        }
    }
  }