import { Env } from "../env";
import {
    verifyRegistrationResponse
} from '@simplewebauthn/server';
import { RegistrationResponseJSON } from "@simplewebauthn/types";
import {getOptionsForUser} from "../repository";
import { rpID } from "../config";
import { BadRequestError } from "../errors";

const VerifyRegistrationOptionsController = async (request: Request, env: Env):Promise<Response>=>{
    const { pathname } = new URL(request.url);
	const method = request.method;

    if(method == 'POST'){
        const body: RegistrationResponseJSON= await request.json();
        const url = new URL(request.url)
        const email = url.searchParams.get('email')
        console.log(email)
        if(!email)
            throw new BadRequestError(`Missing email in request queries`)

        const originalOpts = await getOptionsForUser(email,env);
        const verification = await verifyRegistrationResponse({
            response: body,
            expectedChallenge: originalOpts.challenge,
            expectedOrigin: origin,
            expectedRPID: rpID
        })
        const {verified} = verification;

        const {registrationInfo} = verification;
        if (!registrationInfo)
            throw new BadRequestError("Can't find the registration info")
        const {
            credentialDeviceType,
            credentialBackedUp,
            credential
        } = registrationInfo;
        const {
            counter,
            publicKey,
            id
        } = credential;

        const newPassKey = {
            email: email,
            webAuthnUserID: email,
            publicKey: publicKey,
            counter,
            deviceType: credentialDeviceType,
            backedUp: credentialBackedUp,
            transports: body.response.transports
        }
        // TODO this needs to be saved to the data, convert this to base64 and then save it in database.
        return Response.json({verified});
    }
    return new Response(`Method doesn't match for route ${pathname}`)
}

export {VerifyRegistrationOptionsController}