import Config from "@config/Config";
import { injectable } from "inversify";
import jwt from "jsonwebtoken";

@injectable()
export default  class TokenUtil {
  public async generateToken(params = {}) {
    return jwt.sign(params, Config.tokenEmail.secret, {
      expiresIn: Config.tokenEmail.expireIn,
    });
  }
}
