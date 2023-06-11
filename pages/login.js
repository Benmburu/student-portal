import { useState } from "react";
import { signIn } from "next-auth/react";
import Header from "@components/Header";
import {  useRouter } from "next/router";

export default function Login(){
  const [ serviceNumber, setServiceNumber ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState("");

  const router = useRouter();
  // check if there's a callback url
  const callbackUrl = (router.query?.callbackUrl) ?? "/";
  
  const handleServiceNumberChange = (e) => {
    setServiceNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try{
      const data = await signIn("credentials", {
        redirect: false,
        serviceNumber,
        password
      })

      if (data?.error){
        setError("Invalid email or password")
      }else{
        router.push(callbackUrl)
      }

    }catch(e){
      console.log(e)
    }
  }
  
  return (
    <>
      <Header/>
      <div className="container">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="serviceNumber">Service Number</label>
            <input type="text" id="serviceNumber" value={serviceNumber} onChange={handleServiceNumberChange} placeholder="ABC123-001/2018" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
          </div>
          { error && <p className="error">{error}</p> }
          <button type="submit">Login</button>
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
            color: #e62c38;
            margin-bottom: 10px;
            font-family: 'Courier New', Courier, monospace;
            // font-size: 10px;
          }
        `}</style>
      </div>
    </>
    )
}