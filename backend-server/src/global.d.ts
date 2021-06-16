import { JwtPayload } from "./token";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
