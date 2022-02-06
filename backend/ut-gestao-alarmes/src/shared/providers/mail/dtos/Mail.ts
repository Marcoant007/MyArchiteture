class Mail {
  subject: string;
  from: string;
  to: string | string[];
  message: string;
  text: string;

  constructor(to: string | string[], from: string) {
    this.to = to;
    this.from = from;
  }
}

export default Mail;