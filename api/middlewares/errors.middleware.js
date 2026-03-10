export function errorHandler(err, req, res, next) {
  
  if (err.name === "ValidationError") {
    res.status(400).json(err.errors);
    return;
  }

  if (err.status) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  // Error de cast de Mongoose (ID con formato inválido, por ejemplo un ObjectId mal formado)
  // Devuelve 404 Not Found ya que el recurso no puede ser localizado
  if (err.name === "CastError") {
    res.status(404).json({ message: "Resource not found" });
    return;
  }

  // Error de clave duplicada en MongoDB (código E11000) // Devuelve 409 Conflict
  
  if (err.message?.includes("E11000")) {
    res.status(409).json({ message: "Resource already exist" });
    return;
  }

  // Cualquier otro error no contemplado anteriormente
  // Devuelve 500 Internal Server Error como respuesta genérica
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
}