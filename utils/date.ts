import dayjs from 'dayjs';
import 'dayjs/locale/ko';

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

export const generateDates = (targetMonth:string) => {
    // Extracting the year and month from the input string
    const generateYear = parseInt(targetMonth.substring(0, 4), 10);
    const month = parseInt(targetMonth.substring(4, 6), 10) - 1; // Month is 0-indexed in JavaScript

    // Creating the first day of the specified month
    const firstDayOfMonth = new Date(generateYear, month, 1);

    const lastDayOfMonth = new Date(generateYear, month + 1, 0);
    
    const currentDate = new Date();
    // Creating the current date object
    const isCurrentDayLastDayOfMonth = () => {
        return currentDate.getFullYear() === lastDayOfMonth.getFullYear() &&
               currentDate.getMonth() === lastDayOfMonth.getMonth() &&
               currentDate.getDate() === lastDayOfMonth.getDate();
    };

    // Determining the relevant date based on the condition
    const relevantDate = isCurrentDayLastDayOfMonth() ? new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1) : lastDayOfMonth ;

    // Function to format a date in 'YYYY/MM/DD' format
    const formatDate = (date:any) => {
        const formattedMonth = ('0' + (date.getMonth() + 1)).slice(-2); // Adding leading zero
        const formattedDay = ('0' + date.getDate()).slice(-2); // Adding leading zero
        return `${date.getFullYear()}.${formattedMonth}.${formattedDay}`;
    };

    return { 
        firstDayOfMonth: formatDate(firstDayOfMonth), 
        relevantDate: formatDate(relevantDate)
    };
}