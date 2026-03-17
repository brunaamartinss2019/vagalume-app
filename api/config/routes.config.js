import { Router } from "express";
import createHttpError from "http-errors";
import * as users from '../controllers/users.controller.js';
import * as properties from '../controllers/properties.controller.js';
import * as bookings from '../controllers/bookings.controller.js';
import * as reviews from '../controllers/review.controller.js';
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

//Auth
router.post('/users', users.create);
router.post('/sessions', users.login);
router.delete('/sessions', users.logout);

//Users
router.get("/users/me", users.profile);
router.get("/users/:id", users.detail);

//Properties
router.get("/properties", properties.list);
router.get("/properties/:id", properties.detail);
router.post("/properties", checkRole("host", "dual"), properties.create);
router.patch("/properties/:id", checkRole("host", "dual"), properties.update);
router.delete("/properties/:id", checkRole("host"), properties.remove);

//Bookings
router.get("/bookings/me", bookings.list);
router.post("/bookings", checkRole("guest", "dual"), bookings.create);
router.put("/bookings/:id/status", checkRole("host", "dual"), bookings.updateStatus);
router.delete("/bookings/:id", bookings.remove);

//Reviews
router.get("/properties/:id/reviews", reviews.list);
router.post("/properties/:id/reviews", checkRole("guest", "dual"), reviews.create);

//404
router.use((req, res) => {
    throw new createHttpError(404, "Route Not Found");
});

export default router;