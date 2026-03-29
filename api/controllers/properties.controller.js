import Property from "../models/property.model.js";
import createError from "http-errors";

export const list = async (req, res) => {
    const { type, maxPrice, capacity, ria } = req.query;

    const filter = {};

    if (type) {
        filter.type = type;
    }

    if (maxPrice) {
        filter.price = { $lte: Number(maxPrice) };
    }

    if (capacity) {
        filter.capacity = { $gte: Number(capacity) };
    }
    if (ria) {
        filter["location.ria"] = new RegExp(ria, "i");
    }

    try {
        const properties = await Property.find(filter).populate("host");
        res.json(properties);
    } catch (error) {
        res.status(500).json({message: "Error al buscar propiedades" });
    }
};

export const detail = async (req, res) => {
    const properties = await Property.findById(req.params.id).populate("host");

    if (properties === null) {
        throw createError(404, "Property not found");
    } else {
        res.json(properties);
    }
};

export const create = async (req, res) => {
    const properties = await Property.create({
        ...req.body,
        host: req.session.user.id,
    });
    res.status(201).json(properties);
};

export const update = async (req, res) => {
    const property = await Property.findById(req.params.id);   

    if (property === null) {
        throw createError(404, "Property not found"); 
    }

    if (property.host.toString() !== req.session.user.id) { 
     
        throw createError(403, "Forbidden");
    }

    const update = await Property.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true, 
    });

    res.json(update);
};

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