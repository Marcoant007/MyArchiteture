import { Router } from 'express'
import ActionController from '../controllers/ActionController';

export class ActionRoutes {
  public actionRouter: Router;
  public actionController: ActionController;

  constructor() {
    this.actionRouter = Router();
    this.actionController = new ActionController();
  }

  public routes() {
    this.actionRouter.get('/find-all', this.actionController.findAll);

    return this.actionRouter;
  }
}

export default new ActionRoutes().routes();