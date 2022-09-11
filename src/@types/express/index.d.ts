import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        isAdm: boolean;
        isActive: boolean;
        id: string;
      };
      idParams: {
        id: string;
      };
    }
  }
}
