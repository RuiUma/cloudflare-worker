import {SignJWT} from 'jose'

import DIC from '../utils/dic';
import { encrypt,  compare } from '../utils/encrypt';
import { queryUser } from '../utils/db';
import { kvGet, kvSet } from '../utils/kv'

const verify = async (token: string, env: Env): Promise<boolean|object> => {

    const res = await kvGet(token, env)
    if (res) {
        return JSON.parse(res)
    }

    return false
}

export { verify }