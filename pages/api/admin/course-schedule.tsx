import CourseScheduleSchema from "@models/CourseSchedule";
import initDB from "@lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface ICourseSchedule{
    activity: string;
    startDate: string;
    endDate: string
  }
// asynchronous function to handle server-side requests to this page
export default async function handler( req: NextApiRequest, res: NextApiResponse ): Promise<void> {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { action } = req.body;    
        console.log(action)

        try {
            if (action === "get"){
                const courseSchedules = await CourseScheduleSchema.find({}) as ICourseSchedule[];

                // console.log(user)
                res.status(200).json(courseSchedules)
            }
            else if(action === "delete"){
                const { action, activity, startDate, endDate  } = req.body; 
                
                await CourseScheduleSchema.deleteOne({activity: activity})
                // console.log(user)
                res.status(200).json("deleted")
            }
            else if(action === 'add'){
                const { action, activity, startDate, endDate } = req.body

                const courseSchedules = await CourseScheduleSchema.findOne({ activity }) as ICourseSchedule[];

                if (courseSchedules.length > 0){
                    await CourseScheduleSchema.findOneAndUpdate({ activity }, { startDate, endDate }, { new: true })
                }else{
                    await CourseScheduleSchema.create({ activity, startDate, endDate, new: true })
                }

                res.status(200).json("added")
            }else{
                throw new Error("Invalid Action.");
                
            }
        }catch (error) {
            // log errors
            console.error(error);
            res.status(400).json("failed")
        }
    }else{
        res.setHeader("Allow", ["POST"])
    }
  }