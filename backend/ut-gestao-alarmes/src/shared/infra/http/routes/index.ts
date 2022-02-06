import { Router } from 'express';

import eventRoutes from '../../../../modules/events/infra/http/routes/EventRoutes';
import alarmRoutes from '../../../../modules/events/infra/http/routes/AlarmRoutes';
import contactRoutes from '../../../../modules/events/infra/http/routes/ContactRoutes';
import actionRoutes from '../../../../modules/events/infra/http/routes/ActionRoutes';

const routes = Router();

routes.use('/v1/event', eventRoutes);
routes.use('/v1/alarm', alarmRoutes);
routes.use('/v1/contact', contactRoutes);
routes.use('/v1/action', actionRoutes);

export default routes;