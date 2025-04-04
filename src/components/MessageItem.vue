<template>
    <div
        class="ww-message-item"
        :class="{
            'ww-message-item--own': isOwnMessage,
            'ww-message-item--continued': sameSenderAsPrevious,
            'ww-message-item--continue-next': sameSenderAsNext,
        }"
    >
        <!-- Message content -->
        <div
            class="ww-message-item__content"
            :class="{ 'ww-message-item__content--own': isOwnMessage }"
            :style="messageStyles"
            @contextmenu.prevent="handleRightClick"
        >
            <!-- Sender name if first in group -->
            <div
                v-if="!sameSenderAsPrevious"
                class="ww-message-item__sender"
                :class="{ 'ww-message-item__sender--own': isOwnMessage }"
            >
                {{ message.userName }}
            </div>

            <!-- Message text -->
            <div class="ww-message-item__text">
                {{ message.text }}
            </div>

            <!-- Attachments if any -->
            <div v-if="message.attachments && message.attachments.length" class="ww-message-item__attachments">
                <div
                    v-for="attachment in message.attachments"
                    :key="attachment.id"
                    class="ww-message-item__attachment"
                    @click="handleAttachmentClick(attachment)"
                >
                    <!-- Image preview for image files -->
                    <div v-if="isImageFile(attachment)" class="ww-message-item__attachment-preview">
                        <img :src="attachment.url" :alt="attachment.name" />
                    </div>

                    <!-- File icon for non-image files -->
                    <div v-else class="ww-message-item__attachment-file">
                        <div class="ww-message-item__attachment-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                            </svg>
                        </div>
                        <div class="ww-message-item__attachment-info">
                            <div class="ww-message-item__attachment-name">{{ attachment.name }}</div>
                            <div class="ww-message-item__attachment-size">{{ formatFileSize(attachment.size) }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Message timestamp -->
            <div class="ww-message-item__time">
                {{ formatMessageTime(message.timestamp) }}
            </div>
        </div>
    </div>
</template>

<script>
import { computed, inject } from 'vue';
import { formatTime } from '../utils/dateTimeFormatter';

export default {
    name: 'MessageItem',
    props: {
        message: {
            type: Object,
            required: true,
        },
        isOwnMessage: {
            type: Boolean,
            default: false,
        },
        sameSenderAsPrevious: {
            type: Boolean,
            default: false,
        },
        sameSenderAsNext: {
            type: Boolean,
            default: false,
        },
        messageBgColor: {
            type: String,
            default: '#f1f5f9',
        },
        messageTextColor: {
            type: String,
            default: '#334155',
        },
        messageBorder: {
            type: String,
            default: '1px solid #e2e8f0',
        },
        ownMessageBgColor: {
            type: String,
            default: '#dbeafe',
        },
        ownMessageTextColor: {
            type: String,
            default: '#1e40af',
        },
        ownMessageBorder: {
            type: String,
            default: '1px solid #bfdbfe',
        },
    },
    emits: ['attachment-click', 'right-click'],
    setup(props, { emit }) {
        const isEditing = inject(
            'isEditing',
            computed(() => false)
        );

        const dateTimeOptions = inject(
            'dateTimeOptions',
            computed(() => ({}))
        );

        const messageStyles = computed(() => {
            if (props.isOwnMessage) {
                return {
                    backgroundColor: props.ownMessageBgColor,
                    color: props.ownMessageTextColor,
                    border: props.ownMessageBorder,
                };
            } else {
                return {
                    backgroundColor: props.messageBgColor,
                    color: props.messageTextColor,
                    border: props.messageBorder,
                };
            }
        });

        const isImageFile = attachment => {
            if (!attachment.type) return false;
            return attachment.type.startsWith('image/');
        };

        const formatFileSize = bytes => {
            if (!bytes || bytes === 0) return '0 Bytes';

            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
        };

        const formatMessageTime = timestamp => {
            return formatTime(timestamp, dateTimeOptions.value);
        };

        const handleAttachmentClick = attachment => {
            if (isEditing.value) return;
            emit('attachment-click', attachment);
        };

        const handleRightClick = event => {
            const rect = event.target.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            emit('right-click', { message: props.message, x, y });
        };

        return {
            messageStyles,
            isImageFile,
            formatFileSize,
            formatMessageTime,
            handleAttachmentClick,
            handleRightClick,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-message-item {
    display: flex;
    margin-bottom: 4px;

    &--own {
        justify-content: flex-end;
    }

    &__content {
        max-width: 70%;
        padding: 10px 12px;
        border-radius: 18px;
        position: relative;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

        &:not(.ww-message-item--continued) {
            margin-top: 8px;
        }

        &--own {
            border-bottom-right-radius: 4px;
        }

        .ww-message-item--continued & {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            margin-top: 2px;
        }

        .ww-message-item--own.ww-message-item--continued & {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 4px;
        }

        .ww-message-item--continue-next & {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            margin-bottom: 2px;
        }

        .ww-message-item--own.ww-message-item--continue-next & {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 4px;
        }
    }

    &__sender {
        font-weight: 600;
        font-size: 0.75rem;
        margin-bottom: 2px;
        opacity: 0.8;

        &--own {
            text-align: right;
        }
    }

    &__text {
        font-size: 0.9375rem;
        line-height: 1.4;
        word-break: break-word;
    }

    &__time {
        font-size: 0.6875rem;
        opacity: 0.7;
        text-align: right;
        margin-top: 4px;
        user-select: none;
    }

    &__attachments {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    &__attachment {
        border-radius: 8px;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;

        &:hover {
            opacity: 0.9;
        }
    }

    &__attachment-preview {
        max-width: 250px;
        max-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            max-width: 100%;
            max-height: 200px;
            object-fit: contain;
        }
    }

    &__attachment-file {
        display: flex;
        align-items: center;
        padding: 8px;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 6px;
    }

    &__attachment-icon {
        margin-right: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__attachment-info {
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    &__attachment-name {
        font-size: 0.8125rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 150px;
    }

    &__attachment-size {
        font-size: 0.75rem;
        opacity: 0.7;
    }
}
</style>
