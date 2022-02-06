import { Router } from 'express';
import ContactController from '../controllers/ContactController';

export class ContactRoutes {
  public contactRouter: Router;
  public contactController: ContactController;

  constructor() {
    this.contactRouter = Router();
    this.contactController = new ContactController();
  }

  public routes() {
    this.contactRouter.post('/create', this.contactController.create);
    this.contactRouter.get('/find-one/:id', this.contactController.findById);
    this.contactRouter.get('/find-user/:id', this.contactController.findByUserId);
    this.contactRouter.get('/find-all', this.contactController.findAllPAged);
    this.contactRouter.delete('/delete/:id', this.contactController.delete);
    this.contactRouter.put('/update/:id', this.contactController.update);

    return this.contactRouter;
  }
}

export default new ContactRoutes().routes();