<template>
    <div class="ww-chat-input-area">
        <!-- Pending Attachments Display -->
        <div v-if="pendingAttachments.length > 0" class="ww-chat-input-area__attachments">
            <div
                v-for="(attachment, index) in pendingAttachments"
                :key="attachment.id"
                class="ww-chat-input-area__attachment"
                @click="onPendingAttachmentClick(attachment, index)"
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

        <div class="ww-chat-input-area__input-row" :style="{ alignItems: alignItemsCss }">
            <!-- Attachment button -->
            <label
                v-if="allowAttachments"
                class="ww-chat-input-area__attachment-btn"
                :class="{ 'ww-chat-input-area__attachment-btn--disabled': isUiDisabled }"
                :style="attachmentButtonStyle"
            >
                <input
                    type="file"
                    class="ww-chat-input-area__attachment-input"
                    multiple
                    @change="handleAttachment"
                    :disabled="isUiDisabled"
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
                    :disabled="isUiDisabled"
                    :style="inputStyles"
                    @keydown.enter.prevent="onEnterPress"
                ></textarea>
            </div>

            <!-- Send button -->
            <button
                type="button"
                class="ww-chat-input-area__send-btn"
                :class="{ 'ww-chat-input-area__send-btn--disabled': !canSend || isUiDisabled }"
                :disabled="!canSend || isUiDisabled"
                :style="sendButtonStyle"
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
        // Alignment and button styles
        actionAlign: { type: String, default: 'end' },
        sendButtonBgColor: { type: String, default: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
        sendButtonHoverBgColor: { type: String, default: 'linear-gradient(135deg, #2563eb, #1d4ed8)' },
        sendButtonBorder: { type: String, default: 'none' },
        sendButtonBorderRadius: { type: String, default: '12px' },
        sendButtonSize: { type: String, default: '42px' },
        sendButtonBoxShadow: { type: String, default: '0 2px 4px rgba(59, 130, 246, 0.3)' },
        attachmentButtonBgColor: { type: String, default: '#f8fafc' },
        attachmentButtonHoverBgColor: { type: String, default: '#f1f5f9' },
        attachmentButtonBorder: { type: String, default: '1px solid #e2e8f0' },
        attachmentButtonBorderRadius: { type: String, default: '12px' },
        attachmentButtonSize: { type: String, default: '42px' },
        attachmentButtonBoxShadow: { type: String, default: '0 1px 2px rgba(0, 0, 0, 0.06)' },
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
        inputFontSize: {
            type: String,
            default: '0.875rem',
        },
        inputFontWeight: {
            type: String,
            default: '400',
        },
        inputFontFamily: {
            type: String,
            default: 'inherit',
        },
        inputPlaceholderColor: {
            type: String,
            default: '#94a3b8',
        },
        inputAreaBorder: {
            type: String,
            default: '1px solid #e2e8f0',
        },
        textareaBorder: {
            type: String,
            default: '1px solid #e2e8f0',
        },
        textareaBorderHover: {
            type: String,
            default: '1px solid #cbd5e1',
        },
        textareaBorderFocus: {
            type: String,
            default: '1px solid #3b82f6',
        },
        inputHeight: {
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
    emits: ['update:modelValue', 'send', 'attachment', 'remove-attachment', 'pending-attachment-click'],
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
                sendIconText.value = null;
            }
        });

        watchEffect(async () => {
            try {
                if (props.attachmentIcon) {
                    attachmentIconText.value = await getIcon(props.attachmentIcon);
                }
            } catch (error) {
                attachmentIconText.value = null;
            }
        });

        watchEffect(async () => {
            try {
                if (props.removeIcon) {
                    removeIconText.value = await getIcon(props.removeIcon);
                }
            } catch (error) {
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
        const isUiDisabled = computed(() => props.isDisabled || isEditing.value);

        const alignItemsCss = computed(() => {
            if (props.actionAlign === 'start') return 'flex-start';
            if (props.actionAlign === 'center') return 'center';
            return 'flex-end';
        });

        const sendButtonStyle = computed(() => ({
            color: props.sendIconColor,
            background: props.sendButtonBgColor,
            border: props.sendButtonBorder,
            borderRadius: props.sendButtonBorderRadius,
            width: props.sendButtonSize,
            height: props.sendButtonSize,
            boxShadow: props.sendButtonBoxShadow,
            '--btn-hover-bg': props.sendButtonHoverBgColor,
        }));

        const attachmentButtonStyle = computed(() => ({
            color: props.attachmentIconColor,
            background: props.attachmentButtonBgColor,
            border: props.attachmentButtonBorder,
            borderRadius: props.attachmentButtonBorderRadius,
            width: props.attachmentButtonSize,
            height: props.attachmentButtonSize,
            boxShadow: props.attachmentButtonBoxShadow,
            '--btn-hover-bg': props.attachmentButtonHoverBgColor,
        }));

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
            // No longer needed since we use fixed height
            // The textarea will maintain its fixed height
        };

        const onEnterPress = event => {
            if (isEditing.value) return;

            if (!event.shiftKey && canSend.value && !props.isDisabled) {
                sendMessage();
            }
            // Note: Shift+Enter still works for new lines, just without resizing
        };

        const sendMessage = () => {
            if (isEditing.value || !canSend.value || props.isDisabled) return;

            emit('send');
            inputValue.value = '';
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

        const onPendingAttachmentClick = (attachment, index) => {
            if (props.isDisabled) return;
            emit('pending-attachment-click', { attachment, index });
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
                isUiDisabled,
                sendIconHtml,
                attachmentIconHtml,
                removeIconHtml,
                alignItemsCss,
                sendButtonStyle,
                attachmentButtonStyle,
                inputAreaStyles: computed(() => ({
                    borderTop: props.inputAreaBorder,
                })),
            inputStyles: computed(() => ({
                backgroundColor: props.inputBgColor,
                color: props.inputTextColor,
                '--placeholder-color': props.inputPlaceholderColor,
                height: props.inputHeight,
                borderRadius: props.inputBorderRadius,
                '--textarea-border': props.textareaBorder,
                '--textarea-border-hover': props.textareaBorderHover,
                '--textarea-border-focus': props.textareaBorderFocus,
            })),
            iconBtnStyles: computed(() => ({
                color: props.inputTextColor,
                opacity: props.isDisabled ? 0.5 : 1,
            })),
            isImageFile,
            formatFileSize,

            onEnterPress,
            sendMessage,
            handleAttachment,
            removeAttachment,
            onPendingAttachmentClick,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-chat-input-area {
    display: flex;
    flex-direction: column;
    padding: 16px 20px;
    gap: 12px;
    border-top: v-bind('inputAreaBorder');
    width: 100%;
    flex-shrink: 0;
    background-color: v-bind('inputBgColor');
    position: relative;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.06);

    &__input-row {
        display: flex;
        align-items: flex-end;
        gap: 12px;
        width: 100%;
    }

    &__attachments {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 4px;
        max-height: 120px;
        /* Hide scrollbar by default; show when focused for multiline */
        overflow-y: hidden;
        padding: 6px;
        border-radius: 12px;
        background-color: rgba(0, 0, 0, 0.02);
        position: relative;
        z-index: 2;
    }

    &__attachment {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 12px;
        background-color: #f8fafc;
        padding: 8px 10px;
        max-width: 220px;
        flex-shrink: 0;
        border: 1px solid #e2e8f0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
        gap: 8px;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
    }

    &__attachment-file {
        display: flex;
        align-items: center;
        gap: 8px;
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
        font-size: 0.8125rem;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.3;
        color: #334155;
    }

    &__attachment-size {
        font-size: 0.75rem;
        opacity: 0.65;
        line-height: 1.2;
        color: #64748b;
        font-weight: 500;
    }

    &__attachment-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #64748b;
        flex-shrink: 0;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        background-color: #f1f5f9;
    }

    &__attachment-remove {
        position: absolute;
        top: -6px;
        right: -6px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid #ffffff;
        background: linear-gradient(135deg, #f87171, #ef4444);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        color: white;

        &:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.15);
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        &:active {
            transform: scale(0.95);
        }
    }

    &__attachment-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
        align-self: auto;

        &:hover {
            background: var(--btn-hover-bg, #f1f5f9);
            transform: translateY(-1px);
            box-shadow: var(--btn-hover-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
        }

        &--disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
            box-shadow: none;
            transform: none;
        }

        &:active {
            transform: translateY(0);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
        align-self: flex-end;
        display: flex;
        align-items: flex-end;
    }

    &__input {
        width: 100%;
        resize: none;
        height: v-bind('inputHeight');
        /* Center a single text line vertically based on height and line-height */
        padding: calc((v-bind('inputHeight') - 1.5em) / 2) 16px;
        border-radius: v-bind('inputBorderRadius');
        font-size: v-bind('inputFontSize');
        font-weight: v-bind('inputFontWeight');
        font-family: v-bind('inputFontFamily');
        line-height: 1.5;
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        background-color: v-bind('inputBgColor');
        color: v-bind('inputTextColor');
        border: var(--textarea-border);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
        vertical-align: bottom;
        align-self: flex-end;
        margin: 0;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }

        &::placeholder {
            color: v-bind('inputPlaceholderColor');
            font-weight: 400;
        }

        &:hover {
            border: var(--textarea-border-hover);
        }

        &:focus {
            outline: none;
            border: var(--textarea-border-focus);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            background-color: #f8fafc;
        }
    }

    &__send-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
        align-self: auto;

        &:hover:not(:disabled) {
            background: var(--btn-hover-bg, linear-gradient(135deg, #2563eb, #1d4ed8));
            transform: translateY(-1px);
            box-shadow: var(--btn-hover-shadow, 0 4px 8px rgba(59, 130, 246, 0.4));
        }

        &:active:not(:disabled) {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.4;
            background: #94a3b8;
            box-shadow: none;
            transform: none;
        }

        &--disabled {
            background: #e2e8f0;
            color: #94a3b8;
            box-shadow: none;
        }
    }
}
</style>
