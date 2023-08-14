import ResultSchema from "@models/ExamResults";
import initDB from "@lib/mongodb";
import Classes from "@models/Classes";

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
                const results = await ResultSchema.find(options)

                const classes = await Classes.find({})
                console.log(classes)
                res.status(200).json({ results, classes })
            }
            else if(action === "delete"){
                const { action, serviceNumber, studentName, semester } = req.body                
                const results = await ResultSchema.deleteOne({ serviceNumber, semester })
                
                res.status(200).json("deleted")
            } 
            else if(action === 'add'){
                const { action, serviceNumber, studentName, semester, className, unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8 } = req.body
                // console.log(action, unitCode, unitName )
                const results = await ResultSchema.find({ serviceNumber, semester })
                console.log(results)
                if (results.length > 0){
                    const results = await ResultSchema.findOneAndUpdate({ serviceNumber, semester }, { studentName, className, unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8 }, { new: true })
                }else{
                    const results = await ResultSchema.create({ serviceNumber, studentName, semester, className, unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8  , new: true })
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