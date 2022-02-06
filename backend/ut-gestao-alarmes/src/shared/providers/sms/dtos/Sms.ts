class Sms {
  from: string;
  to: string;
  body: string;

  constructor(to: string, from: string, body: string) {
    this.to = to;
    this.from = from;
    this.body = body;
  }
}

export default Sms;