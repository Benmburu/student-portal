import User from "@models/User";
import initDB from "@lib/mongodb";
import Classes from "@models/Classes";
import { NextApiRequest, NextApiResponse } from "next";

interface IUser{
    serviceNumber: string;
    name: string;
    email: string;
    className: string;
}

interface IClass{
    className: string;
    course: string;
    courseCode: string;
    school: string
}
// asynchronous function to handle server-side requests to this page
export default async function handler( req: NextApiRequest, res: NextApiResponse ): Promise<void> {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { action, className } = req.body;    
        console.log(action)

        try {
            if (action === "get"){
                const options = className === ""? {} : { className: className }
                const students = await User.find(options)

                const classes = await Classes.find({}).lean() as IClass;
                console.log(students)
                res.status(200).json({ students, classes })
            }
            else if(action === "delete"){
                const { action, serviceNumber, name, email, className } = req.body                
                await User.deleteOne({ serviceNumber })
                
                res.status(200).json("deleted")
            } 
            else if(action === 'add'){
                const {action, serviceNumber, name, email, className} = req.body
                console.log(action, serviceNumber, name, email, className)
                const user = await User.findOne({ serviceNumber }).lean() as IUser;//Used .lean() on Mongoose queries for better performance when you don't need the full Mongoose document.
                if (user){
                    await User.findOneAndUpdate({ serviceNumber }, { name, email, className: className }, { new: true })
                }else{
                    await User.create({ serviceNumber, name, email, className , new: true })
                }
                
                // const user = await Courses.create({ course_code, school, course_name, upsert: true, new: true, setDefaultsOnInsert: true })
                console.log(user)
                res.status(200).json("added")
            }else{
                throw new Error("Invalid Action");
                
            }
            
            

        } catch (error) {
            // log errors
            console.error(error);
            res.status(400).json("failed")
        }
    }else{
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed.`)
    }
  }