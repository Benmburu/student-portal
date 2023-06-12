import initDB from "@lib/mongodb";
import User from "@models/User";
import serviceNumbers from "@models/ServiceNumbers";

export default async function handler(req, res) {
  if (req.method === "POST"){
        // start database connection
        initDB()
        
        const { serviceNumber, name, email, password } = req.body;
        // console.log(req.body)

        try {
            // check if student exists
            const serviceNumberExists = await serviceNumbers.findOne({ serviceNumber });
            // console.log(serviceNumberExists)

            if (!serviceNumberExists) {
                res.status(404).json("Service Number does not exist")

            }else {
                // check is student is already registered
                let userExists = await User.findOne({ serviceNumber })

                if (userExists){
                    res.status(400).json("User already registered")

                }else {
                    // register student only if they're unregistered
                    const user = await User.create({ serviceNumber, name, email, password })
                    res.status(200).json("User created  successfuly")
                }
            }

        } catch (error) {
            // log any errors
            console.log(error);
        }
    }
  }