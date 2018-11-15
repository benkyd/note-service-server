export class StatusCodes {
    static pageNotFound(req, res, next) {
        res.status(404).end('404 Page not found');
        next();
    }
}
