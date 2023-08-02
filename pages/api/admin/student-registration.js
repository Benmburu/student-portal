import ServiceNumbers from "@models/ServiceNumbers";
import initDB from "@lib/mongodb";

export default async function handler(req, res){
    if (req.method === 'POST'){
        const { serviceNumber } = req.body
        initDB()
        // const list = ServiceNumbers.replace(/ /g,'')
        console.log(serviceNumber)
        let user = await ServiceNumbers.find({ serviceNumber })
        console.log(user)
        if (user.length > 0){
            res.status(401).json("Student already exists.")
        }
        user = await ServiceNumbers.create({serviceNumber: serviceNumber})
        
        // const user = await User.findOne({ email })
        // const user = await User.findOne({ email })
        // console.log(user)
        res.status(200).json('nice')
    }
}