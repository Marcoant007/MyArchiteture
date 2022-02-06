import { Request, Response } from "express";
import { ActionRepository } from '../../database/repositories/ActionRepository';
import FindAllActionsUseCase from '../../../useCases/action/FindAllActionsUseCase';

export default class BlankController {
  public async findAll(request: Request, response: Response) {
    const actionRepository = new ActionRepository();

    try {
      const findAllActionsUseCase = new FindAllActionsUseCase(actionRepository);
      const actions = await findAllActionsUseCase.execute()

      return response.status(200).json(actions);
    } catch (err) {
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }
}