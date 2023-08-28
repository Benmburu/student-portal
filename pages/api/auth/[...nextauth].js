import bcrypt from "bcryptjs";
import User from "@models/User";
import Admin from "@models/Admin";
import initDB from "@lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

let user;

export default NextAuth({
    // session: {
    //     strategy: "jwt"
    // },
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
                    user = await schema.findOne({ serviceNumber })
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
    callbacks: {
        async jwt({ token, user }) {
            // console.log('step 1', user)
          /* Step 1: update the token based on the user object */
          if (user) {
            // console.log('step 2')
            token.role = user.role;
          }
        //   console.log('step 2', token)
          return token;
        },
        session({ session, token }) {
          /* Step 2: update the session.user based on the token object */
        //   console.log('step 3', token)
          if (token && session.user) {
            session.user.role = token.role;
          }
        //   console.log('step 3', session)
          return session;
        }, 
      },
    pages: {
        signIn: "/login" // to tell next-auth to redirect us to our custom login page 
    },
    secret: process.env.NEXTAUTH_SECRET // next-auth secret in the .env file which it uses to sign jwt sessions
})