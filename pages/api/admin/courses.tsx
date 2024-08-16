import Courses from "@models/Courses";
import initDB from "@lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";


interface ICourses{
    course_code: string;
    school: string;
    course_name: string;
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
                const courses = await Courses.find({}) as ICourses[];
                // console.log(courses)
                res.status(200).json(courses)
            }
            else if(action === "delete"){
                const { action, course_code, school, course_name } = req.body;                 
                await Courses.deleteOne({ course_code })

                res.status(200).json("deleted")
            }
            else if(action === 'add'){
                const {action, school, course_code, course_name} = req.body

                const user = await Courses.findOne({ course_code }) as ICourses[];

                if (user.length > 0){
                    await Courses.findOneAndUpdate({ course_code }, { school, course_name}, { new: true })
                }else{
                    await Courses.create({ course_code, school, course_name, new: true })
                }

                console.log(user)
                res.status(200).json("added")
            }
            
            

        } catch (error) {
            // log errors
            console.error(error);
            res.status(400).json("failed")
        }
    }else{
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method?.toUpperCase()} Not Allowed.`)
    }
  }