export function cors(req, res, next){
    res.set("Acess-Control-Allow-Origin", process.env.CORS_ORIGIN);
    next();
}