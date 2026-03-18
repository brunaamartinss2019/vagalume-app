// ============================================
// Controladores del recurso Property
// Contiene la lógica de negocio para cada operación CRUD
// ============================================

import Property from "../models/property.model.js";
import createError from "http-errors";

/**
 * Listar todas las propriedades
 * GET /api/properties
 * Devuelve un array JSON con todos las propriedades de la base de datos
 */
export const list = async (req, res) => {
    const { type, maxPrice, capacity } = req.query;

    const filter = {};

    if (type) {
        filter.type = type;
    }

    if (maxPrice) {
        filter.price = { $lte: Number(maxPrice) };
    }

    const properties = await Property.find(filter).populate("host");
    res.json(properties);
};

/**
 * Obtener el detalle de una propriedad por su ID
 * GET /api/properties/:id
 * Devuelve un objeto JSON con los datos de la propriedad solicitada
 */
export const detail = async (req, res) => {
    // .populate("host") incluye los datos del usuario asociado a la propriedad
    const properties = await Property.findById(req.params.id).populate("host");

    if (properties === null) {
        throw createError(404, "Property not found");
    } else {
        res.json(properties);
    }
};

/**
 * Crear una nueva propriedad
 * POST /api/properties
 * Recibe los datos de la propriedad en el cuerpo de la petición
 * Devuelve la propriedad creada con código de estado 201 (Creado)
 */
export const create = async (req, res) => {
    const properties = await Property.create({
        ...req.body,
        host: req.session.user.id,
    });
    res.status(201).json(properties);
};

/**
 * Actualizar una propriedad existente por su ID
 * PATCH /api/properties/:id
 * Recibe los campos a actualizar en el cuerpo de la petición
 * Devuelve la propriedad actualizada (new: true) con validaciones activas
 */
export const update = async (req, res) => {
    const property = await Property.findById(req.params.id);    //busco la propriedad por Id

    if (property === null) {
        throw createError(404, "Property not found"); //si no existe, devuelve un error 404
    }

    if (property.host.toString() !== req.session.user.id) { //comprueba que el host de la propriedad es el mismo que esta haciendo la petición
        //property.host es un objecto de mongoDB por eso hay que transformar en string
        throw createError(403, "Forbidden");
    }

    const update = await Property.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Devuelve el documento actualizado en lugar del original
        runValidators: true, // Ejecuta las validaciones del esquema al actualizar
    });

    res.json(update);
};

/**
 * Eliminar una propriedad por su ID
 * DELETE /api/properties/:id
 * Devuelve código de estado 204 (Sin contenido) tras la eliminación exitosa
 */
export const remove = async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property === null) {
        throw createError(404, "Property not found");
    }

    if (property.host.toString() !== req.session.user.id) {
        throw createError(403, "Forbidden");
    }

    await Property.findByIdAndDelete(req.params.id);
    res.status(204).end();
};