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

import handleProxy from './proxy';
import handleRedirect from './redirect';
import apiRouter from './router';

// export interface Env {
// 	DB: D1Database
//   }

// Export a default object containing event handlers
export default {
	// The fetch handler is invoked when this worker receives a HTTP(S) request
	// and should return a Response (optionally wrapped in a Promise)
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// You'll find it helpful to parse the request.url string into a URL object. Learn more at https://developer.mozilla.org/en-US/docs/Web/API/URL
		const url = new URL(request.url);

		// You can get pretty far with simple logic like if/switch-statements
		switch (url.pathname) {
			case '/redirect':
				return handleRedirect.fetch(request, env, ctx);

			case '/proxy':
				return handleProxy.fetch(request, env, ctx);
		}

		if (url.pathname.startsWith('/api/')) {
			// You can also use more robust routing
			return apiRouter.handle(request);
		}

		if (url.pathname.startsWith('/query')) {
			console.log(env);
			
			const adapter = new PrismaD1(env.user)
			const prisma = new PrismaClient({ adapter })
			const users = await prisma.user.findMany()
			const result = JSON.stringify(users)
			return new Response(result);
		}
		

		return new Response(
			`Try making requests to:
      <ul>
      <li><code><a href="/redirect?redirectUrl=https://example.com/">/redirect?redirectUrl=https://example.com/</a></code>,</li>
      <li><code><a href="/proxy?modify&proxyUrl=https://example.com/">/proxy?modify&proxyUrl=https://example.com/</a></code>, or</li>
      <li><code><a href="/api/todos">/api/todos</a></code></li>
	  <li><code><a href="/query">/query</a></code></li> 
	  `,
			{ headers: { 'Content-Type': 'text/html' } }
		);
	},
};
