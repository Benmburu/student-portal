import User from "@models/User";
import initDB from "@lib/mongodb";

// asynchronous function to handle server-side requests to this page
export default async function handler(req, res) {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { action } = req.body;    
        console.log(action)

        try {
            if (action === "get"){
                const user = await User.find({})
                // const user = await Courses.create({ school, course_code, courseName })
                console.log(user)
                res.status(200).json(user)
            }
            else if(action === "delete"){
                const {action, serviceNumber, name, email} = req.body                
                const user = await User.deleteOne({ serviceNumber })
                
                res.status(200).json("deleted")
            }
            else if(action === 'add'){
                const {action, serviceNumber, name, email} = req.body
                const user = await User.find({ serviceNumber })
                if (user.length > 0){
                    const user = await User.findOneAndUpdate({ serviceNumber }, { name, email }, { new: true })
                }else{
                    const user = await User.create({ serviceNumber, name, email , new: true })
                }
                // const user = await Courses.create({ course_code, school, course_name, upsert: true, new: true, setDefaultsOnInsert: true })
                console.log(user)
                res.status(200).json("added")
            }
            
            

        } catch (error) {
            // log errors
            console.log(error);
            res.status(400).json("failed")
        }
    }
  }


// import ServiceNumbers from "@models/ServiceNumbers";
// import initDB from "@lib/mongodb";

// export default async function handler(req, res){
//     if (req.method === 'POST'){
//         const { serviceNumber } = req.body
//         initDB()
//         // const list = ServiceNumbers.replace(/ /g,'')
//         console.log(serviceNumber)
//         let user = await ServiceNumbers.find({ serviceNumber })
//         console.log(user.length)
//         if (user.length > 0){
//             res.status(401).json("Student already exists.")
//         }else{
//             user = await ServiceNumbers.create({serviceNumber: serviceNumber})
//             res.status(200).json('Success')
//         }
        
        
//         // const user = await User.findOne({ email })
//         // const user = await User.findOne({ email })
//         // console.log(user)
        
//     }
// }