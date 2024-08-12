import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Verify(){
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmedPassword, setConfirmedPassword] = useState<string>("");

    const router = useRouter()
    const token = router?.query?.token

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setErrorMessage("")
        setSuccessMessage("")
        
        if (password !== confirmedPassword){
            setErrorMessage("Passwords must match.")
        }
        else{
            try {
                const res = await axios.post("/api/forgot_password/reset_password", JSON.stringify({ token, password }), {headers:{"Content-Type" : "application/json"} })
                console.log(res.data)
                setSuccessMessage(res.data)
                setTimeout(()=>{
                    router.push("/login")
                }, 2000)

            } catch (error) {
              if (axios.isAxiosError(error)){
                setErrorMessage(error.response?.data as string)
              }
            }
        }

    }
   

    return(
        
        <>
            <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="serviceNumber">New Password</label>
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input type="password" id="password" value={confirmedPassword} onChange={(e)=>setConfirmedPassword(e.target.value)} required />
              </div>
              { successMessage && <p className="success">{successMessage}</p> }
              { errorMessage && <p className="error">{errorMessage}</p> }
              <button 
                type="submit"
                disabled={ !password || !confirmedPassword }          
              >Reset</button>
            </form>
                
            </div>
            <style jsx>{`

              .body{
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background-color: #f5f5f5;
                font-family: monospace;
                font-size: 15px;
                color: #28282b;
                
              }

              h1 {
                font-size: 24px;
                margin-bottom: 20px;
              }

              form {
                display: flex;
                flex-direction: column;
                width: 300px;
                padding: 20px;
                background-color: #ffffff;
                border: 1px solid black;
                border-radius: 8px;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
              }

              .form-group {
                display: flex;
                flex-direction: column;
                margin-bottom: 15px;
              }

              label {
                font-weight: bold;
                margin-bottom: 5px;
              }

              input {
                padding: 10px;
                border: 1px solid #cccccc;
                border-radius: 4px;
                outline: none;
                background-color: #ffffff;
                color: black;
              }

              button {
                padding: 10px 20px;
                background-color: #1a6aeb;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
              }

              button:hover {
                background-color: #0855d1;
              }

              .error{
                color: #e62c38;
                margin-bottom: 10px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 13px;
                text-align: center;
              }

              a{
                text-align: center;
                margin-top: 5px;
                color: blue;
                font-size: 15px;
              }
              
              .error{
                background-color: rgba(232, 46, 46, 0.2);
                padding: 5px;
                border: 1px solid #e62c38;
                border-radius: 4px;
                color: #e62c38;
                margin-bottom: 10px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 13px;
                text-align: center;
              }
      
              .success{
                background-color: rgba(103, 230, 143, 0.1);
                padding: 5px;
                border: 1px solid #67e68f;
                border-radius: 4px;
                color: #67e68f;
                margin-bottom: 10px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 13px;
              }
            `}</style>
        </>
    )
}