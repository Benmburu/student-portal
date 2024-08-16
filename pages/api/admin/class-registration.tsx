import Class from "@models/Classes";
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
                const classes = await Class.find({}) as IClass[];
                // console.log(classes)
                res.status(200).json(classes)
            }
            else if(action === "delete"){
                const { code } = req.body; 
                
                await Class.deleteOne({course_code: code})
                // console.log(user)                
                res.status(200).json("deleted")
            }
            else if(action === 'add'){
                const {school, course_code, course_name} = req.body

                const classes = await Class.find({ course_code }) as IClass[];

                if (classes.length > 0){
                    await Class.findOneAndUpdate({ course_code }, { school, course_name}, { new: true })
                }else{
                    await Class.create({ course_code, school, course_name, new: true })
                }

                // console.log(classes)
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