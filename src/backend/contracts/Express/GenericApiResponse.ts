import { Response } from 'express';
import { AppResponse } from './TypedResponse';

export default class GenericApiResponse {
  static ok<ResBody>(
    res: AppResponse<ResBody>,
    body: ResBody
  ): AppResponse<ResBody> {
    return res.status(200).json({
      success: true,
      message: 'Succeed',
      data: body,
    });
  }
  static updated<ResBody>(
    res: AppResponse<ResBody>,
    body: ResBody
  ): AppResponse<ResBody> {
    return res.status(200).json({
      success: true,
      message: 'Updated successfully',
      data: body,
    });
  }
  static deleted<ResBody>(
    res: AppResponse<ResBody>,
    body: ResBody
  ): AppResponse<ResBody> {
    return res.status(200).json({
      success: true,
      message: 'Deleted successfully',
      data: body,
    });
  }
  static created<ResBody>(
    res: AppResponse<ResBody>,
    body: ResBody
  ): AppResponse<ResBody> {
    return res.status(201).json({
      success: true,
      message: 'Created successfully',
      data: body,
    });
  }
  static badRequest<ResBody>(
    res: Response,
    body: ResBody
  ): AppResponse<ResBody> {
    return res.status(400).json({
      success: true,
      message: 'Deleted successfully',
      data: body,
    });
  }
  static notFound<ResBody>(
    res: AppResponse<ResBody>,
    body: ResBody,
    message?: string
  ): AppResponse<ResBody> {
    return res.status(404).json({
      success: true,
      message: message ?? 'Not found',
      data: body,
    });
  }
  static unAuthorized<ResBody>(
    res: AppResponse<ResBody>,
    body: ResBody
  ): AppResponse<ResBody> {
    return res.status(401).json({
      success: true,
      message: 'unAuthorized',
      data: body,
    });
  }
  static forbidden<ResBody>(
    res: AppResponse<ResBody>,
    body: ResBody
  ): AppResponse<ResBody> {
    return res.status(403).json({
      success: true,
      message: 'Forbidden',
      data: body,
    });
  }
  static serverError<ResBody>(
    res: AppResponse<ResBody>,
    body: ResBody
  ): AppResponse<ResBody> {
    return res.status(500).json({
      success: true,
      message: 'Internal Server Error',
      data: body,
    });
  }
}
