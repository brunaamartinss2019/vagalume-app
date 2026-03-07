import { Router } from "express";
import createHttpError from "http-errors";
import * as users from '../controllers/users.controller.js';

const router = Router();

//auth
router.post('/users', users.create);
router.post('/sessions', users.login); 
router.delete('/sessions', users.logout);

//users
router.get("/users/:id", users.detail);

//404
router.use((req, res) => {
  throw new createHttpError(404, "Route Not Found");
});

export default router;