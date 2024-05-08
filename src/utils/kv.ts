import DIC from "./dic"

const kvGet = async (key:string, env: Env) => {
    const res = await env.TokenKV.get(key)
    if (res)
        return JSON.parse(res) 
    return null
}

const kvSet = async (key:string, value: any, env: Env) => {
    value['updateTime'] = Date.now()
    return await env.TokenKV.put(key, JSON.stringify(value), {expirationTtl: DIC.EXPIRATION_TTL})
}

export { kvGet, kvSet }

