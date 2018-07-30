import sirv from 'sirv';
import polka from 'polka';
import sapper from 'sapper';
import compression from 'compression';
import { manifest } from './manifest/server.js';

const assets = sirv('assets');

polka() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		(req, res, next) => {
			// check if we're looking at a /static/* request
			return req.path.startsWith('/assets/') ? assets(req, res, next) : next();
		},
		sapper({ manifest })
	)
	.listen(process.env.PORT)
	.catch(err => {
		console.log('error', err);
	})
