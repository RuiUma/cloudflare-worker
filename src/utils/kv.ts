
// import stateManager from './StateManager';

// const state = stateManager.getInstance()
// const env =  state.getState('env')

// import { e } from '../index'

// // const env: any = e

// console.log('kv');

// console.log(env);


const kvGet = async (key:string, env: Env) => {
    const res = await env.TokenKV.get(key)
    if (res)
        return JSON.parse(res) 
    return null
}

const kvSet = async (key:string, value: any, env: Env) => {
    return await env.TokenKV.put(key, JSON.stringify(value))
}

export { kvGet, kvSet }

