import { Router } from "express";
import createHttpError from "http-errors";
import * as users from '../controllers/users.controller.js';
import * as properties from '../controllers/properties.controller.js';

const router = Router();

//auth
router.post('/users', users.create);
router.post('/sessions', users.login); 
router.delete('/sessions', users.logout);

//users
router.get("/users/:id", users.detail);

//properties
router.get("/properties", properties.list);
router.get("/properties/:id", properties.detail);
router.post("/properties", properties.create);
router.patch("/properties/:id", properties.update);
router.delete("/properties/:id", properties.remove);

//404
router.use((req, res) => {
  throw new createHttpError(404, "Route Not Found");
});

export default router;