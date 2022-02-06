import { addHours, format } from "date-fns";


class Utils {

    public getArrayDatesInRange = function (startDate: Date, endDate: Date) {
        var dates = [],
            currentDate = startDate,
            addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            dates.push(currentDate);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };

    public getUniquesItensOfArrayObjects(array: any[]) {
        const uniqueIds = [... new Set(array.map(item => item.id))];

        const uniqueItens = uniqueIds.map(id =>
            array.find(item => item.id == id)
        );

        return uniqueItens;
    }

    public getUniquesItensOfArrayNumber(array: number[]) {
        return [... new Set(array)];
    }


    public convertDateToUTCString(date: Date) {
        return format(addHours(date, -3), "yyyy-MM-dd'T'HH:mm:ss-03:00");
    }


}

export default new Utils();