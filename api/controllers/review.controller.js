import Review from "../models/review.model.js";
import Booking from "../models/booking.model.js";
import Property from "../models/property.model.js";
import createError from "http-errors";

export const list = async (req, res) => {
    const reviews = await Review.find({ property: req.params.id })
        .populate("author");
    res.json(reviews);
};

export const create = async (req, res) => {
    const booking = await Booking.findById(req.body.booking);

    if (!booking) {
        throw createError(404, "Booking not found");
    }

    if (booking.status !== "confirmed") {
        throw createError(400, "Booking is not confirmed");
    }

    const existingReview = await Review.findOne({ booking: req.body.booking });
    if (existingReview) {
        throw createError(400, "this booking already has a review");
    }

    const review = await Review.create({
        ...req.body,
        author: req.session.user.id,
    });

    res.status(201).json(review);
};

