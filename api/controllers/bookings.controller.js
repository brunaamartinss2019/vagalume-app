// ============================================
// Controladores del recurso Booking
// Contiene la lógica de negocio para cada operación CRUD
// ============================================

import Booking from "../models/booking.model.js";
import Property from "../models/property.model.js";
import createError from "http-errors";
import Message from "../models/message.model.js";

/**
 * Listar mis reservas
 * GET /api/bookings/me?role=guest (por defecto)
 * GET /api/bookings/me?role=host
 */
export const list = async (req, res) => {
    const { role } = req.query;

    let filter;
    if (role === "host") {
        //busco las propriedades que son mías como host
        //luego busco las reservas de esas propriedades

        const myProperties = await Property.find({ host: req.session.user.id }).distinct("_id");
        filter = { property: { $in: myProperties } };
    } else {
        //por defecto: reservas donde yo soy el guest
        filter = { guest: req.session.user.id };
    }
    const bookings = await Booking.find(filter)
        .populate("property")
        .populate("guest");
    res.json(bookings);
};


/**
 * Crear un nuevo booking
 * POST /api/properties
 */

export const create = async (req, res) => {
    //busca la propriedad para obtener el precio
    const property = await Property.findById(req.body.property);

    if (!property) {
        throw createError(404, "Property not found");
    }

    //verifica que no existe ya una reserva confirmada que coincidan  con las fechas pedidas
    const propertyConflict = await Booking.findOne({
        property: req.body.property,
        status: "confirmed",
        checkIn: { $lt: new Date(req.body.checkOut) },
        checkOut: { $gt: new Date(req.body.checkIn) }
    });

    if (propertyConflict) {
        throw createError(400, "Property not available for these dates");
    }

    // 2. Bloquea si el mismo guest ya tiene una reserva pending para esas fechas
    const guestConflict = await Booking.findOne({
        property: req.body.property,
        guest: req.session.user.id,
        status: "pending",
        checkIn: { $lt: new Date(req.body.checkOut) },
        checkOut: { $gt: new Date(req.body.checkIn) }
    });

    if (guestConflict) {
        throw createError(400, "You already have a pending booking for these dates");
    }

    const checkIn = new Date(req.body.checkIn);
    const checkOut = new Date(req.body.checkOut);
    const nights = Math.round((checkOut - checkIn) / 86400000);
    const totalPrice = property.price * nights;

    const booking = await Booking.create({
        ...req.body,
        guest: req.session.user.id,
        totalPrice,
    });

    if (req.body.message) {
        await Message.create({
            booking: booking.id,
            sender: req.session.user.id,
            receiver: property.host,
            text: req.body.message,
        });
    }

    res.status(201).json(booking);
};

/**
 * Cambiar el estado de un booking
 * PUT /api/bookings/:id/status
 */
export const updateStatus = async (req, res) => {
    const { status } = req.body; // solo acepta "confirmed" o "cancelled"

    const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        {
            new: true, // Devuelve el documento actualizado en lugar del original
            runValidators: true, // Ejecuta las validaciones del esquema al actualizar
        });

    if (booking == null) {
        throw createError(404, "Booking not found");
    }

    res.json(booking);
};

/**
 * Cancelar un booking
 * DELETE /api/bookings/:id
 */
export const remove = async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status: "cancelled" },
        { new: true }
    );

    if (booking == null) {
        throw createError(404, "Booking not found");
    }
    res.json(booking);
};