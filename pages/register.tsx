import axios from "axios";
import { useState } from "react";
import Image from 'next/image'

export default function Register(){

  interface RegisterState{
    serviceNumber: string;
    name: string;
    email: string;
    password: string;
    errorMessage: string;
    successMessage: string;
  }

  const [ registerState, setRegisterState ] = useState<RegisterState>({
    serviceNumber: "",
    name: "",
    email: "",
    password: "",
    errorMessage: "",
    successMessage: ""
  });

  const handleServiceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterState( prev => ({ ...prev, serviceNumber: e.target.value }) );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterState( prev => ({ ...prev, name: e.target.value }) );
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterState( prev => ({ ...prev, email: e.target.value }) );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterState( prev => ({ ...prev, password: e.target.value }) );
  };

  const refreshMessages = ()=>{
    setRegisterState( prev => ({ ...prev, errorMessage: "" }) )
    setRegisterState( prev => ({ ...prev, successMessage: "" }) )
  };
  
  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()
    refreshMessages()

    try{
      const res = await axios.post("/api/register", JSON.stringify({ 
        serviceNumber: registerState.serviceNumber, 
        name: registerState.name, 
        email: registerState.email, 
        password: registerState.password
      }), 
      {headers:{"Content-Type" : "application/json"} 
    })
      
      setSuccess("User successfully registered. Please click the link sent to your email address to verify your account.")

    }catch(e){
      if ( axios.isAxiosError(e) && e.response ){
        setError( e.response.data )
      }else{
        setError("We encountered an unexpected error")
      }
    }
  }

  const setSuccess = ( message: string )=>{
    setRegisterState( prev => ({ ...prev, successMessage: "" }) )
    setTimeout(()=>{
      setRegisterState( prev => ({ ...prev, successMessage: "" }) )
    }, 3000)
  }

  const setError = ( message: string )=>{
    setRegisterState( prev => ({ ...prev, errorMessage: message }) )
    setTimeout(()=>{
      setRegisterState( prev => ({ ...prev, errorMessage: "" }) )
    }, 3000)
  }
  
  return (
    <div className="container">
      <Image src="/deftec.png" alt="deftec logo" width="150" height="120" />
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="serviceNumber">Service Number</label>
          <input type="text" id="serviceNumber" value={registerState.serviceNumber} onChange={handleServiceNumberChange} placeholder="ABC123-001/2018" required />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={registerState.name} onChange={handleNameChange} placeholder="John Smith" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={registerState.email} onChange={handleEmailChange} placeholder="example@gmail.com" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={registerState.password} onChange={handlePasswordChange} required />
        </div>
        { registerState.successMessage && <p className="success">{registerState.successMessage}</p> }
        { registerState.errorMessage && <p className="error">{registerState.errorMessage}</p> }
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