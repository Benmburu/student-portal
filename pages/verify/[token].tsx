import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Verify(){

    interface VerifyState{
        errorMessage: string;
        successMessage: string;
    }

    const [ verifyState, setVerifyState ] = useState<VerifyState>({
        errorMessage: "",
        successMessage: ""
    });

    const router = useRouter()
    const token = router?.query?.token

    const verifyToken = async () =>{
        try{
            // send POST request to verify the jwt token in the email link
            const res = await axios.post("/api/verify", JSON.stringify({ token }), {headers:{"Content-Type" : "application/json"} })
            setVerifyState( prev => ({ ...prev, successMessage: "User successfully verified. Please log in." }) );
            setVerifyState( prev => ({ ...prev, errorMessage: "" }) );

            // wait 3 seconds then redirect user to login page
            setTimeout(()=>{
                router.push("/login")
            }, 2000)
            
      
        }catch(e){ // TODO: Implement proper type checking
            if (axios.isAxiosError(e) && e.response ){
                setVerifyState( prev => ({ ...prev, errorMessage: e as string }) );
                setVerifyState( prev => ({ ...prev, successMessage: "" }) );
            }else{
                setVerifyState( prev => ({ ...prev, errorMessage: "We encountered and unexpected error." }) );
                setVerifyState( prev => ({ ...prev, successMessage: "" }) );
            }
        }
    }

    // call this function
    // find a better way to do it
    verifyToken()
    

    return(
        
        <>
            <div className="body">
                { verifyState.successMessage && <p className="success">{verifyState.successMessage}</p> }
                { verifyState.errorMessage && <p className="error">{verifyState.errorMessage}</p> }
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