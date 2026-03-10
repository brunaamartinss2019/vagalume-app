import createHttpError from "http-errors";

export function checkRole(...roles) {
    return(req, res, next) => {
        if (!roles.includes(req.session.user.role)) {
            throw createHttpError(403, "Forbidden");
        }
        next();
    };
}