// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

import * as apiRoutes from './routes/api-routes';
import { ServerConfiguration } from '../../config.server';

// Express server
const app = express();
const configuration = new ServerConfiguration();
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../../dist/server/main.bundle');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
    renderModuleFactory(AppServerModuleNgFactory, {
        // Our index.html
        document: template,
        url: options.req.url,
        // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP),
            { provide: 'REQUEST', useValue: (options.req) },
            { provide: 'RESPONSE', useValue: (options.res) }
        ]
    }).then(html => {
        callback(null, html);
    });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// For development mode. For when I start 'ng serve' locally, the app would use production API on heroku without CORS violations
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    next();
});
app.options("/*", function (request, response, next) {
    response.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    //response.header('Access-Control-Allow-Headers', "Authorization");
    response.sendStatus(200);
});

app.use('/api', apiRoutes);

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(configuration.Port, () => {
    console.log(`Node server listening on http://localhost:${configuration.Port}`);
});