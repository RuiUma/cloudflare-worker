import {SignJWT} from 'jose'

import DIC from '../utils/dic';
import { encrypt,  compare } from '../utils/encrypt';
import { queryUser } from '../utils/db';
import { kvGet, kvSet } from '../utils/kv'

const verify = async (token: string, env: Env): Promise<string|null> => {

    const res = await kvGet(token, env)
    if (res) {
        await kvSet(token, JSON.parse(res), env)
        return JSON.parse(res)
    }

    return null
}

export { verify }