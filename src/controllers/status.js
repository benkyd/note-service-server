export class StatusCodes {
    static pageNotFound(req, res, next) {
        res.status(404).send('404 Page not found');
        next();
    }
}
