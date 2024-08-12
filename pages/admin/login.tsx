import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import Header from "@components/Header";
import { useRouter } from "next/router";
import axios from "axios";
import AuthCode from 'react-auth-code-input';
import styles from "@styles/login.module.css";
import Image from 'next/image'
import Link from 'next/link';

export default function Login(){
 
  const [ serviceNumber, setServiceNumber ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ error, setError ] = useState<string>("");
  const [ verificationCode, setVerificationCode ] = useState<string>("")
  const [ toVerification, setToVerification ] = useState<boolean>(false)

  const router = useRouter();
  // check if there's a callback url
  const callbackUrl = (router.query?.callbackUrl as string) ?? "/admin/home";
  
  const handleServiceNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setServiceNumber(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleVerificationCodeChange = (e: string): void  =>{
    setVerificationCode(e)
  }

  // this function handles the verification code part of sign-in
  async function verify(e: React.FormEvent){
    e.preventDefault()
    // get next-auth login session if all credentials are correct
    setError("") 
    const data = await signIn("credentials", {
      redirect: false,
      serviceNumber,
      password,
      verificationCode,
      role: 'admin',
    })

    if (data?.error){
      setError("Invalid verification code.")
    }else{
      router.push(callbackUrl)
    }
  }

  // asychronous function to handle the sign-in form once the submit button is clicked
  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault() //prevent default behavior of form to refresh page once submit button is clicked

    try{  
      // send POST data to server in order to verify credentials
      const res = await axios.post("/api/admin/login", JSON.stringify({ serviceNumber, password }), {headers:{"Content-Type" : "application/json"} })
      setError("") 

      // if verification is successful, this is set to true in order to access the page that allows for input of the verification code
      setToVerification(true)
      

    }catch(e){
      if (axios.isAxiosError(e)){
        setError(e.response?.data)
      }
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
            length={4}
            containerClassName={styles.formContainer}
            inputClassName={styles.singleInput}
            onChange={handleVerificationCodeChange}
            // className={styles.error}
          />
          { error && <p className="error">{error}</p> }
          <button onClick={verify}>Submit</button>
          {/* <add functionality to button */}
          <style jsx>{`
              .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background-color: white;
                font-family: monospace;
                font-size: 1em;
                color: black;
                text-align: center;
              }

              button{
                margin: 12px;
                width: 8em;
                height: 35px;
                background-color: inherit;
                color: black;
                border: 2px solid black;
                border-radius: 5px;
                
              }

              .error{
                color: #e62c38;
                margin-top: 9px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 13px;
                text-align: center;
              }
              `}
            </style>
        </div>
      :
        <>
          <Header/>
          <div className="container">
          <Image src="/deftec.png" alt="deftec logo" width="150" height="120" />
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
              <Link href="/admin/forgot_password/verify_email">Forgot password?</Link>
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

              a{
                text-align: center;
                margin-top: 5px;
                color: blue;
                font-size: 15px;
              }
            `}</style>
          </div>
      </>}
    </>
    )
}