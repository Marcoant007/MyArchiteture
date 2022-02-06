import { Router } from 'express';
import { EventController } from '../controllers/EventController';

export class EventRoutes {
  public eventRouter: Router;
  public eventController: EventController;

  constructor() {
    this.eventRouter = Router();
    this.eventController = new EventController();
  }

  public routes() {
    this.eventRouter.post('/create', this.eventController.createFromRequest);
    this.eventRouter.get('/find-one/:id', this.eventController.findById);
    this.eventRouter.get('/find-all', this.eventController.findAllPAged);

    return this.eventRouter;
  }
}

export default new EventRoutes().routes();