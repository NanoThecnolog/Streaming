declare namespace Express {
    export interface Request {
        user_id: string;
        session_id: string;
        session_token: string;
        profile_id?: string;
    }
}
