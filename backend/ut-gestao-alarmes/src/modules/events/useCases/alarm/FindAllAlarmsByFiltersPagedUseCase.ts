import IAlarmRepository, { FiltersPagedProps } from '../../repositories/IAlarmRepository';
import AlarmDTO from '../../dtos/AlarmDTO';

interface Props {
  page: number;
  limit: number;
  start?: string;
  end?: string;
  query?: string;
  checked: string;
  organizationId: number;
  userId: number;
}

export default class FindAllAlarmsByFiltersPagedUseCase {
  constructor(
    private alarmRepository: IAlarmRepository,
  ) { }

  public async execute(
    { page, limit, checked, organizationId, userId, query }: Props
  ): Promise<{ alarms: AlarmDTO[], count: number }> {

    const filters: FiltersPagedProps = {
      page,
      limit,
      checked,
      query,
      organizationId: organizationId || null,
    }
    let { alarms, count } = await this.alarmRepository.findAllByFiltersPaged(filters);

    if (userId) {
      alarms = await this.updateAlarmsAsSeen(alarms, userId);
    }

    return { alarms, count };
  }

  private async updateAlarmsAsSeen(alarms: AlarmDTO[], userId: number): Promise<AlarmDTO[]> {
    if (userId) {
      const alarmsToReturn = await this.alarmRepository.updateAsSeen(alarms, userId);

      return alarmsToReturn;
    }

    return alarms;
  }
}