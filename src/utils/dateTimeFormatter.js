import { format, formatRelative, isToday, isYesterday, differenceInCalendarDays, formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function formatDate(timestamp, options = {}) {
    if (!timestamp) return '';

    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const locale = options.locale || enUS;

    if (isNaN(date.getTime())) return '';

    if (isToday(date)) {
        return options.todayText || 'Today';
    }

    if (isYesterday(date)) {
        return options.yesterdayText || 'Yesterday';
    }

    const daysDiff = differenceInCalendarDays(new Date(), date);

    if (daysDiff < 7) {
        return formatRelative(date, new Date(), { locale });
    }

    if (date.getFullYear() === new Date().getFullYear()) {
        return format(date, 'MMM d', { locale });
    }

    return format(date, 'MMM d, yyyy', { locale });
}

export function formatTime(timestamp, options = {}) {
    if (!timestamp) return '';

    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const locale = options.locale || enUS;

    if (isNaN(date.getTime())) return '';

    return format(date, options.timeFormat || 'h:mm a', { locale });
}

export function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

export function formatRelativeTime(timestamp, options = {}) {
    if (!timestamp) return '';

    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const locale = options.locale || enUS;

    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const secondsDiff = Math.floor((now - date) / 1000);

    if (secondsDiff < 60) {
        return options.justNowText || 'just now';
    }

    if (secondsDiff < 3600) {
        return formatDistanceToNow(date, { addSuffix: true, locale });
    }

    if (secondsDiff < 86400) {
        return formatDistanceToNow(date, { addSuffix: true, locale });
    }

    if (secondsDiff < 604800) {
        return formatDistanceToNow(date, { addSuffix: true, locale });
    }

    return formatDate(date, options);
}
