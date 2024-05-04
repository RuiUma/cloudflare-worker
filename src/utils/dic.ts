class DIC {
    static readonly ISSURER = 'urn:umatech:eason-cloudflare-worker'

    static readonly AUDIENCE = 'urn:umatech:audience'
    static readonly SECRET = new TextEncoder().encode('cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2')

    static readonly ALG = 'HS256'

    static readonly EXPIRATION_TTL = 1800
    static readonly SALT_ROUND = 10
}


export default DIC