import { format, formatRelative, isToday, isYesterday, differenceInCalendarDays, formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

/**
 * Formats a timestamp into a human-readable date string.
 * @param {Date|string|number} timestamp - The date to format.
 * @param {object} [options={}] - Formatting options.
 * @param {Locale} [options.locale=enUS] - The date-fns locale object.
 * @param {string} [options.todayText='Today'] - Text to display for today.
 * @param {string} [options.yesterdayText='Yesterday'] - Text to display for yesterday.
 * @returns {string} The formatted date string.
 */
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

/**
 * Formats a timestamp into a time string.
 * @param {Date|string|number} timestamp - The date to format.
 * @param {object} [options={}] - Formatting options.
 * @param {Locale} [options.locale=enUS] - The date-fns locale object.
 * @param {string} [options.timeFormat='h:mm a'] - The time format string.
 * @returns {string} The formatted time string.
 */
export function formatTime(timestamp, options = {}) {
    if (!timestamp) return '';

    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const locale = options.locale || enUS;

    if (isNaN(date.getTime())) return '';

    return format(date, options.timeFormat || 'h:mm a', { locale });
}

/**
 * Checks if two dates are on the same day.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns {boolean} True if the dates are on the same day.
 */
function isSameDay(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

/**
 * Formats a timestamp into a relative time string (e.g., "just now", "5 minutes ago").
 * @param {Date|string|number} timestamp - The date to format.
 * @param {object} [options={}] - Formatting options.
 * @param {Locale} [options.locale=enUS] - The date-fns locale object.
 * @param {string} [options.justNowText='just now'] - Text to display for recent times.
 * @returns {string} The formatted relative time string.
 */
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
