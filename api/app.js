
// Importación de dependencias
import express from "express";
import morgan from "morgan";

// Importación de la configuración de la base de datos (se conecta a MongoDB al importar)
import "./config/db.config.js";

import router from "./config/routes.config.js";

import { errorHandler } from "./middlewares/errors.middleware.js";
import { checkAuth } from "./middlewares/auth.middleware.js";
import { cors } from "./middlewares/cors.middleware.js"

// Creación de la instancia de Express
const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors);
app.use(express.json());
app.use(checkAuth);
app.use("/api", router);
app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

export default app;