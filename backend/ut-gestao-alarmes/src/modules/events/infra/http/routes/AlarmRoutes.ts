import { Router } from 'express';
import { AlarmController } from '../controllers/AlarmController';

export class AlarmRoutes {
  public alarmRouter: Router;
  public alarmController: AlarmController;

  constructor() {
    this.alarmRouter = Router();
    this.alarmController = new AlarmController();
  }

  public routes() {
    this.alarmRouter.post('/create', this.alarmController.createFromRequest);
    this.alarmRouter.get('/find-one/:id', this.alarmController.findById);
    this.alarmRouter.get('/find-all', this.alarmController.findAllPAged);
    this.alarmRouter.put('/check/:id', this.alarmController.changeWhoChecked);

    return this.alarmRouter;
  }
}

export default new AlarmRoutes().routes();