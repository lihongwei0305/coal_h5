import dayjs from "dayjs";

export function formatDate(date, format = 'time') {
    switch (format) {
        case 'year':
            return dayjs(date).format('YYYY');
        case 'month':
            return dayjs(date).format('YYYY-MM');
        case 'date':
            return dayjs(date).format('YYYY-MM-DD');
        case 'time':
            return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
        default:
            return dayjs(date).format(format);
    }
}
