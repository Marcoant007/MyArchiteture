import IAlarmRepository from '../../repositories/IAlarmRepository';
import Alarm from '../../infra/database/models/Alarm';
import AppError from '../../../../shared/errors/AppError';
import AlarmDTO from '../../dtos/AlarmDTO';

interface Props {
  alarmId: number;
  userId: number;
}

export default class ChangeWhoCheckedAlarmUseCase {
  constructor(
    private alarmRepository: IAlarmRepository,
  ) { }

  public async execute({ alarmId, userId }: Props): Promise<AlarmDTO> {
    const alarmToUpdate = await this.findAlarm(alarmId);

    this.checkIfCanUpdate(alarmToUpdate);

    alarmToUpdate.whoCheckedItId = userId;
    alarmToUpdate.whoSawItId = alarmToUpdate.whoSawItId || userId;

    const alarmUpdated = await this.alarmRepository.update(alarmToUpdate)

    return alarmUpdated;
  }

  private async findAlarm(alarmId: number): Promise<Alarm> {
    const alarm = await this.alarmRepository.findById(alarmId);

    if (!alarm) {
      throw new AppError({
        statusCode: 404,
        title: 'Erro: Alarme inexistente',
        message: 'Você está tentando checar um alarme inexistente'
      });
    }

    return alarm;
  }

  private checkIfCanUpdate(alarm: Alarm) {
    if (alarm.whoCheckedItId) {
      throw new AppError({
        title: 'Erro: Alarme já checado',
        message: 'Você está tentando checar um alarme já checado'
      });
    }
  }
}