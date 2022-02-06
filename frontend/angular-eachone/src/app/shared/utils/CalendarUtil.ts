interface TemporaryDate {
  //Só para as interações que vão acontecer aqui
  dayOfWeek: number;
  day: number;
  month: number;
  year: number;
}

interface Period {
  start: Date;
  end: Date;
}

export class CalendarUtil {
  private monthString = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec']

  public getLastFiveWeeks(): Period[] {
    const currentDate = {
      dayOfWeek: new Date(Date.now()).getDay(),
      day: new Date(Date.now()).getDate(),
      month: new Date(Date.now()).getMonth(),
      year: new Date(Date.now()).getFullYear()
    }

    const weekList = [];

    for (let i = 0; i < 5; i++) {
      weekList.push(this.getWeek({
        dayOfWeek: currentDate.dayOfWeek,
        day: currentDate.day - (7 * i),
        month: currentDate.month,
        year: currentDate.year
      }))
    }

    return weekList
  }

  public getLastTwelveMonths(): { months: Period[], columnNames: string[] } {
    const startOfCurrentMonth = {
      dayOfWeek: 0,
      day: 1,
      month: new Date(Date.now()).getMonth(),
      year: new Date(Date.now()).getFullYear()
    }

    const months = [];
    const columnNames = [];

    for (let i = 0; i < 12; i++) {

      const start = new Date(
        startOfCurrentMonth.year,
        startOfCurrentMonth.month - i,
        1
      );

      const end = new Date(
        startOfCurrentMonth.year,
        startOfCurrentMonth.month - i + 1,
        0
      );

      months.push({ start, end });

      columnNames.push(
        `${this.monthString[start.getMonth()]}/${start.getFullYear()}`
      );
    }

    return { months, columnNames }
  }

  private getWeek(dateBase: TemporaryDate): Period {
    const startOfWeek = {
      dayOfWeek: 0,
      day: dateBase.day - dateBase.dayOfWeek,
      month: dateBase.month,
      year: dateBase.year
    };

    const endOfWeek = {
      dayOfWeek: 6,
      day: startOfWeek.day + 6,
      month: startOfWeek.month,
      year: startOfWeek.year
    }

    return {
      start: new Date(startOfWeek.year, startOfWeek.month, startOfWeek.day),
      end: new Date(endOfWeek.year, endOfWeek.month, endOfWeek.day)
    }
  }
}

export default new CalendarUtil()