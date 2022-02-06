class AppError {
  title: string | undefined;
  message: string;
  statusCode?: number;

  constructor({ message, statusCode = 400, title }: AppError) {
    this.message = message;
    this.statusCode = statusCode;
    this.title = title;
  }
}

export default AppError;