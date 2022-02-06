import Mustache from "mustache";
import fs from "fs";
import Mail from "./Mail";
import config from "../../config/Config";
import { injectable } from "inversify";
import { User } from "@models/User";


@injectable()
export default class MailFactory {

    public factoryRegisterMail(user: User, passwordEmail:any, tokenEmail: string): Mail {

        let name = user.name;
        let email = user.email;
        let password = passwordEmail;
        let user_type = user.userType;
        let mail = new Mail(email, 'Ativar conta');

        let variables = {
            "name": name,
            "password": password,
            "email": email,
            "usertype": user_type,
            "urlFrontEnd": "frontURl", // TODO colcoar a URL do front aqui
            "tokenEmail": tokenEmail,
        }

        let template = Mustache.render(fs.readFileSync(`src/shared/providers/template/activate-account.html`, 'utf8'), variables);

        mail.message = template;
        mail.subject = 'Bem vindo ao EachOne';

        return mail;
    }

    public factoryRecoverPasswordMail(user: User, tokenEmail: string): Mail {
        let email = user.email;
        let name = user.name;
        let user_type = user.userType;
        let url = config.urlFrontEnd;

        let mail = new Mail(email, 'Recuperar senha');
        let variables = {
            "name": name,
            "urlFrontEnd": url,
            "tokenEmail": tokenEmail,
            "user_type": user_type
        }

        let template = Mustache.render(fs.readFileSync(`src/shared/providers/template/recovery-access.html`, 'utf8'), variables);

        mail.message = template
        mail.subject = "Recupere a sua senha"



        return mail;
    }

    public factoryConfirmPasswordMail(user: User, tokenEmail: string): Mail {
        let email = user.email;
        let name = user.name;
        let user_type = user.userType;
        let url = config.urlFrontEnd;

        let mail = new Mail(email, 'Senha alterada');
        let variables = {
            "name": name,
            "urlFrontEnd": url,
            "tokenEmail": tokenEmail,
            "user_type": user_type
        }

        let template = Mustache.render(fs.readFileSync(`src/shared/providers/template/change-confirmation-screen.html`, 'utf8'), variables);

        mail.message = template;
        mail.subject = "Alteração de senha";

        return mail;

    }
}
