import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import Header from "@components/Header";
import { useRouter } from "next/router";
import axios from "axios";
import AuthCode from 'react-auth-code-input';
import styles from "./login.module.css"

export default function Login(){
 
  const [ serviceNumber, setServiceNumber ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ error, setError ] = useState("");
  const [ verificationCode, setVerificationCode ] = useState("")
  const [ toVerification, setToVerification ] = useState(false)

  const router = useRouter();
  // check if there's a callback url
  const callbackUrl = (router.query?.callbackUrl) ?? "/dashboard";
  
  const handleServiceNumberChange = (e) => {
    setServiceNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // this function handles the verification code part of sign-in
  async function verify(e){
    e.preventDefault()

    // get next-auth login session if all credentials are correct
    const data = await signIn("credentials", {
      redirect: false,
      serviceNumber,
      password,
      verificationCode
    })

    if (data.error){
      setError("Invalid verification code.")
    }else{
      router.push(callbackUrl)
    }
  }

  // asychronous function to handle the sign-in form once the submit button is clicked
  const handleSubmit = async (e) =>{
    e.preventDefault() //prevent default behavior of form to refresh page once submit button is clicked

    try{  
      // send POST data to server in order to verify credentials
      const res = await axios.post("/api/login", JSON.stringify({ serviceNumber, password }), {headers:{"Content-Type" : "application/json"} })
      setError("") 

      // if verification is successful, this is set to true in order to access the page that allows for input of the verification code
      setToVerification(true)
      

    }catch(e){
      setError(e.response.data)
    }
  }
  
  return (
    <>
      {toVerification? //javascript ternary operator which chooses which form to display based on the value of the variable 'toVerification'
        <div className="container">
          <h1>Verification code</h1>
          <AuthCode
            allowedCharacters="numeric"
            ariaLabel="OTP input form"
            length="4"
            containerClassName={styles.formContainer}
            inputClassName={styles.singleInput}
            // className={styles.error}
          />
          <button>Submit</button>

          <style jsx>{`
              .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background-color: rgb(32, 32, 32);
                font-family: monospace;
                font-size: 15px;
                color: white;
              }

              button{
                margin: 12px;
                width: 8em;
                height: 35px;
                background-color: pink;
                color: black;
                border: 2px solid black;
                border-radius: 5px;
              }
              `}
            </style>
        </div>
        
        // <div className="container">
        //   <form onSubmit={verify}>
        //     <label>
        //       Verification Code
        //       <input
        //         value={verificationCode}
        //         onChange={(e) => setVerificationCode(e.target.value)}
        //         name="verificationCode"
        //         autoComplete="one-time-code"
        //         type="text"
        //       />
        //     </label>
        //     { error && <p className="error">{error}</p> }
        //     <button type="submit">Log in</button>
        //   </form>
          
        // </div>
      :
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
              <button 
                type="submit"
                disabled={ !password || !serviceNumber }          
              >Login</button>
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
                font-size: 13px;
                text-align: center;
              }
            `}</style>
          </div>
      </>}
    </>
    )
}