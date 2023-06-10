import initDB from "@lib/mongodb";
import User from "@models/User";
import serviceNumbers from "@models/ServiceNumbers";

export default async function handler(req, res) {
  if (req.method === "POST"){
        // console.log(req.body)
        initDB()
        
        const { serviceNumber, name, email, password } = req.body;
        console.log(req.body)

        try {
            const serviceNumberExists = await serviceNumbers.findOne({ serviceNumber });
            console.log(serviceNumberExists)
            if (!serviceNumberExists) {
                // throw new Error("Service number does not exist")
                // const serviceNumberExists = await serviceNumbers.create({serviceNumber})
                // console.log(serviceNumberExists)
                return res.status(404).json("service number does not exist")
                
                // pass

            }else {
                let userExists = await User.findOne({ email })
                // console.log(userExists)

                if (userExists){
                    // throw new Error("User already exists")
                    res.status(400).json("User already exists")

                }else {
                    const user = await User.create({ serviceNumber, name, email, password })
                    // console.log(user)
                    res.status(201).json("User created  successfuly")
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
  }