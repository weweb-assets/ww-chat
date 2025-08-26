<template>
    <div class="ww-chat-input-area">
        <!-- Pending Attachments Display -->
        <div v-if="pendingAttachments.length > 0" class="ww-chat-input-area__attachments">
            <div
                v-for="(attachment, index) in pendingAttachments"
                :key="attachment.id"
                class="ww-chat-input-area__attachment"
            >
                <!-- File info display (for all file types) -->
                <div class="ww-chat-input-area__attachment-file">
                    <div class="ww-chat-input-area__attachment-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
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
                    <div class="ww-chat-input-area__attachment-info">
                        <div class="ww-chat-input-area__attachment-name">{{ attachment.name }}</div>
                        <div class="ww-chat-input-area__attachment-size">{{ formatFileSize(attachment.size) }}</div>
                    </div>
                </div>

                <!-- Remove button -->
                <button
                    class="ww-chat-input-area__attachment-remove"
                    @click.stop="removeAttachment(index)"
                    :title="'Remove ' + attachment.name"
                    :style="{ color: removeIconColor }"
                >
                    <span
                        class="ww-chat-input-area__icon"
                        :style="{ width: removeIconSize, height: removeIconSize }"
                        v-html="removeIconHtml"
                    ></span>
                </button>
            </div>
        </div>

        <div class="ww-chat-input-area__input-row">
            <!-- Attachment button -->
            <label
                v-if="allowAttachments"
                class="ww-chat-input-area__attachment-btn"
                :style="{ color: attachmentIconColor }"
            >
                <input
                    type="file"
                    class="ww-chat-input-area__attachment-input"
                    multiple
                    @change="handleAttachment"
                    :disabled="isDisabled"
                />
                <span
                    class="ww-chat-input-area__icon"
                    :style="{ width: attachmentIconSize, height: attachmentIconSize }"
                    v-html="attachmentIconHtml"
                ></span>
            </label>

            <!-- Input field -->
            <div class="ww-chat-input-area__input-container">
                <textarea
                    ref="textareaRef"
                    v-model="inputValue"
                    class="ww-chat-input-area__input"
                    :placeholder="placeholder"
                    :disabled="isDisabled"
                    @keydown.enter.prevent="onEnterPress"
                    @input="resizeTextarea"
                ></textarea>
            </div>

            <!-- Send button -->
            <button
                type="button"
                class="ww-chat-input-area__send-btn"
                :class="{ 'ww-chat-input-area__send-btn--disabled': !canSend || isDisabled }"
                :disabled="!canSend || isDisabled"
                :style="{ color: sendIconColor }"
                @click="sendMessage"
            >
                <span
                    class="ww-chat-input-area__icon"
                    :style="{ width: sendIconSize, height: sendIconSize }"
                    v-html="sendIconHtml"
                ></span>
            </button>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch, nextTick, onMounted, inject, watchEffect } from 'vue';

