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
import login from './login/login';
import { verify } from './Verify/Verify';
import { register } from './Register/Register';


export default {
	// The fetch handler is invoked when this worker receives a HTTP(S) request
	// and should return a Response (optionally wrapped in a Promise)
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// You'll find it helpful to parse the request.url string into a URL object. Learn more at https://developer.mozilla.org/en-US/docs/Web/API/URL
		const url = new URL(request.url);

		const cookie = parse(request.headers.get('Cookie')||'')
		

		if (url.pathname.match('/login')) {

			
			const { email, password }:any = await request.json()

			const response = await login(email, password, env)

			if (!response) {
				return new Response('login failed')
			}


			return new Response(response, {
				headers: {
					'Set-Cookie': response
				}
			})
			
		}

		if (url.pathname.match('/register')) {

			const { email, password, name }:any = await request.json()

			const response = await register(email, password, env, name)

			if (!response) {
				return new Response('register failed')
			}

			return new Response(response, {
				headers: {
					'Set-Cookie': response
				}
			})

		}

		if (url.pathname.match('/verify')) {

			const response = await verify(cookie.token, env)

			return new Response(response)

		}



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

