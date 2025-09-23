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

export default {
    name: 'MessageList',
    components: {
        MessageItem,
    },
    props: {
        messages: {
            type: Array,
            default: () => [],
        },
        currentUserId: {
            type: String,
            required: true,
        },
        messageBgColor: {
            type: String,
            default: '#f1f5f9',
        },
        messageTextColor: {
            type: String,
            default: '#334155',
        },
        messageFontSize: {
            type: String,
            default: '0.875rem',
        },
        messageFontWeight: {
            type: String,
            default: '400',
        },
        messageFontFamily: {
            type: String,
            default: 'inherit',
        },
        messageBorder: {
            type: String,
            default: '1px solid #e2e8f0',
        },
        messageRadius: {
            type: String,
            default: '18px 18px 18px 18px',
        },
        ownMessageBgColor: {
            type: String,
            default: '#dbeafe',
        },
        ownMessageTextColor: {
            type: String,
            default: '#1e40af',
        },
        ownMessageFontSize: {
            type: String,
            default: '0.875rem',
        },
        ownMessageFontWeight: {
            type: String,
            default: '400',
        },
        ownMessageFontFamily: {
            type: String,
            default: 'inherit',
        },
        ownMessageBorder: {
            type: String,
            default: '1px solid #bfdbfe',
        },
        ownMessageRadius: {
            type: String,
            default: '18px 18px 18px 18px',
        },
        emptyMessageText: {
            type: String,
            default: 'No messages yet',
        },
        emptyMessageColor: {
            type: String,
            default: '#64748b',
        },
        dateSeparatorTextColor: {
            type: String,
            default: '#64748b',
        },
        dateSeparatorLineColor: {
            type: String,
            default: '#e2e8f0',
        },
        dateSeparatorBgColor: {
            type: String,
            default: '#ffffff',
        },
        dateSeparatorBorderRadius: {
            type: String,
            default: '4px',
        },
    },
    emits: ['attachment-click', 'message-right-click'],
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

        const handleAttachmentClick = attachment => {
            if (isEditing.value) return;
            emit('attachment-click', attachment);
        };

        const handleRightClick = ({ message, elementX, elementY, viewportX, viewportY, x, y }) => {
            if (isEditing.value) return;
            emit('message-right-click', {
                message,
                position: {
                    elementX,
                    elementY,
                    viewportX,
                    viewportY,
                    // Back-compat
                    x,
                    y,
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
