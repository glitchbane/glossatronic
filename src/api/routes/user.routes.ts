
import * as userData from '../db-operations/user/user.data';
import {Router, Request, Response, NextFunction} from 'express';

let express = require('express');


export class UserRouter {
   router: Router;

   constructor() {
      this.router = Router();
      this.init();
   }

   init() {
      this.router.get('/', userData.GetAllUsers);
      this.router.get('/:id', userData.GetUser);
      this.router.post('', userData.CreateUser);
   }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;