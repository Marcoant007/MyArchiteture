import IActionRepository from '../../repositories/IActionRepository';
import Action from '../../infra/database/models/Action';

export default class FindAllActionsUseCase {
  constructor(
    private actionRepository: IActionRepository,
  ) { }

  async execute(): Promise<Action[]> {
    const actionsList = await this.actionRepository.findAll();

    return actionsList;
  }
}