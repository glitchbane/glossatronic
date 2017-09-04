import * as express from 'express';
import * as bodyParser  from 'body-parser';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import UserRouter from './routes/user.routes';


class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.options('*', cors());
        this.express.use(bodyParser.text());
        this.express.use(bodyParser.json({ type: 'application/json'}));
        this.express.use(methodOverride());
        let allowCrossDomain = function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');
            res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');

            if ('OPTIONS' == req.method) {
                res.send(200);
            } else {
                next();
            }
        }

        this.express.use(allowCrossDomain);
    }

    private routes(): void {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Welcome to the Glossatronic API'
                     })
        });
        router.get('/api', (req, res, next) => {
            res.json({
                message: 'Welcome to the mtm api!'
                     })
        });
        this.express.use('/', router);
        this.express.use('/api/users', UserRouter);

    }
}

export default new App().express;