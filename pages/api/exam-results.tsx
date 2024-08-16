import initDB from "@lib/mongodb";
import User from "@models/User";
import ExamResults from "@models/ExamResults";
import { NextApiRequest, NextApiResponse } from "next";

interface IUser{
    email: string;
    serviceNumber: string;
}

interface IResultSchema{
    unitName?: string;
    marks?: string;
    grade?: string;
} 

interface IExamResultSchema{
    serviceNumber?: string;
    studentName?: string;
    semester?: string;
    className?: string;
    results?: [IResultSchema];
  }
// asynchronous function to handle server-side requests to this page
export default async function handler( req: NextApiRequest, res: NextApiResponse ): Promise<void> {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { email } = req.body as { email: string };    
        console.log(email)

        try {
            let user = await User.findOne({ email }) as IUser;
            let serviceNumber = user.serviceNumber
            const results = await ExamResults.find({ serviceNumber }) as IExamResultSchema;

            res.status(200).json({ results })

        } catch (error) {
            // log errors
            console.error(error);
            res.status(400).json("failed")
        }
    }else{
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${req.method?.toUpperCase()} Not Allowed'`)
    }
  }