import bcrypt from "bcryptjs"
import User from "@models/User"

const login = () =>{
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  
  const options = {
    method: "POST",
    headers: {
      Content-Type: "application/json"
    },
    body: { email, password }
  }
  
  const submitHandler = async (e) =>{
    e.preventDefault()
    try{
      const data = await fetch("127.0.0.1:3000/api/register", options) 
    }catch(e){
      console.log(e)
    }
  }
  
  return (
    <div>
      
    </div>
    )
}