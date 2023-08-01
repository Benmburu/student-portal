import bcrypt from "bcryptjs";
import User from "@models/User";
import Admin from "@models/Admin";
import initDB from "@lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            async authorize( credentials, req ){
                // initialize database
                initDB()

                const { serviceNumber, password, verificationCode, role } = credentials
                try {
                    // check if user is registered
                    const schema = role === 'admin'? Admin : User   
                    // console.log(schema)         
                    const user = await schema.findOne({ serviceNumber })
                    if (!user){
                        return null
                    }
                    
                    // check if password is correct
                    const isPasswordMatched = await bcrypt.compare( password, user.password )
                    if (!isPasswordMatched){
                        return null
                    }

                    // check if verification code is correct
                    if (parseInt(verificationCode) === user.verificationCode){
                        const user = await schema.findOneAndUpdate(
                            {serviceNumber: serviceNumber},
                            {verificationCode: ""},
                            {new: true},
                            )
                        // return session if authentication passes
                        return user
                    }else{
                        // return error
                        return null
                    }
        
                } catch (error) {
                    // log errors
                    console.log(error);
                }
            }
        })
    ],
    pages: {
        signIn: "/login" // to tell next-auth to redirect us to our custom login page 
    },
    secret: process.env.NEXTAUTH_SECRET // next-auth secret in the .env file which it uses to sign jwt sessions
})