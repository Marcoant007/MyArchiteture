import { Request, Response } from 'express';
import Pino from '../../../../../shared/util/Pino';
import createEvent from '../../../../../shared/util/CreateEventFunction';
import { EventRepository } from '../../database/repositories/EventRepository';
import FindEventByIdUseCase from '../../../useCases/event/FindEventByIdUseCase';
import FindAllEventsByFiltersPagedUseCase from '../../../useCases/event/FindAllEventsByFiltersPagedUseCase';
import EventRequestDTO from '../../../dtos/EventRequestDTO';

export class EventController {

  public async create(event: EventRequestDTO) {
    await createEvent(event);
  }

  public async createFromRequest(request: Request, response: Response) {
    try {
      const event = request.body;

      const eventCreated = await createEvent(event);

      return response.status(201).json(eventCreated);
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }

  public async findById(request: Request, response: Response) {
    const eventRepository = new EventRepository();

    try {
      const { id } = request.params;

      const findEventByIdUseCase = new FindEventByIdUseCase(eventRepository);
      const event = await findEventByIdUseCase.execute({ eventId: +id });

      return response.status(200).json(event);
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }

  public async findAllPAged(request: Request, response: Response) {
    const eventRepository = new EventRepository();

    try {
      const { page, limit, query, organization } = request.query;
      const getPage = page || 1;
      const getLimit = limit || 10;
      const getQuery = query ? <string>query : '';
      const getOrganization = organization || null;

      const findAllEventsByFiltersPagedUseCase = new FindAllEventsByFiltersPagedUseCase(eventRepository);
      const { events, count } = await findAllEventsByFiltersPagedUseCase.execute({
        limit: +getLimit,
        page: +getPage,
        query: getQuery,
        organizationId: +getOrganization,
      });

      return response.status(200).json({ events, count });
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }
}

export default new EventController();