import { JwtPayload } from "./token";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}
