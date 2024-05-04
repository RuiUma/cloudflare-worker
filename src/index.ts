/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import stateManager from './utils/StateManager';
import { kvGet, kvSet } from './utils/kv'
import { parse } from "cookie";
import {SignJWT, jwtVerify} from 'jose'

import DIC from './utils/dic';



export default {
	// The fetch handler is invoked when this worker receives a HTTP(S) request
	// and should return a Response (optionally wrapped in a Promise)
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// You'll find it helpful to parse the request.url string into a URL object. Learn more at https://developer.mozilla.org/en-US/docs/Web/API/URL
		const url = new URL(request.url);

		if (url.pathname.startsWith('/api')) {

			const cookie = parse(request.headers.get('Cookie')||'')


			// const body = request.body || {}
			// console.log(body);
			const { jwtReq, email, password }:any = await request.json()
			console.log('jwtReq  ' + jwtReq);





			let payload, protectedHeader
			try {
				const obj = await jwtVerify(jwtReq, DIC.SECRET, {
					issuer: DIC.ISSURER,
					audience: DIC.AUDIENCE,
				})
				payload = obj.payload
				protectedHeader = obj.protectedHeader
				console.log('verify');
			
				console.log(protectedHeader)
				console.log(payload)
				console.log();
			} catch (error) {
				console.error('verify failed.');
				
			}

			const jwt = await new SignJWT({ email, password })
				.setProtectedHeader({ alg:DIC.ALG })
				.setIssuedAt()
				.setIssuer('urn:umatech:eason-cloudflare-worker')
				.setAudience('urn:umatech:audience')
				.setExpirationTime('2h')
				.sign(DIC.SECRET)

			console.log('jwt');
			
			console.log(jwt)

			console.log('secret');
			console.log(DIC.SECRET);

			return new Response(jwt)
			
		}

		









		// if (url.pathname.startsWith('/query')) {
		// 	const adapter = new PrismaD1(env.user)
		// 	const prisma = new PrismaClient({ adapter })
		// 	const users = await prisma.user.findMany()
		// 	const result = JSON.stringify(users)
		// 	return new Response(result);
		// }

		// if (url.pathname.startsWith('/kv')) {
		// 	const setRes = await kvSet('testKey', 'testVal', env)
		// 	const getRes = await kvGet('testKey', env)
		// 	const getNull = await kvGet('testNull', env)
		// 	return new Response(
		// 		getRes + ' ' + getNull
		// 	)
		// }
		

		return new Response(
			`Try making requests to:
      <ul>
      <li><code><a href="/api/todos">/api/todos</a></code></li>
	  <li><code><a href="/query">/query</a></code></li> 
	  <li><code><a href="/kv">/kv</a></code></li> 
	  `,
			{ headers: { 'Content-Type': 'text/html' } }
		);
	},
};

