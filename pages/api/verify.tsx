import User from "@models/User";
import jwt, { JsonWebTokenError, NotBeforeError, TokenExpiredError, VerifyErrors } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

interface DecodedToken{
    email: string;
    confirmed: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'POST'){
        const { token } = req.body
        // verify jwt email token
        try{
            const decoded: DecodedToken = jwt.verify(token, process.env.EMAIL_SECRET as string) as DecodedToken;
            const user = await User.findOneAndUpdate(
                {email: decoded.email },
                {confirmed: true},
                {new: true},
                );
            res.status(200).json("Successfully verified.")
        }
        catch(err: unknown){
            if (err instanceof JsonWebTokenError || err instanceof NotBeforeError|| err instanceof TokenExpiredError){
                res.status(401).json("Not verified.")
            }
            else{
                console.error("Error verifying token:", err);
                res.status(500).json("Internal server error.");
            }
        }
    }else{
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method?.toUpperCase()} Not Allowed.`)
    }
}