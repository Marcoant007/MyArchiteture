
export default {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.SEVER_PORT,
    urlFrontEnd: process.env.URL_FRONTEND,
    defaultSmsProvider: process.env.DEFAULT_SMS_PROVIDER,
    testEmail: process.env.TEST_EMAIL,
    testPhone: process.env.TEST_SMS,
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },

    tokenEmail: {
        secret: (<string>process.env.TOKEN_EMAIL_SECRET),
        expireIn: (<string | number>process.env.TOKEN_EMAIL_EXPIRE_IN),
    },

    twilio: {
        accountSid: (<string>process.env.TWI_ACCOUNT_SID),
        authToken: (<string>process.env.TWI_AUTH_TOKEN),
        phoneNumber: (<string>process.env.TWI_PHONE_NUMBER)
    },

    smsEmpresa: {
        apiKey: (<string>process.env.SMS_EMPRESA_KEY)
    },

    sendGrid: {
        apiKey: (<string>process.env.SNDGRD_API_KEY),
        fromEmail: (<string>process.env.SNDGRD_EMAIL),
    },

    mailProvider: (<string>process.env.MAIL_PROVIDER),

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

    kafka: {
        server: process.env.APP_KAFKA_URL,
        port: process.env.APP_KAFKA_PORT
    }
}