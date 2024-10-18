import { Env } from "../env";

const GenerateRegistrationOptions = async (request: Request, env: Env):Promise<Response>=>{
    const { pathname } = new URL(request.url);
	const method = request.method;

    if(method == 'POST'){

    }
    return new Response('No routes match')
}