import Alarm from '../infra/database/models/Alarm';
import AlarmCreateDTO from '../dtos/AlarmCreateDTO';
import AlarmDTO from '../dtos/AlarmDTO';

export interface FiltersPagedProps {
  page: number;
  limit: number;
  checked: string;
  organizationId: number;
  query: string;
}

export default interface IAlarmRepository {

  create(alarm: AlarmCreateDTO): Promise<AlarmDTO>;
  findById(id: number): Promise<Alarm>;
  findAllByFiltersPaged(
    { page, limit, checked, organizationId, query }: FiltersPagedProps
  ): Promise<{ alarms: AlarmDTO[], count: number }>;
  update(alarm: Alarm): Promise<AlarmDTO>;
  updateAsSeen(alarmsList: AlarmDTO[], userId: number): Promise<AlarmDTO[]>;
}