import ClassSchema from "@models/Classes";
import initDB from "@lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

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
        const { action } = req.body;    
        console.log(action)

        try {
            if (action === "get"){
                const classes = await ClassSchema.find({}) as IClass[];

                // console.log(classes)
                res.status(200).json(classes)
            }
            else if(action === "delete"){
                const { className } = req.body; 
                
                await ClassSchema.deleteOne({ className })
                
                res.status(200).json("deleted")
            }
            else if(action === 'add'){
                const { className, school, courseCode, course } = req.body

                const classes = await ClassSchema.findOne({ className }) as IClass[];

                if (classes.length > 0){
                    await ClassSchema.findOneAndUpdate({ className }, { school, courseCode, course}, { new: true })
                }else{
                    await ClassSchema.create({ className, school, courseCode, course, new: true })
                }

                // console.log(classes)
                res.status(200).json("added")
            } 
            else{
                throw new Error("Invalid Action.");
                
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