import { Request, Response, NextFunction } from 'express';

export default function setInfoRequest(request: Request, response: Response, next: NextFunction): void {
    // const tenant = request.headers.tenant;
    // const userType = request.headers.usertype;

    // request.tenant = tenant ? <string>tenant : '';
    // request.userType = userType ? <string>userType : '';

    return next();
}
