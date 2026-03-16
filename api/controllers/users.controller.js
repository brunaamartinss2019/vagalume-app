import createHttpError from "http-errors";
import User from "../models/user.model.js";
import Session from "../models/session.model.js";

//Registro de un nuevo usuario
//Ruta: POST /api/users

export async function create(req, res) {
    const user = await User.create(req.body);
    res.status(201).json(user);
}

//inicio de sesión
//verifica credenciales, crea una sesion en BD y envia cookie httpOnly
//Ruta: POST /api/sesions

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        throw createHttpError(400, "missing email o password");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(401, "invalid credentials");
    }

    //verifica la contraseña
    const match = await user.checkPassword(password);
    if (!match) {
        throw createHttpError(401, "Invalid credentials");
    }

    //crea la sesion en MongoDB
    const session = await Session.create({ user: user.id });

    //Envia la cookie al cliente

    res.cookie("sessionId", session.id, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: process.env.COOKIE_SECURE === "true" ? "none" : undefined,
    });

    res.json(user);
}
//cierre de sesion
//elimina la sesion de la base de datos
//Ruta: DELETE /api/sessions

export async function logout(req, res) {
    await Session.findByIdAndDelete(req.session.id);
    res.status(204).end();
}

//ver perfil publico de un usuario
//Ruta: GET /api/users/:id

export async function detail(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw createHttpError(404, "User not found");
    }
    res.json(user);
}

export async function profile (req, res) {
    res.json(req.session.user);
}