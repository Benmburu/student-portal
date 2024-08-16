import Units from "@models/Units";
import initDB from "@lib/mongodb";
import Classes from "@models/Classes";
import { NextApiRequest, NextApiResponse } from "next";

interface IUnit{
    unitCode: string;
    unitName: string;
    className: string;
    semester: string;
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
                const options = className === ""? {className: ""} : { className: className }
                const units = await Units.find(options).lean() as IUnit;

                const classes = await Classes.find({}).lean() as IClass;
                console.log(classes)
                res.status(200).json({ units, classes })
            }
            else if(action === "delete"){
                const { action, unitCode, semester } = req.body                
                const units = await Units.deleteOne({ unitCode, semester })
                
                res.status(200).json("deleted")
            } 
            else if(action === 'add'){
                const { action, unitCode, unitName, className, semester } = req.body
                // console.log(action, unitCode, unitName )
                const units = await Units.find({ unitCode }).lean() as IUnit; //Used .lean() on Mongoose queries for better performance when you don't need the full Mongoose document.
                if (units){
                    await Units.findOneAndUpdate({ unitCode }, {semester, unitName, className }, { new: true });
                }else{
                    await Units.create({ unitCode, unitName, className, semester  , new: true });
                }
                // const Units = await Courses.create({ course_code, school, course_name, upsert: true, new: true, setDefaultsOnInsert: true })
                console.log(units)
                res.status(200).json("added")
            }else{
                throw new Error("Invalid Action")
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