import { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/types";
import { Env } from "../env";
import {
    generateRegistrationOptions
} from '@simplewebauthn/server';

interface IRegisterRequest {
	email: string
}
const getUserByEmail = async (email:String, env: Env): Promise<Record<string,unknown>[]>=>{
    const { results } = await env.DB.prepare(
        "SELECT * FROM Users WHERE email = ?;"
    )
        .bind(email)
        .all()
    return results;
}

const rpName = 'passkeys kmarrip co';
const rpID = 'passkeys.kmarrip.co';
const origin = `https://${rpID}`;

const GenerateRegistrationOptions = async (request: Request, env: Env):Promise<Response>=>{

    const { pathname } = new URL(request.url);
	const method = request.method;
    
    if(method == 'POST'){
        const {email}: IRegisterRequest = await request.json()
        console.log(email,origin)
        const users = await getUserByEmail(email,env)
        if(users.length >=1 ) // we already have the user in the database
        return Response.json({
            "Message": 'User already exists, Login instead'
        })
        // this is when i need to give the user a challenge
        // in the subsequent requests i would an email and also a response to the email



        const options: PublicKeyCredentialCreationOptionsJSON = await generateRegistrationOptions({
            rpName,
            rpID,
            userName: email,
            // Don't prompt users for additional information about the authenticator
            // (Recommended for smoother UX)
            attestationType: 'none',
            // Prevent users from re-registering existing authenticators
           
            // See "Guiding use of authenticators via authenticatorSelection" below
            authenticatorSelection: {
                residentKey: 'preferred',
                userVerification: 'preferred',
                authenticatorAttachment: 'platform',
            },
        });

        return Response.json(options)
    }

    return new Response(`Method not supported for the route ${pathname}`)
}


export {GenerateRegistrationOptions}