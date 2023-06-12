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
                try {
                    // check if user is registered            
                    const user = await User.findOne({ serviceNumber })
                    if (!user){
                        return null
                    }
                    
                    // check if password is correct
                    const isPasswordMatched = await bcrypt.compare( password, user.password )
                    if (!isPasswordMatched){
                        return null
                    }else{
                        // confirm if user is verified
                        console.log(user)
                        if (user.confirmed){
                            return user
                        }else{
                            return null
                        }
                    }
                    // return user
        
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