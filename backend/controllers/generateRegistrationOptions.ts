import { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/types";
import { Env } from "../env";
import { rpID,rpName,origin } from "../config";
import {
    generateRegistrationOptions
} from '@simplewebauthn/server';
import {getUserByEmail,saveOptionsWithUser} from "../repository";

interface IRegisterRequest {
	email: string
}

const GenerateRegistrationOptionsController = async (request: Request, env: Env):Promise<Response>=>{

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
        // in the subsequent requests i would send email and also a response to the email


        const options: PublicKeyCredentialCreationOptionsJSON = await generateRegistrationOptions({
            rpName,
            rpID,
            userName: email,
            userDisplayName: email,
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
        // this should be saved along with the user in the database, should be enough to save the challange
        await saveOptionsWithUser(email,options,env)
        return Response.json(options)
    }

    return new Response(`Method not supported for the route ${pathname}`)
}


export {GenerateRegistrationOptionsController}