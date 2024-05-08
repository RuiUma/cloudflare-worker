import {SignJWT} from 'jose'

import DIC from '../utils/dic';
import { encrypt,  compare } from '../utils/encrypt';
import { queryUser } from '../utils/db';
import { kvGet, kvSet } from '../utils/kv'


const login = async (userName:string, password:string, env:Env) => {

    const user = await queryUser(userName, env)
    if (! user) {
        return null
    }

    const res = await compare(password,user.password)
    if (! res) {
        return null
    }

    const payload = {
        userName
    }
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg:DIC.ALG })
        .setIssuedAt()
        .setIssuer(DIC.ISSURER)
        .setAudience(DIC.AUDIENCE)
        // .setExpirationTime('2h')
        .sign(DIC.SECRET)
    
    kvSet(jwt, payload, env)

    return jwt

    
}

export default login