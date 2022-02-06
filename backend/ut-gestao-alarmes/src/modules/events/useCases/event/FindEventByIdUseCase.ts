import IEventRepository from '../../repositories/IEventRepository';
import Event from '../../infra/database/models/Event';
import AppError from '../../../../shared/errors/AppError';

interface Props {
  eventId: number;
}

export default class FindEventByIdUseCase {
  constructor(
    private eventRepository: IEventRepository,
  ) { }

  public async execute({ eventId }: Props): Promise<Event> {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new AppError({
        statusCode: 404,
        title: 'Erro: Evento inexistente',
        message: 'Você está tentando buscar um evento inexistente'
      });
    }

    return event;
  }
}