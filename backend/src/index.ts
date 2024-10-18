/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import {Env} from "../env";
import { GenerateRegistrationOptions, LoginController} from "../controllers";

export default {
	async fetch(request, env): Promise<Response> {
		const { pathname } = new URL(request.url);
		console.log('This is new')

		if (pathname == '/api/generateRegistrationResponse')
		return GenerateRegistrationOptions(request,env);
		
		
		if (pathname == '/api/login')
		return LoginController(request,env);
		

		// I might have to add routes for the CORS
		return new Response('No route matches');

	},
} satisfies ExportedHandler<Env>;