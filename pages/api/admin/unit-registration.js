import Units from "@models/Units";
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
                const units = await Units.find(options)

                const classes = await Classes.find({})
                console.log(classes)
                res.status(200).json({ units, classes })
            }
            else if(action === "delete"){
                const { action, unitCode, unitName } = req.body                
                const units = await Units.deleteOne({ unitCode })
                
                res.status(200).json("deleted")
            } 
            else if(action === 'add'){
                const { action, unitCode, unitName, className } = req.body
                // console.log(action, unitCode, unitName )
                const units = await Units.find({ unitCode })
                if (units.length > 0){
                    const units = await Units.findOneAndUpdate({ unitCode }, { unitName, className }, { new: true })
                }else{
                    const units = await Units.create({ unitCode, unitName, className  , new: true })
                }
                // const Units = await Courses.create({ course_code, school, course_name, upsert: true, new: true, setDefaultsOnInsert: true })
                console.log(units)
                res.status(200).json("added")
            }
            
            

        } catch (error) {
            // log errors
            console.log(error);
            res.status(400).json("failed")
        }
    }
  }