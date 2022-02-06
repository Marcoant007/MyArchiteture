declare namespace Express {
    export interface Request {
        tenant: string;
        userType: string;
    }
}