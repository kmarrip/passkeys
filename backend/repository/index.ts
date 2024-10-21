import { Env } from "../env";
import { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/types";

const getUserByEmail = async (email:String, env: Env): Promise<Record<string,unknown>[]>=>{
    const { results } = await env.DB.prepare(
        "SELECT * FROM Users WHERE email = ?;"
    )
        .bind(email)
        .all()
    return results;
}

const saveOptionsWithUser = async (email: String, opts: PublicKeyCredentialCreationOptionsJSON, env:Env): Promise<void> => {
    const challenge = btoa(JSON.stringify(opts));
    
    await env.DB.prepare(
        "INSERT INTO Users (email,challenge) VALUES (?,?)"
    )
        .bind(email,challenge)
        .all()
}

const getOptionsForUser = async (email:string,env:Env): Promise<PublicKeyCredentialCreationOptionsJSON>=> {
    const response = await env.DB.prepare(
        "SELECT challenge FROM Users WHERE email = ?;"
    )
        .bind(email)
        .all()
    const results = response.results;
    if(results.length == 0)throw new Error('No challenges saved for this user')
    if(results.length >1) throw new Error(`System error more than one challenge saved for this user, this shouldn't have happened`)
    const challenge= String(results[0].challenge);
    console.log(challenge)
    const opts = JSON.parse(atob(challenge));
    console.log(opts)
    return opts;
}

export {getUserByEmail,saveOptionsWithUser,getOptionsForUser}