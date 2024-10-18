import { Env } from "../env";


const LoginController = async (request: Request, env: Env):Promise<Response> => {
    return new Response(`Login route under development`)
}

export {LoginController}