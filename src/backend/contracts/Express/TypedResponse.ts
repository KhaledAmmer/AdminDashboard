import { Response } from 'express';
import { Send } from 'express-serve-static-core';

type GenericResponse<TPayload> = {
  success: boolean;
  message: string;
  data: TPayload;
};
export interface TypedResponse<ResBody> extends Response {
  json: Send<GenericResponse<ResBody | null | unknown >  , this>;
}
