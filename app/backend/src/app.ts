import * as express from 'express';
import * as cors from 'cors';
import router from './routes';

class App {
    public app: express.Express;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        const accessControl: express.RequestHandler = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            res.header("Access-Control-Allow-Credentials", "true");

            next();
        };

        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({limit: '50mb'}));
        this.app.use(accessControl);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(router);
    }

    public start(PORT: string | number): void {
        this.app.listen(PORT, () => {
            console.log(`App listening on the port ${PORT}`);
        });
    }
}

export {App};

// A execução dos testes de cobertura depende dessa exportação
export const {app} = new App();
