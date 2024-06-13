import { HTTP_STATUS } from '../constants/http-status.constant.js';

export function errorHandler(err, req, res, next) {
  const { message, status } = err;

  const errorMessage = message || 'Internal Server Error';
  const errorStatus = status || HTTP_STATUS.INTERNAL_SERVER_ERROR;

  res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
  });
}

