export class StatusCodes {
    static pageNotFound(req, res) {
        res.status(404).end('404 Page not found');
    }
}
