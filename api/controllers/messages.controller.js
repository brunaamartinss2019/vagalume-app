import Message from "../models/message.model.js";
import Booking from "../models/booking.model.js";
import createError from "http-errors";

export const list = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate("property");

    if (!booking) throw createError(404, "Booking not found");

    const userId = req.session.user.id;
    const hostId = booking.property.host.toString();

    if (booking.guest.toString() !== userId && hostId !== userId) {
        throw createError(403, "Forbidden");
    }
    const messages = await Message.find({ booking: req.params.id })
        .populate("sender", "name avatar")
        .sort({ createdAt: 1 });

    res.json(messages);
};

export const create = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate("property");

    if (!booking) throw createError(404, "Booking not found");

    const userId = req.session.user.id;
    const hostId = booking.property.host.toString();
    const guestId = booking.guest.toString();

    if (userId !== guestId && userId !== hostId) {
        throw createError(403, "Forbidden");
    }

    const receiver = userId === guestId ? hostId : guestId;

    const message = await Message.create({
        booking: req.params.id,
        sender: userId,
        receiver,
        text: req.body.text,
    });

    res.status(201).json(message);
};
