
export default {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.DB_PORT,
    urlFrontEnd: process.env.URL_FRONTEND,

    mailConfig: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: (process.env.MAIL_SECURE !== 'false'),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: (process.env.MAIL_REJECT_UNAUTHORIZED !== 'false'),
        }
    },

    tokenEmail: {
        secret: (<string>process.env.TOKEN_EMAIL_SECRET),
        expireIn: (<string | number>process.env.TOKEN_EMAIL_EXPIRE_IN),
    },

    mainDir: <string>process.env.MAIN_DIR
}