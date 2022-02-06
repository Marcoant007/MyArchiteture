import IAlarmRepository from '../../repositories/IAlarmRepository';
import Alarm from '../../infra/database/models/Alarm';
import AppError from '../../../../shared/errors/AppError';

interface Props {
  alarmId: number;
}

export default class FindAlarmByIdUseCase {
  constructor(
    private alarmRepository: IAlarmRepository,
  ) { }

  public async execute({ alarmId }: Props): Promise<Alarm> {
    const alarm = await this.alarmRepository.findById(alarmId);

    if (!alarm) {
      throw new AppError({
        statusCode: 404,
        title: 'Erro: Alarme inexistente',
        message: 'Você está tentando buscar um alarme inexistente'
      });
    }

    return alarm;
  }
}