export default {
    name: 'InputArea',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
        allowAttachments: {
            type: Boolean,
            default: false,
        },
        pendingAttachments: {
            type: Array,
            default: () => [],
        },
        inputBgColor: {
            type: String,
            default: '#ffffff',
        },
        inputTextColor: {
            type: String,
            default: '#334155',
        },
        inputPlaceholderColor: {
            type: String,
            default: '#94a3b8',
        },
        inputBorder: {
            type: String,
            default: '1px solid #e2e8f0',
        },
        inputMaxHeight: {
            type: String,
            default: '120px',
        },
        inputMinHeight: {
            type: String,
            default: '38px',
        },
        inputBorderRadius: {
            type: String,
            default: '20px',
        },
        placeholder: {
            type: String,
            default: 'Type a message...',
        },
        // Icon properties
        sendIcon: {
            type: String,
            default: 'send',
        },
        sendIconColor: {
            type: String,
            default: '#334155',
        },
        sendIconSize: {
            type: String,
            default: '20px',
        },
        attachmentIcon: {
            type: String,
            default: 'paperclip',
        },
        attachmentIconColor: {
            type: String,
            default: '#334155',
        },
        attachmentIconSize: {
            type: String,
            default: '20px',
        },
        removeIcon: {
            type: String,
            default: 'x',
        },
        removeIconColor: {
            type: String,
            default: '#f43f5e',
        },
        removeIconSize: {
            type: String,
            default: '12px',
        },
    },
    emits: ['update:modelValue', 'send', 'attachment', 'remove-attachment'],
    setup(props, { emit }) {
        const isEditing = inject(
            'isEditing',
            computed(() => false)
        );
        const textareaRef = ref(null);
        const inputValue = ref(props.modelValue);
        const sendIconText = ref(null);
        const attachmentIconText = ref(null);
        const removeIconText = ref(null);

        const { getIcon } = wwLib.useIcons();

        const defaultSendIcon = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>`;

        const defaultAttachmentIcon = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path
                d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
            ></path>
        </svg>`;

        const defaultRemoveIcon = `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>`;

        watchEffect(async () => {
            try {
                if (props.sendIcon) {
                    sendIconText.value = await getIcon(props.sendIcon);
                }
            } catch (error) {
                console.error('Failed to load send icon:', error);
                sendIconText.value = null;
            }
        });

        watchEffect(async () => {
            try {
                if (props.attachmentIcon) {
                    attachmentIconText.value = await getIcon(props.attachmentIcon);
                }
            } catch (error) {
                console.error('Failed to load attachment icon:', error);
                attachmentIconText.value = null;
            }
        });

        watchEffect(async () => {
            try {
                if (props.removeIcon) {
                    removeIconText.value = await getIcon(props.removeIcon);
                }
            } catch (error) {
                console.error('Failed to load remove icon:', error);
                removeIconText.value = null;
            }
        });

        const sendIconHtml = computed(() => {
            return sendIconText.value || defaultSendIcon;
        });

        const attachmentIconHtml = computed(() => {
            return attachmentIconText.value || defaultAttachmentIcon;
        });

        const removeIconHtml = computed(() => {
            return removeIconText.value || defaultRemoveIcon;
        });

        const canSend = computed(() => inputValue.value.trim().length > 0 || props.pendingAttachments.length > 0);

        watch(
            () => props.modelValue,
            newValue => {
                inputValue.value = newValue;
            }
        );

        watch(inputValue, newValue => {
            emit('update:modelValue', newValue);
        });

        const resizeTextarea = () => {
            const textarea = textareaRef.value;
            if (!textarea) return;

            textarea.style.height = 'auto';

            // Parse the max height value, handling units like px, rem, etc.
            const maxHeightValue = parseFloat(props.inputMaxHeight);
            const maxHeightUnit = props.inputMaxHeight.replace(/[\d.]/g, '') || 'px';

            // For simplicity, convert everything to pixels for comparison
            let maxHeightInPx = maxHeightValue;
            if (maxHeightUnit === 'rem') {
                maxHeightInPx = maxHeightValue * 16; // Assume 1rem = 16px
            } else if (maxHeightUnit === 'em') {
                maxHeightInPx = maxHeightValue * 16; // Assume 1em = 16px for this context
            }

            const newHeight = Math.min(textarea.scrollHeight, maxHeightInPx);
            textarea.style.height = `${newHeight}px`;
        };

        const onEnterPress = event => {
            if (isEditing.value) return;

            if (!event.shiftKey && canSend.value && !props.isDisabled) {
                sendMessage();
            } else if (event.shiftKey) {
                nextTick(resizeTextarea);
            }
        };

        const sendMessage = () => {
            if (isEditing.value || !canSend.value || props.isDisabled) return;

            emit('send');
            inputValue.value = '';

            if (textareaRef.value) {
                textareaRef.value.style.height = 'auto';
            }
        };

        const handleAttachment = event => {
            if (isEditing.value || props.isDisabled) return;

            const files = event.target.files;
            if (files && files.length > 0) {
                emit('attachment', files);
                event.target.value = '';
            }
        };

        const removeAttachment = index => {
            if (isEditing.value || props.isDisabled) return;
            emit('remove-attachment', index);
        };

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

        return {
            textareaRef,
            inputValue,
            canSend,
            sendIconHtml,
            attachmentIconHtml,
            removeIconHtml,
            inputAreaStyles: computed(() => ({
                borderTop: props.inputBorder,
            })),
            inputStyles: computed(() => ({
                backgroundColor: props.inputBgColor,
                color: props.inputTextColor,
                border: props.inputBorder,
                '--placeholder-color': props.inputPlaceholderColor,
                maxHeight: props.inputMaxHeight,
                minHeight: props.inputMinHeight,
                borderRadius: props.inputBorderRadius,
            })),
            iconBtnStyles: computed(() => ({
                color: props.inputTextColor,
                opacity: props.isDisabled ? 0.5 : 1,
            })),
            isImageFile,
            formatFileSize,
            resizeTextarea,
            onEnterPress,
            sendMessage,
            handleAttachment,
            removeAttachment,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-chat-input-area {
    display: flex;
    flex-direction: column;
    padding: 12px 16px;
    gap: 8px;
    border-top: v-bind('inputBorder');
    width: 100%;
    flex-shrink: 0;
    background-color: v-bind('inputBgColor');
    position: relative;

    &__input-row {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        width: 100%;
    }

    &__attachments {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 8px;
        max-height: 120px;
        overflow-y: auto;
        padding: 4px;
    }

    &__attachment {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.05);
        padding: 4px;
        max-width: 200px;
        flex-shrink: 0;
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        gap: 4px;
    }

    &__attachment-file {
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 1;
        min-width: 0;
    }

    &__attachment-info {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        flex: 1;
    }

    &__attachment-name {
        font-size: 0.75rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.2;
    }

    &__attachment-size {
        font-size: 0.6875rem;
        opacity: 0.7;
        line-height: 1.2;
    }

    &__attachment-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--ww-color-content-secondary, #64748b);
        flex-shrink: 0;
    }

    &__attachment-remove {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: none;
        background-color: rgba(255, 255, 255, 0.9);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: background-color 0.2s;

        &:hover {
            background-color: rgba(255, 255, 255, 1);
        }
    }

    &__attachment-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.2s;
        flex-shrink: 0;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }
    }

    &__attachment-input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    }

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;

        :deep(svg) {
            width: 100%;
            height: 100%;
        }
    }

    &__input-container {
        position: relative;
        flex: 1;
    }

    &__input {
        width: 100%;
        resize: none;
        min-height: v-bind('inputMinHeight');
        max-height: v-bind('inputMaxHeight');
        padding: 8px 12px;
        border-radius: v-bind('inputBorderRadius');
        font-size: 0.9375rem;
        line-height: 1.4;
        overflow-y: auto;
        transition: border-color 0.2s;
        background-color: v-bind('inputBgColor');
        color: v-bind('inputTextColor');
        border: v-bind('inputBorder');

        &::placeholder {
            color: v-bind('inputPlaceholderColor');
        }

        &:focus {
            outline: none;
        }

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }

    &__send-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: none;
        background: transparent;
        cursor: pointer;
        transition: background-color 0.2s;
        flex-shrink: 0;

        &:hover:not(:disabled) {
            background-color: rgba(0, 0, 0, 0.05);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
}
</style>
