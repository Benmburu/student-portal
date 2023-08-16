import Class from "@models/Classes";
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
                const user = await Class.find({})
                // const user = await Class.create({ school, course_code, courseName })
                console.log(user)
                res.status(200).json(user)
            }
            else if(action === "delete"){
                const { action, className, school, courseCode, course } = req.body; 
                
                const user = await Class.deleteOne({ className })
                console.log(user)
                // const user = await Class.create({ 
                //     course_code: "1234",
                //     school: dict
                //  })
                res.status(200).json("deleted")
            }
            else if(action === 'add'){
                const { action, className, school, courseCode, course } = req.body
                // console.log(course_number, school, code, course_name)
                const user = await Class.find({ className })
                // console.log(user.length)
                if (user.length > 0){
                    const user = await Class.findOneAndUpdate({ className }, { school, courseCode, course}, { new: true })
                }else{
                    const user = await Class.create({ className, school, courseCode, course, new: true })
                }
                // const user = await Class.create({ course_code, school, course_name, upsert: true, new: true, setDefaultsOnInsert: true })
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