export function cors(req, res, next) {
  res.set("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);

  res.set("Access-Control-Allow-Credentials", "true");

  res.set("Access-Control-Allow-Headers", "content-type");

  res.set("Access-Control-Allow-Methods", "GET,POST, PUT, PATCH,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  next();
}