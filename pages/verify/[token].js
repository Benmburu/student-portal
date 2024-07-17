import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Verify(){
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const router = useRouter()
    const token = router?.query?.token

    const verifyToken = async () =>{
        try{
            // send POST request to verify the jwt token in the email link
            const { res } = await axios.post("/api/verify", JSON.stringify({ token }), {headers:{"Content-Type" : "application/json"} })
            setSuccessMessage("User successfully verified. Please log in.")
            setErrorMessage("")

            // wait 3 seconds then redirect user to login page
            setTimeout(()=>{
                router.push("/login")
            }, 2000)
            
      
        }catch(error){
            setErrorMessage(error?.response?.data)
            setSuccessMessage("")
        }
    }

    // call this function
    // find a better way to do it
    verifyToken()
    

    return(
        
        <>
            <div className="body">
                { successMessage && <p className="success">{successMessage}</p> }
                { errorMessage && <p className="error">{errorMessage}</p> }
            </div>
            <style jsx>
                {
                `   .body{
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    
                    .error{
                        background-color: rgba(108, 39, 37, 0.2);
                        padding: 5px;
                        border: 1px solid rgb(98, 36, 39);
                        border-radius: 4px;
                        color: rgb(163, 85, 87);
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
                    }`
                }
            </style>
        </>
    )
}