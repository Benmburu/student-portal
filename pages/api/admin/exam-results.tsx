import ResultSchema from "@models/ExamResults";
import initDB from "@lib/mongodb";
import Classes from "@models/Classes";
import Units from "@models/Units";
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

interface IResultSchema{
    unitName: string;
    marks: string;
    grade: string;
} 

interface IExamResultSchema{
    serviceNumber: string;
    studentName: string;
    semester: string;
    className: string;
    results: [IResultSchema];
}
// asynchronous function to handle server-side requests to this page
export default async function handler( req: NextApiRequest, res: NextApiResponse ): Promise<void> {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { action, className } = req.body;    
        console.log(action)
        console.log('className',className)

        try {
            if (action === "get"){
                const options = className === ""? {className: ""} : { className: className }
                const examResults = await ResultSchema.find(options).lean() as IExamResultSchema[];
                const units = await Units.find(options).lean() as IUnit[];

                const classes = await Classes.find({}).lean() as IClass[];
                console.log('examResults', examResults)
                res.status(200).json({ examResults, classes, units })
            }
            else if(action === "delete"){
                const { action, serviceNumber, studentName, semester } = req.body                
                await ResultSchema.deleteOne({ serviceNumber, semester })
                
                res.status(200).json("deleted")
            } 
            else if(action === 'add'){
                const { action, serviceNumber, studentName, semester, className, results } = req.body
                // console.log(action, unitCode, unitName )
                const examResults = await ResultSchema.find({ serviceNumber, semester }).lean() as IExamResultSchema[];
                // console.log(examResults)
                
                if (examResults.length > 0){
                    await ResultSchema.findOneAndUpdate({ serviceNumber, semester }, { studentName, className, results }, { new: true })
                }else{
                    await ResultSchema.create({ serviceNumber, studentName, semester, className, results })
                }
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