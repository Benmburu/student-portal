import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import Header from "@components/Header";
import { useRouter } from "next/router";
import axios from "axios";
import AuthCode from 'react-auth-code-input';
import styles from "@styles/login.module.css";
import Image from 'next/image'
import Link from 'next/link';

interface LoginState {
  serviceNumber: string;
  password: string;
  error: string;
  verificationCode: string;
  toVerification: boolean;
}

export default function Login(){

  const [ loginState, setLoginState ] = useState<LoginState>({
    serviceNumber: "",
    password: "",
    error: "",
    verificationCode: "",
    toVerification: false
  })

  const router = useRouter();
  // check if there's a callback url
  const callbackUrl = (router.query?.callbackUrl as string) ?? "/home/dashboard";
  
  const handleServiceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState(prev => ({ ...prev, serviceNumber: e.target.value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState( prev => ({ ...prev, password: e.target.value }) );
  };

  const handleVerificationCodeChange = ( code: string)=>{
    setLoginState( prev => ({ ...prev, verificationCode: code }) )
  }

  // this function handles the verification code part of sign-in
  async function verify(e: React.FormEvent){
    e.preventDefault()
    // get next-auth login session if all credentials are correct
    refreshMessages()
    const data = await signIn("credentials", {
      redirect: false,
      serviceNumber: loginState.serviceNumber,
      password: loginState.password,
      verificationCode: loginState.verificationCode
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
    refreshMessages()

    try{  
      // send POST data to server in order to verify credentials
      const res = await axios.post("/api/login", JSON.stringify({ 
        serviceNumber: loginState.serviceNumber, 
        password: loginState.password
      }), {
        headers:{"Content-Type" : "application/json"} 
      })

      // if verification is successful, this is set to true in order to access the page that allows for input of the verification code
      setLoginState( prev => ({ ...prev, toVerification: true }) )
      

    }catch(e){
      if (axios.isAxiosError(e) && e.response ){
        setError(e.response.data)
      }else{
        setError("An unexpected error occurred")
      }
      
    }
  }

  const setError = ( message: string )=>{
    setLoginState( prev => ({ ...prev, error: message }) );
    setTimeout(()=>{
      setLoginState( prev => ({ ...prev, error: "" }) );
    }, 3000)
  }

  const refreshMessages = ()=>{
    setLoginState( prev => ({ ...prev, error: "" }) );
  };
  
  return (
    <>
      {loginState.toVerification? //javascript ternary operator which chooses which form to display based on the value of the variable 'toVerification'
        <div className="container">
          <h1>Verification code</h1>
          <AuthCode
            allowedCharacters="numeric"
            ariaLabel="OTP input form"
            length={4}
            containerClassName={styles.formContainer}
            inputClassName={styles.singleInput}
            onChange={handleVerificationCodeChange}
          />
          { loginState.error && <p className="error">{loginState.error}</p> }
          <button onClick={verify}>Submit</button>
          {/* <add functionality to button */}
          <style jsx>{`
              .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
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
                <input type="text" id="serviceNumber" value={loginState.serviceNumber} onChange={handleServiceNumberChange} placeholder="ABC123-001/2018" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={loginState.password} onChange={handlePasswordChange} required />
              </div>
              { loginState.error && <p className="error">{loginState.error}</p> }
              <button 
                type="submit"
                disabled={ !loginState.password || !loginState.serviceNumber }          
              >Login</button>
              <Link href="/forgot_password/verify_email">Forgot password?</Link>
              <Link href="/register">New User? Register</Link>
              <Link href="/admin/login">Log in as admin</Link>
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