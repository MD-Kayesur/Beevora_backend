import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ContactService } from './contact.service';

const submitContactForm = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.sendContactEmail(req.body);

  if (!result.success) {
    return sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: result.message || 'Failed to send message',
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Message sent successfully!',
    data: result.result,
  });
});

export const ContactController = {
  submitContactForm,
};
