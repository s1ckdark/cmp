import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { first } from 'lodash';

export const getTSBefore = (value: number, unit: 'hour' | 'day' | 'week' | 'year') => {
    return dayjs().subtract(value, unit).toDate();
};

dayjs.locale('ko');

export const getTimeDiff = (_date?: dayjs.ConfigType) => {
    const now = dayjs();
    const date = typeof _date === 'number' ? dayjs.unix(_date) : dayjs(_date);

    const diff = {
        second: now.diff(date, 'second'),
        minute: now.diff(date, 'minute'),
        hour: now.diff(date, 'hour'),
        day: now.diff(date, 'day'),
        week: now.diff(date, 'week'),
        month: now.diff(date, 'month'),
        year: now.diff(date, 'year'),
    };

    return diff;
};

export const getTimeDiffText = (_date?: dayjs.ConfigType, preserveDay?: boolean) => {
    const diff = getTimeDiff(_date);
    const date = typeof _date === 'number' ? dayjs.unix(_date) : dayjs(_date);
    switch (true) {
        case diff.year > 0:
            return preserveDay ? dayjs(date).format('YYYY.MM.DD') : `${diff.year}년 전`;
        case diff.month > 0:
            return preserveDay ? dayjs(date).format('YYYY.MM.DD') : `${diff.month}달 전`;
        case diff.week > 0:
            return preserveDay ? dayjs(date).format('YYYY.MM.DD') : `${diff.week}주 전`;
        case diff.day > 0:
            return preserveDay ? dayjs(date).format('YYYY.MM.DD') : `${diff.day}일 전`;
        case diff.hour > 0:
            return `${diff.hour}시간 전`;
        case diff.minute > 0:
            return `${diff.minute}분 전`;
        default:
            return '방금 전';
    }
};

export const getKRCurrrentTime = () => {
    // Create a new date object for the current time
    var now = new Date();

    // Extract the year, month, day, hours, minutes, and seconds
    var year = now.getFullYear();
    var month = ('0' + (now.getMonth() + 1)).slice(-2); // Add leading zero and months are 0-indexed
    var day = ('0' + now.getDate()).slice(-2); // Add leading zero
    var hours = ('0' + now.getHours()).slice(-2); // Add leading zero
    var minutes = ('0' + now.getMinutes()).slice(-2); // Add leading zero
    var seconds = ('0' + now.getSeconds()).slice(-2); // Add leading zero

    // Format and return the date and time in 'YYYY-MM-DD HH:MM:SS' format
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

export { dayjs };

export const generateDates = (targetMonth: string) => {
    // Creating the first day of the specified month
    const firstDayOfMonth = dayjs(targetMonth).startOf("day").format('YYYY.MM.DD');
    const relevantDayOfMonth = dayjs(targetMonth).endOf("month").format('YYYY.MM.DD');

    return { 
        firstDayOfMonth: firstDayOfMonth, 
        relevantDate: relevantDayOfMonth
    };
};

export const getMonth = (dateStr:string, operation:string) => {
    var year = parseInt(dateStr.substring(0, 4), 10);
    var month = parseInt(dateStr.substring(4, 6), 10) - 1; // JavaScript months are 0-indexed

    var date = new Date(year, month);

    // Adjust the month based on the operation
    if (operation === 'next') {
        date.setMonth(date.getMonth() + 1);
    } else if (operation === 'prev') {
        date.setMonth(date.getMonth() - 1);
    } else if (operation === 'current') {
        date.setMonth(date.getMonth());
    } else {
        throw new Error('Invalid operation: Use "next" or "prev"');
    }

    var adjustedYear = date.getFullYear();
    var adjustedMonth = date.getMonth() + 1; // Convert back to 1-indexed

    return adjustedYear + '년 ' + (adjustedMonth < 10 ? '0' : '') + adjustedMonth + '월';
}

export const getCurrentMonth = () => {
    return dayjs().format('YYYYMM');
}

export const getLastDayOfMonth = (date:Date) => {
    var currentDate = date; // Get the current date
    var year = currentDate.getFullYear(); // Get the current year
    var month = currentDate.getMonth(); // Get the current month (0-11)
    var lastDay = new Date(year, month + 1, 0); // Set date to the last day of the month
    return lastDay; // Return the last day of the month
}