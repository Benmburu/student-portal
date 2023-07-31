import axios from "axios";
import { useState } from "react";

export default function verifyEmail(){
  const [ email, setEmail ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ successMessage, setSuccessMessage ] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const refreshMessages = ()=>{
    setErrorMessage("")
    setSuccessMessage("")
  };
  
  const handleSubmit = async (e) =>{
    e.preventDefault()
    // console.log(serviceNumber, name, email, password)
    refreshMessages()

    try{
      const { res } = await axios.post("/api/forgot_password/verify_email", JSON.stringify({ email }), {headers:{"Content-Type" : "application/json"} })
      
      setSuccessMessage("Please click the link sent to your email address reset your password.")
      setErrorMessage("")

    }catch(error){
      refreshMessages()
      setErrorMessage("An error occurred.")
      setSuccessMessage("")
    }
  }
  
  return (
    <div className="container">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="email">Please enter your email address to search for your account.</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="example@gmail.com" required />
        </div>
        { successMessage && <p className="success">{successMessage}</p> }
        { errorMessage && <p className="error">{errorMessage}</p> }
        <button type="submit">Search</button>
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
        }
      `}</style>
    </div>
    )
}