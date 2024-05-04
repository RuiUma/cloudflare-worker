import DIC from "./dic"

const kvGet = async (key:string, env: Env) => {
    const res = await env.TokenKV.get(key)
    if (res)
        return JSON.parse(res) 
    return null
}

const kvSet = async (key:string, value: object, env: Env) => {
    return await env.TokenKV.put(key, JSON.stringify(value), {expirationTtl: DIC.EXPIRATION_TTL})
}

export { kvGet, kvSet }

