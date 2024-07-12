import CourseSchedule from "@models/CourseSchedule";
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
                const user = await CourseSchedule.find({})
                // const user = await CourseSchedule.create({ school, course_code, courseName })
                console.log(user)
                res.status(200).json(user)
            }
            else if(action === "delete"){
                const { action, activity, startDate, endDate  } = req.body; 
                
                const user = await CourseSchedule.deleteOne({activity: activity})
                console.log(user)
                res.status(200).json("deleted")
            }
            else if(action === 'add'){
                const { action, activity, startDate, endDate } = req.body

                const user = await CourseSchedule.find({ activity })

                if (user.length > 0){
                    const user = await CourseSchedule.findOneAndUpdate({ activity }, { startDate, endDate }, { new: true })
                }else{
                    const user = await CourseSchedule.create({ activity, startDate, endDate, new: true })
                }

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