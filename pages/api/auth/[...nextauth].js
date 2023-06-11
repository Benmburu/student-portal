import bcrypt from "bcryptjs";
import User from "@models/User";
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
                initDB()

                const { serviceNumber, password } = credentials
                // console.log(serviceNumber, password)
                try {
                    // check if user is registered            
                    const user = await User.findOne({ serviceNumber })
                    if (!user){
                        // return res.status(400).json("Invalid email or password")
                        // throw new Error("Invalid email or password")
                        return null
                    }
                    
                    // check if password is correct
                    const isPasswordMatched = await bcrypt.compare( password, user.password )
                    if (!isPasswordMatched){
                        // return res.status(400).json("Invalid email or password")
                        // throw new Error("Invalid email or password")
                        return null
                    }
                    
                    // return response
                    // // res.status(200).json("Login successful")
                    return user
        
                } catch (error) {
                    // log errors
                    console.log(error);
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
})