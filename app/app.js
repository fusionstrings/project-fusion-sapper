import sirv from 'sirv';
import polka from 'polka';
import sapper from 'sapper';
import compression from 'compression';
import { manifest } from './manifest/server.js';

function server() {
	const assets = sirv('assets');
	polka() // You can also use Express
		.use(
			compression({ threshold: 0 }),
			(req, res, next) => {
				// check if we're looking at a /static/* request
				// return req.path.startsWith('/assets/') ? assets(req, res, next) : next();

				if (req.path.startsWith('/assets/')) {
					req.path = req.path.substring(7); // remove "/assets" prefix
					assets(req, res, next);
				} else {
					next();
				}
			},
			sapper({ manifest })
		)
		.listen(process.env.PORT)
		.catch(err => {
			console.log('error', err);
		});
}

export default server;
