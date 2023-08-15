import Units from "@models/Units";
import initDB from "@lib/mongodb";
import Classes from "@models/Classes";
import User from "@models/User";

// asynchronous function to handle server-side requests to this page
export default async function handler(req, res) {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { email } = req.body;    
        console.log(email)

        try {
            // const options = className === ""? {semester: ""} : { semester: semester }
            let user = await User.findOne({ email })
            let className = user.class
            const units = await Units.find({ className })

            console.log(units)
            res.status(200).json({ units })

        } catch (error) {
            // log errors
            console.log(error);
            res.status(400).json("failed")
        }
    }
  }