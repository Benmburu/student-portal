import ResultSchema from "@models/ExamResults";
import initDB from "@lib/mongodb";
import Classes from "@models/Classes";
import Units from "@models/Units";

// asynchronous function to handle server-side requests to this page
export default async function handler(req, res) {
    
    if (req.method === "POST"){
        // start database connection
        initDB()
        
        // get data stored in the request body
        const { action, className } = req.body;    
        console.log(action)

        try {
            if (action === "get"){
                const options = className === ""? {className: ""} : { className: className }
                const examResults = await ResultSchema.find(options)
                const units = await Units.find(options)

                const classes = await Classes.find({})
                console.log(units)
                res.status(200).json({ examResults, classes, units })
            }
            else if(action === "delete"){
                const { action, serviceNumber, studentName, semester } = req.body                
                const examResults = await ResultSchema.deleteOne({ serviceNumber, semester })
                
                res.status(200).json("deleted")
            } 
            else if(action === 'add'){
                const { action, serviceNumber, studentName, semester, className, results } = req.body
                // console.log(action, unitCode, unitName )
                const examResults = await ResultSchema.find({ serviceNumber, semester })
                console.log(examResults)
                if (examResults.length > 0){
                    const examResults = await ResultSchema.findOneAndUpdate({ serviceNumber, semester }, { studentName, className, results }, { new: true })
                }else{
                    const examResults = await ResultSchema.create({ serviceNumber, studentName, semester, className, results , new: true })
                }
                res.status(200).json("added")
            }
            
            

        } catch (error) {
            // log errors
            console.log(error);
            res.status(400).json("failed")
        }
    }
  }