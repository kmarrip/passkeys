import {Env} from "../env";
import { GenerateRegistrationOptionsController, VerifyRegistrationOptionsController, LoginController} from "../controllers";

export default {
	async fetch(request, env): Promise<Response> {
		const { pathname } = new URL(request.url);

		if (pathname == '/api/generateRegistrationResponse')
		return GenerateRegistrationOptionsController(request,env).then(res => res).catch(error => new Response(error.message,{status:error.statusCode || 400}));
		
		if (pathname == '/api/verifyRegistrationResponse')
		return VerifyRegistrationOptionsController(request,env).then(res=>res).catch(error => new Response(error.message,{status: error.statusCode || 400}))
		
		if (pathname == '/api/login')
		return LoginController(request,env).then(res=>res).catch(error => new Response(error.message, {status: error.statusCode || 400}));
		
		// I might have to add routes for the CORS
		return new Response('No route matches');

	},
} satisfies ExportedHandler<Env>;