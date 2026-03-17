// Middleware de autenticación
// Verifica que cada petición incluya una sesión válida

import createError from "http-errors";
import Session from "../models/session.model.js";
import Review from "../models/review.model.js";

/**
 * Middleware que comprueba la autenticación del usuario.
 * Extrae el sessionId de las cookies, busca la sesión en la base de datos
 * y adjunta la sesión (con el usuario populado) a req.session.
 * Las rutas de registro y login están exentas de autenticación.
 */

//excepciones publicas
//Estas cuatro condiciones son las rutas públicas — si la petición coincide, llama a next() y se salta 
//todo el resto del middleware. Sin esto, nadie podría registrarse ni hacer login porque no tienen sesión todavía.

export async function checkAuth(req, res, next) {
  if (req.method === "POST" && req.path === "/api/users") {
    next();
    return;
  }
  if (req.method === "POST" && req.path === "/api/sessions") {
    next();
    return;
  }
  if (req.method === "GET" && req.path === "/api/properties") {
    next();
    return;
  }

  if (req.method === "GET" && req.path.startsWith("/api/properties/")) {
    next();
    return;
  }


  // Extraer el sessionId de la cookie mediante expresión regular
  //Lee la cabecera cookie de la petición y busca el valor de sessionId usando una expresión regular. 
  // El ?. es optional chaining — si no hay cookie, no falla, simplemente devuelve 

  const sessionId = req.headers.cookie?.match(/sessionId=([^;]+)/)?.[1];

  // Si no hay cookie de sesión, rechazar la petición
  if (!sessionId) {
    throw createError(401, "unauthorized");
  }

  // Buscar la sesión en la base de datos y popular los datos del usuario
  //Busca el documento Session en la base de datos. 
  // .populate("user") sustituye el ID del usuario por los datos completos del usuario.

  const session = await Session.findById(sessionId).populate("user");

  // Si la sesión no existe o ha sido invalidada, rechazar la petición
  if (!session) {
    throw createError(401, "unauthorized");
  }

  // Adjuntar la sesión al objeto request para uso en los controladores
  req.session = session;

  next();
}