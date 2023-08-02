import React, { useState } from "react";
import Header from "@components/Header";
import AdminNavBar from "@components/AdminNavBar"
import styles from '@styles/Dashboard.module.css';
import axios from "axios";

const Dashboard = () =>{
    const [ serviceNumber, setserviceNumber ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ successMessage, setSuccessMessage ] = useState("");

    const refreshMessages = ()=>{
        setErrorMessage("")
        setSuccessMessage("")
      };
      
    const handleSubmit = async (e) =>{
        e.preventDefault()
        // console.log(serviceNumber, name, email, password)
        refreshMessages()

        try{
            const { res } = await axios.post("/api/admin/student-registration", JSON.stringify({ serviceNumber }), {headers:{"Content-Type" : "application/json"} })
            
            setSuccessMessage("Success")
            setErrorMessage("")

        }catch(error){
            refreshMessages()
            setErrorMessage(error.response.data)
            setSuccessMessage("")
        }
    }
  
    return (
        <div className={styles.Dashboard}>
            <AdminNavBar/>
            <div className={styles.body}>
                <Header/>
                <div>
                    <div className="container">
                        <h1>Add new student</h1>
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                            <label htmlFor="email">Please enter service number.</label>
                            <input type="text" value={serviceNumber} onChange={(e)=>setserviceNumber(e.target.value)} placeholder="123456" pattern="\d{6}" title="Service number must be 6 numbers long." required />
                            </div>
                            { successMessage && <p className="success">{successMessage}</p> }
                            { errorMessage && <p className="error">{errorMessage}</p> }
                            <button type="submit">Submit</button>
                        </form>

                        <style jsx>{`
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
                            text-align: center;
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
                            margin-bottom: 5px;
                            font-size: 13px;
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
                            text-align: center;
                            }
                        `}</style>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Dashboard