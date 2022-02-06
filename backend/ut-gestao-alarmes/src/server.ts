import { createConnection } from 'typeorm';
import app from './shared/infra/http/app';
import pino from "./shared/util/Pino";
import kafkaRoutes from './modules/events/infra/http/routes/KafkaRoutes'

createConnection().then(async connection => {

  app.listen(app.get('port'), async function () {
    pino.info(`🐺 Server runnig ${app.get('port')}`)
    await kafkaRoutes.start();
  })

}).catch(error => pino.fatal(error));
