import { Env } from "../env";
import {
    verifyAuthenticationResponse,
    AuthenticationResponseJSON
} from '@simplewebauthn/server';
import {getOptionsForUser} from "../repository";

const VerifyRegistrationOptionsController = async (request: Request, env: Env):Promise<Response>=>{
    const { pathname } = new URL(request.url);
	const method = request.method;

    if(method == 'POST'){
        const body = await request.json();
        const originalOpts = await getOptionsForUser(body.email,env);
        const verification = await verifyAuthenticationResponse({
            response: body,
            expectedChallenge: originalOpts.challenge,
            expectedOrigin: origin,
            expectedRPID: rpId,
        })
        return Response.json(some)
    }
    return new Response(`Method doesn't match for route ${pathname}`)
}

export {VerifyRegistrationOptionsController}