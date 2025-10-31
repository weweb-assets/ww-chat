<template>
    <div class="ww-message-list">
        <div v-if="messages.length === 0" class="ww-message-list__empty">
            <div class="ww-message-list__empty-message" :style="emptyMessageStyle">{{ emptyMessageText }}</div>
        </div>

        <transition-group name="message-transition" tag="div">
            <div v-for="(message, index) in groupedMessages" :key="message.key">
                <!-- Date separator -->
                <div
                    v-if="message.type === 'date-separator'"
                    class="ww-message-list__date-separator"
                    :style="dateSeparatorStyle"
                >
                    <span>{{ message.date }}</span>
                </div>

                <!-- Message item -->
                <message-item
                    v-else
                    :message="message"
                    :is-own-message="message.senderId === currentUserId"
                    :same-sender-as-previous="isSameSenderAsPrevious(index)"
                    :same-sender-as-next="isSameSenderAsNext(index)"
                    :message-bg-color="messageBgColor"
                    :message-text-color="messageTextColor"
                    :message-font-size="messageFontSize"
                    :message-font-weight="messageFontWeight"
                    :message-font-family="messageFontFamily"
                    :message-border="messageBorder"
                    :message-radius="messageRadius"
                    :own-message-bg-color="ownMessageBgColor"
                    :own-message-text-color="ownMessageTextColor"
                    :own-message-font-size="ownMessageFontSize"
                    :own-message-font-weight="ownMessageFontWeight"
                    :own-message-font-family="ownMessageFontFamily"
                    :own-message-border="ownMessageBorder"
                    :own-message-radius="ownMessageRadius"
                    @attachment-click="handleAttachmentClick"
                    @right-click="handleRightClick"
                />
            </div>
        </transition-group>
    </div>
</template>

<script>
import { computed, inject } from 'vue';
import MessageItem from './MessageItem.vue';
import { formatDate } from '../utils/dateTimeFormatter';

/**
 * @module MessageList
 * @description A component that displays a list of messages, including date separators.
 */
