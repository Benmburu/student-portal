import axios from "axios";
import { useState } from "react";

export default function Register(){
  const [ serviceNumber, setServiceNumber ] = useState("");
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ successMessage, setSuccessMessage ] = useState("");

  const handleServiceNumberChange = (e) => {
    setServiceNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

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

    try{
      const { res } = await axios.post("/api/register", JSON.stringify({ serviceNumber, name, email, password }), {headers:{"Content-Type" : "application/json"} })
      refreshMessages()
      setSuccessMessage("User successfully registered. Please click the link sent to your email address to verify your account.")
      setErrorMessage("")

    }catch(error){
      refreshMessages()
      setErrorMessage(error.response.data)
      setSuccessMessage("")
    }
  }
  
  return (
    <div className="container">
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="serviceNumber">Service Number</label>
          <input type="text" id="serviceNumber" value={serviceNumber} onChange={handleServiceNumberChange} placeholder="ABC123-001/2018" required />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} placeholder="John Smith" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="example@gmail.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
        </div>
        { successMessage && <p className="success">{successMessage}</p> }
        { errorMessage && <p className="error">{errorMessage}</p> }
        <button type="submit">Register</button>
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