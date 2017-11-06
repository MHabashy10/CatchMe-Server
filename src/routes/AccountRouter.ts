import { Router, Request, Response, NextFunction } from 'express';

import { User } from '../models/userModel'

export class AccountRouter {
  router: Router

  /**
   * Initialize the AccountRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * Login.
   */
  public login(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      var headers = {};
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Origin"] = "*";
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.status(200).send(headers);
      return

    };
    let email = req.body.email;
    let password = req.body.password;

    User.find({ email, password })

      .then(function (aUser: any) {


        if (!aUser.length) {
          return res.send({ status: false })
        }

        aUser[0].status = "true";

        res.send(aUser[0]);
      }).catch(function (error: any) {
        res.sendStatus(400);
      })

  }


  /**
 * GET one hero by id
 */
  public signUp(req: Request, res: Response, next: NextFunction) {
    let query = parseInt(req.params.id);
    let email = req.body.email;
    let password = req.body.password;
    let hero = true //Heroes.find(hero => hero.id === query);

    var newUser = new User({ email: email, password: password });

    newUser.save(function (err, aUser) {
      if (err) return console.error(err);
      console.log("user created");
    });
    if (hero) {
      res.status(200)
        .send({
          message: 'Success',
          status: res.status,
          hero
        });
    }
    else {
      res.status(404)
        .send({
          message: 'No hero found with the given id.',
          status: res.status
        });
    }
  }

  public getProfile(req: Request, res: Response, next: NextFunction) {
    let query = parseInt(req.params.userId);
    let hero = true //Heroes.find(hero => hero.id === query);
    if (hero) {
      res.status(200)
        .send({
          avatar: 'Success',
          firstName: "Mohamed",
          lastName: "Habashy",
          email: "mohamed.habshey10@gmail.com",
          phone: "+201125184775"
        });
    }
    else {
      res.status(404)
        .send({
          message: 'No hero found with the given id.',
          status: res.status
        });
    }
  }


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post('/login', this.login);
    this.router.post('/signUp', this.signUp);
  }

}

// Create the AccountRouter, and export its configured Express.Router
const accountRoutes = new AccountRouter();


export default accountRoutes.router;