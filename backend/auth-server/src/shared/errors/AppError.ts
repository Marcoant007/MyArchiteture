class AppError {
  title: string | undefined;
  message: string;
  statusCode?: number;
  cause?: any;

  constructor({ message, statusCode = 400, title, cause = undefined }: AppError) {
    this.message = message;
    this.statusCode = statusCode;
    this.title = title;
    this.cause = cause;
  }
}

export default AppError;