export default {
    name: 'MessageList',
    components: {
        MessageItem,
    },
    props: {
        /**
         * An array of message objects to display.
         * @type {Array}
         */
        messages: {
            type: Array,
            default: () => [],
        },
        /**
         * The ID of the current user.
         * @type {string}
         */
        currentUserId: {
            type: String,
            required: true,
        },
        /**
         * The background color of received messages.
         * @type {string}
         */
        messageBgColor: {
            type: String,
            default: '#f1f5f9',
        },
        /**
         * The text color of received messages.
         * @type {string}
         */
        messageTextColor: {
            type: String,
            default: '#334155',
        },
        /**
         * The font size of received messages.
         * @type {string}
         */
        messageFontSize: {
            type: String,
            default: '0.875rem',
        },
        /**
         * The font weight of received messages.
         * @type {string}
         */
        messageFontWeight: {
            type: String,
            default: '400',
        },
        /**
         * The font family of received messages.
         * @type {string}
         */
        messageFontFamily: {
            type: String,
            default: 'inherit',
        },
        /**
         * The border of received messages.
         * @type {string}
         */
        messageBorder: {
            type: String,
            default: '1px solid #e2e8f0',
        },
        /**
         * The border radius of received messages.
         * @type {string}
         */
        messageRadius: {
            type: String,
            default: '18px 18px 18px 18px',
        },
        /**
         * The background color of sent messages.
         * @type {string}
         */
        ownMessageBgColor: {
            type: String,
            default: '#dbeafe',
        },
        /**
         * The text color of sent messages.
         * @type {string}
         */
        ownMessageTextColor: {
            type: String,
            default: '#1e40af',
        },
        /**
         * The font size of sent messages.
         * @type {string}
         */
        ownMessageFontSize: {
            type: String,
            default: '0.875rem',
        },
        /**
         * The font weight of sent messages.
         * @type {string}
         */
        ownMessageFontWeight: {
            type: String,
            default: '400',
        },
        /**
         * The font family of sent messages.
         * @type {string}
         */
        ownMessageFontFamily: {
            type: String,
            default: 'inherit',
        },
        /**
         * The border of sent messages.
         * @type {string}
         */
        ownMessageBorder: {
            type: String,
            default: '1px solid #bfdbfe',
        },
        /**
         * The border radius of sent messages.
         * @type {string}
         */
        ownMessageRadius: {
            type: String,
            default: '18px 18px 18px 18px',
        },
        /**
         * The text to display when there are no messages.
         * @type {string}
         */
        emptyMessageText: {
            type: String,
            default: 'No messages yet',
        },
        /**
         * The color of the empty message text.
         * @type {string}
         */
        emptyMessageColor: {
            type: String,
            default: '#64748b',
        },
        /**
         * The text color of the date separator.
         * @type {string}
         */
        dateSeparatorTextColor: {
            type: String,
            default: '#64748b',
        },
        /**
         * The line color of the date separator.
         * @type {string}
         */
        dateSeparatorLineColor: {
            type: String,
            default: '#e2e8f0',
        },
        /**
         * The background color of the date separator.
         * @type {string}
         */
        dateSeparatorBgColor: {
            type: String,
            default: '#ffffff',
        },
        /**
         * The border radius of the date separator.
         * @type {string}
         */
        dateSeparatorBorderRadius: {
            type: String,
            default: '4px',
        },
    },
    emits: [
        /**
         * Emitted when an attachment is clicked.
         * @param {Object} attachment - The attachment that was clicked.
         */
        'attachment-click',
        /**
         * Emitted when a message is right-clicked.
         * @param {Object} payload - The event payload.
         * @param {Object} payload.message - The message that was right-clicked.
         * @param {Object} payload.position - The position of the click.
         */
        'message-right-click',
    ],
    setup(props, { emit }) {
        const isEditing = inject(
            'isEditing',
            computed(() => false)
        );

        const dateTimeOptions = inject(
            'dateTimeOptions',
            computed(() => ({}))
        );

        const emptyMessageStyle = computed(() => ({
            color: props.emptyMessageColor,
        }));

        const dateSeparatorStyle = computed(() => ({
            '--date-separator-text-color': props.dateSeparatorTextColor,
            '--date-separator-line-color': props.dateSeparatorLineColor,
            '--date-separator-bg-color': props.dateSeparatorBgColor,
            '--date-separator-border-radius': props.dateSeparatorBorderRadius,
        }));

        const groupedMessages = computed(() => {
            if (!props.messages || props.messages.length === 0) return [];

            const result = [];
            let currentDate = null;

            props.messages.forEach(message => {
                const messageDate = message.timestamp
                    ? new Date(message.timestamp).toDateString()
                    : new Date().toDateString();

                if (messageDate !== currentDate) {
                    currentDate = messageDate;
                    result.push({
                        type: 'date-separator',
                        date: formatDate(message.timestamp, dateTimeOptions.value),
                        key: `date-${messageDate}`,
                    });
                }

                result.push({
                    ...message,
                    key: message.id || `msg-${wwLib.wwUtils.getUid()}`,
                });
            });

            return result;
        });

        /**
         * Checks if the message at a given index has the same sender as the previous message.
         * @param {number} index - The index of the message to check.
         * @returns {boolean} True if the sender is the same as the previous message.
         */
        const isSameSenderAsPrevious = index => {
            if (index === 0) return false;

            const currentMessage = groupedMessages.value[index];
            if (currentMessage.type === 'date-separator') return false;

            let prevIndex = index - 1;
            while (prevIndex >= 0) {
                const prevMessage = groupedMessages.value[prevIndex];
                if (prevMessage.type !== 'date-separator') {
                    return currentMessage.senderId === prevMessage.senderId;
                }
                prevIndex--;
            }

            return false;
        };

        /**
         * Checks if the message at a given index has the same sender as the next message.
         * @param {number} index - The index of the message to check.
         * @returns {boolean} True if the sender is the same as the next message.
         */
        const isSameSenderAsNext = index => {
            if (index === groupedMessages.value.length - 1) return false;

            const currentMessage = groupedMessages.value[index];
            if (currentMessage.type === 'date-separator') return false;

            let nextIndex = index + 1;
            while (nextIndex < groupedMessages.value.length) {
                const nextMessage = groupedMessages.value[nextIndex];
                if (nextMessage.type !== 'date-separator') {
                    return currentMessage.senderId === nextMessage.senderId;
                }
                nextIndex++;
            }

            return false;
        };

        /**
         * Handles the click event on an attachment.
         * @param {Object} attachment - The clicked attachment.
         */
        const handleAttachmentClick = attachment => {
            if (isEditing.value) return;
            emit('attachment-click', attachment);
        };

        /**
         * Handles the right-click event on a message.
         * @param {Object} payload - The event payload.
         * @param {Object} payload.message - The message that was right-clicked.
         * @param {number} payload.elementX - The x-coordinate of the click.
         * @param {number} payload.elementY - The y-coordinate of the click.
         * @param {number} payload.viewportX - The x-coordinate of the click relative to the viewport.
         * @param {number} payload.viewportY - The y-coordinate of the click relative to the viewport.
         */
        const handleRightClick = ({ message, elementX, elementY, viewportX, viewportY }) => {
            if (isEditing.value) return;
            emit('message-right-click', {
                message,
                position: {
                    elementX,
                    elementY,
                    viewportX,
                    viewportY,
                },
            });
        };

        return {
            groupedMessages,
            isSameSenderAsPrevious,
            isSameSenderAsNext,
            handleAttachmentClick,
            handleRightClick,
            emptyMessageStyle,
            dateSeparatorStyle,
            dateTimeOptions,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-message-list {
    display: flex;
    flex-direction: column;

    &__empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
    }

    &__empty-message {
        font-size: 0.875rem;
        font-style: italic;
    }

    &__date-separator {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 16px 0;
        position: relative;

        &::before,
        &::after {
            content: '';
            flex: 1;
            height: 1px;
            background-color: var(--date-separator-line-color, #e2e8f0);
        }

        span {
            padding: 0 12px;
            font-size: 0.75rem;
            color: var(--date-separator-text-color, #64748b);
            background-color: var(--date-separator-bg-color, #ffffff);
            border-radius: var(--date-separator-border-radius, 4px);
        }
    }
}

// Message transition animations
.message-transition-enter-active,
.message-transition-leave-active {
    transition: all 0.3s ease;
}

.message-transition-enter-from,
.message-transition-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.message-transition-move {
    transition: transform 0.3s;
}
</style>
