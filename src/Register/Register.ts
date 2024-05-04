import {SignJWT} from 'jose'

import DIC from '../utils/dic';
import { encrypt,  compare } from '../utils/encrypt';
import { insertUser } from '../utils/db';
import { kvGet, kvSet } from '../utils/kv'

const register = async ( email:string, password:string, env: Env, name?:string ) => {
    const encryptPassword = await encrypt(password)
    const res = insertUser(email,encryptPassword,env,name)

    const payload = {
        userName:email
    }

    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg:DIC.ALG })
        .setIssuedAt()
        .setIssuer(DIC.ISSURER)
        .setAudience(DIC.AUDIENCE)
        .sign(DIC.SECRET)
    
    kvSet(jwt, payload, env)

    return jwt
}

export { register }