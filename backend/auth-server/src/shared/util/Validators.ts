import { injectable } from "inversify";

interface ValidatorResponse {
  response?: string;
  valid: boolean;
}
@injectable()
export default class Validators {

  public verifyEmail(email: string) {
    const regexpEmail = new RegExp('^[a-zA-Z0-9_+&*-]+(?:.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+.)+[a-zA-Z]{2,7}');

    if (!regexpEmail.test(email)) {
      return {
        response: 'Email inválido',
        valid: false
      };
    }

    return {
      valid: true
    };
  }

  public verifyPassword(password: string) {
    const regexpPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

    if (!regexpPassword.test(password)) {

      return {
        response: 'Senha inválida. A senha deve conter:\n' +
          '- Pelo menos 8 caracteres;\n' +
          '- Pelo menos uma letra maiúscula;\n' +
          '- Pelo menos uma letra minúscula;\n' +
          '- Pelo menos um número;\n' +
          '- Pelo menos um caractere especial.',
        valid: false
      };

    }

    return {
      valid: true
    };
  }

  public verifyDoc(cpf_cnpj: string): ValidatorResponse {
    cpf_cnpj = cpf_cnpj.replace(/[\.\-\/]/g, '')

    if (cpf_cnpj.length === 11)
      return this.validateCpf(cpf_cnpj);

    if (cpf_cnpj.length === 14)
      return this.validateCnpj(cpf_cnpj);

    return {
      response: 'Tamanho do documento inválido',
      valid: false
    }; // tamanho do documento inválido
  }

  public validateCpf(cpf: string): ValidatorResponse {
    cpf = cpf.replace(/[\.\-\/]/g, '')

    var firstDigit = 0;
    for (let i = 0; i < 9; i++) {
      firstDigit += parseInt(cpf[i]) * (10 - i);
    }

    var remainder = firstDigit % 11;
    firstDigit = (remainder < 2) ?
      0 :
      11 - remainder;

    if (firstDigit !== parseInt(cpf[9]))
      return {
        response: 'CPF inválido',
        valid: false
      };// primeiro digito inválido

    var secondDigit = 0;
    for (let i = 0; i < 10; i++) {
      secondDigit += parseInt(cpf[i]) * (11 - i);
    }

    remainder = secondDigit % 11;
    secondDigit = (remainder < 2) ?
      0 :
      11 - remainder;

    if (secondDigit !== parseInt(cpf[10]))
      return {
        response: 'CPF inválido',
        valid: false
      };// segundo digito inválido

    return {
      valid: true
    };// tudo certo
  }

  public validateCnpj(cnpj: string): ValidatorResponse {
    cnpj = cnpj.replace(/[\.\-\/]/g, '')

    var firstDigit = 0;
    for (let i = 0; i < 4; i++) {
      firstDigit += parseInt(cnpj[i]) * (5 - i);
    }
    for (let i = 4; i < 12; i++) {
      firstDigit += parseInt(cnpj[i]) * (13 - i);
    }

    var remainder = firstDigit % 11;
    firstDigit = (remainder < 2) ?
      0 :
      11 - remainder;

    if (firstDigit !== parseInt(cnpj[12]))
      return {
        response: 'CNPJ inválido',
        valid: false
      };// primeiro digito inválido

    var secondDigit = 0;
    for (let i = 0; i < 5; i++) {
      secondDigit += parseInt(cnpj[i]) * (6 - i);
    }
    for (let i = 5; i < 13; i++) {
      secondDigit += parseInt(cnpj[i]) * (14 - i);
    }

    var remainder = secondDigit % 11;
    secondDigit = (remainder < 2) ?
      0 :
      11 - remainder;

    if (secondDigit !== parseInt(cnpj[13]))
      return {
        response: 'CNPJ inválido',
        valid: false
      };// primeiro digito inválido

    return {
      valid: true
    };// tudo certo
  }
}
