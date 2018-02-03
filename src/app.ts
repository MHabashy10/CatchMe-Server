import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import * as dotenv from 'dotenv';
dotenv.config();

import HeroRouter from './routes/heroRouter';
import AccountRouter from './routes/accountRouter'
import swaggerUi = require('swagger-ui-express');
import swaggerJSDoc = require('swagger-jsdoc');

let options = {
  swaggerDefinition: {
    info: {
      title: 'CatchMe', // Title (required)
      version: '1.0.0', // Version (required)
    },
    basePath: '/api/v1', // Base path (optional)
  },
  apis: ['./dist/routes/*.js'], // Path to the API docs
};



import * as mongoose from 'mongoose';
// Set mongoose.Promise to any Promise implementation
(<any>mongoose).Promise = Promise;

mongoose.connect(process.env.mongodbUrl, { useMongoClient: true });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("mongoDb connected successfully");
});


// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));




    // Add headers
    // this.express.use(function (req, res, next) {

    //   // Website you wish to allow to connect
    //   res.setHeader('Access-Control-Allow-Origin', '*');
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    //   // Request methods you wish to allow
    //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    //   // Request headers you wish to allow
    //   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //   // Set to true if you need the website to include cookies in the requests sent
    //   // to the API (e.g. in case you use sessions)
    //   res.setHeader('Access-Control-Allow-Credentials', 'true');

    //   // Pass to next layer of middleware
    //   next();
    // });

  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
    this.express.use('/api/v1/heroes', HeroRouter);
    this.express.use('/api/v1/accounts', AccountRouter);
    // Initialize swagger-jsdoc -> returns validated swagger spec in json format
    let swaggerSpec = swaggerJSDoc(options);
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

}

export default new App().express;