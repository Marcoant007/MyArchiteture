import { Request, Response } from 'express';
import Pino from '../../../../../shared/util/Pino';
import createAlarm from '../../../../../shared/util/CreateAlarmFunction';
import { AlarmRepository } from '../../database/repositories/AlarmRepository'
import FindAlarmByIdUseCase from '../../../useCases/alarm/FindAlarmByIdUseCase';
import FindAllAlarmsByFiltersPagedUseCase from '../../../useCases/alarm/FindAllAlarmsByFiltersPagedUseCase';
import ChangeWhoCheckedAlarmUseCase from '../../../useCases/alarm/ChangeWhoCheckedAlarmUseCase';
import AlarmRequestDTO from '../../../dtos/AlarmRequestDTO';

export class AlarmController {

  public async create(alarm: AlarmRequestDTO) {
    await createAlarm(alarm);
  }

  public async createFromRequest(request: Request, response: Response) {
    try {
      const alarm = request.body;

      const alarmCreated = await createAlarm(alarm);

      return response.status(201).json(alarmCreated);
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }

  public async findById(request: Request, response: Response) {
    const alarmRepository = new AlarmRepository();

    try {
      const { id } = request.params;

      const findAlarmByIdUseCase = new FindAlarmByIdUseCase(alarmRepository);
      const alarm = await findAlarmByIdUseCase.execute({ alarmId: +id });

      return response.status(200).json(alarm);
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }

  public async findAllPAged(request: Request, response: Response) {
    const alarmRepository = new AlarmRepository();

    try {
      const { page, limit, query, checked, organization, user } = request.query;
      const getPage = page || 1;
      const getLimit = limit || 10;
      const getQuery = query ? <string>query : '';
      const getChecked = checked ? <string>checked : '';
      const getOrganization = organization || null;
      const getUser = user || null;

      const findAllAlarmsByFiltersPagedUseCase = new FindAllAlarmsByFiltersPagedUseCase(alarmRepository);
      const { alarms, count } = await findAllAlarmsByFiltersPagedUseCase.execute({
        limit: +getLimit,
        page: +getPage,
        query: getQuery,
        checked: getChecked,
        organizationId: +getOrganization,
        userId: +getUser,
      });

      return response.status(200).json({ alarms, count });
    } catch (err) {
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }

  public async changeWhoChecked(request: Request, response: Response) {
    const alarmRepository = new AlarmRepository();

    try {
      const { id } = request.params;
      const { userId } = request.body;


      const changeWhoCheckedAlarmUseCase = new ChangeWhoCheckedAlarmUseCase(alarmRepository);
      const alarm = await changeWhoCheckedAlarmUseCase.execute({
        alarmId: +id,
        userId
      });

      return response.status(200).json(alarm);
    } catch (err) {
      Pino.error(err);
      Pino.error(err);
      return response.status(err.statusCode || 500).json({ message: err.message, title: err.title });
    }
  }
}

export default new AlarmController();

