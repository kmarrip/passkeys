import {Env} from "../env";
import { GenerateRegistrationOptionsController, VerifyRegistrationOptionsController, LoginController} from "../controllers";

export default {
	async fetch(request, env): Promise<Response> {
		const { pathname } = new URL(request.url);

		if (pathname == '/api/generateRegistrationResponse')
		return GenerateRegistrationOptionsController(request,env);
		
		if (pathname == '/api/verifyRegistrationResponse')
		return VerifyRegistrationOptionsController(request,env);
		
		if (pathname == '/api/login')
		return LoginController(request,env);
		

		// I might have to add routes for the CORS
		return new Response('No route matches');

	},
} satisfies ExportedHandler<Env>;