<template>
    <div class="ww-chat-input-area" :style="{ borderTop: inputBorder }">
        <!-- Pending Attachments Display -->
        <div v-if="pendingAttachments.length > 0" class="pending-attachments">
            <div v-for="(attachment, index) in pendingAttachments" :key="attachment.id" class="attachment-item">
                <div class="attachment-name">{{ attachment.name }}</div>
                <button
                    class="attachment-remove"
                    @click.stop="removeAttachment(index)"
                    :title="'Remove ' + attachment.name"
                >
                    <span
                        class="icon"
                        :style="{ width: removeIconSize, height: removeIconSize, color: removeIconColor }"
                        v-html="removeIconHtml"
                    ></span>
                </button>
            </div>
        </div>

        <!-- Input Container -->
        <div class="input-container">
            <textarea
                ref="textareaRef"
                v-model="inputValue"
                class="message-input"
                :placeholder="placeholder"
                :disabled="isDisabled"
                :style="inputStyles"
                @keydown.enter.prevent="onEnterPress"
                @input="resizeTextarea"
            ></textarea>

            <!-- Action Button (Send/Attachment) -->
            <transition name="fade">
                <button
                    v-if="canSend && !isDisabled"
                    type="button"
                    class="action-button send-button"
                    :style="[actionButtonPositionStyle, sendButtonStyle, { color: sendIconColor }]"
                    @click="sendMessage"
                >
                    <span
                        class="icon"
                        :style="{ width: sendIconSize, height: sendIconSize }"
                        v-html="sendIconHtml"
                    ></span>
                </button>
                <label
                    v-else-if="allowAttachments && !isDisabled"
                    class="action-button attachment-button"
                    :style="[actionButtonPositionStyle, attachmentButtonStyle, { color: attachmentIconColor }]"
                >
                    <input type="file" class="file-input" multiple @change="handleAttachment" :disabled="isDisabled" />
                    <span
                        class="icon"
                        :style="{ width: attachmentIconSize, height: attachmentIconSize }"
                        v-html="attachmentIconHtml"
                    ></span>
                </label>
            </transition>
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
        // Align action (send/attachment) button vertically: start|center|end
        actionAlign: {
            type: String,
            default: 'end',
            validator: v => ['start', 'center', 'end'].includes(v),
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
        // Send button styling
        sendButtonBgColor: { type: String, default: 'transparent' },
        sendButtonHoverBgColor: { type: String, default: 'rgba(0,0,0,0.05)' },
        sendButtonBorder: { type: String, default: 'none' },
        sendButtonBorderRadius: { type: String, default: '50%' },
        sendButtonSize: { type: String, default: '32px' },
        sendButtonBoxShadow: { type: String, default: 'none' },
        // Attachment button styling
        attachmentButtonBgColor: { type: String, default: 'transparent' },
        attachmentButtonHoverBgColor: { type: String, default: 'rgba(0,0,0,0.05)' },
        attachmentButtonBorder: { type: String, default: 'none' },
        attachmentButtonBorderRadius: { type: String, default: '50%' },
        attachmentButtonSize: { type: String, default: '32px' },
        attachmentButtonBoxShadow: { type: String, default: 'none' },
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

            const newHeight = Math.min(textarea.scrollHeight, parseInt(props.inputMaxHeight));
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

        const maxActionButtonSize = computed(() => {
            const s1 = parseInt(props.sendButtonSize || '32');
            const s2 = parseInt(props.attachmentButtonSize || '32');
            return Math.max(s1 || 32, s2 || 32);
        });

        const actionButtonPositionStyle = computed(() => {
            if (props.actionAlign === 'start') return { top: '8px', bottom: 'auto', transform: 'none' };
            if (props.actionAlign === 'center') return { top: '50%', bottom: 'auto', transform: 'translateY(-50%)' };
            return { bottom: '8px', top: 'auto', transform: 'none' };
        });

        const sendButtonStyle = computed(() => ({
            backgroundColor: props.sendButtonBgColor,
            border: props.sendButtonBorder,
            borderRadius: props.sendButtonBorderRadius,
            boxShadow: props.sendButtonBoxShadow,
            width: props.sendButtonSize,
            height: props.sendButtonSize,
            '--hover-bg-color': props.sendButtonHoverBgColor,
        }));

        const attachmentButtonStyle = computed(() => ({
            backgroundColor: props.attachmentButtonBgColor,
            border: props.attachmentButtonBorder,
            borderRadius: props.attachmentButtonBorderRadius,
            boxShadow: props.attachmentButtonBoxShadow,
            width: props.attachmentButtonSize,
            height: props.attachmentButtonSize,
            '--hover-bg-color': props.attachmentButtonHoverBgColor,
        }));

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
                color: props.inputTextColor,
                border: props.inputBorder,
                '--placeholder-color': props.inputPlaceholderColor,
                maxHeight: props.inputMaxHeight,
                minHeight: props.inputMinHeight,
                borderRadius: props.inputBorderRadius,
                backgroundColor: props.inputBgColor === 'transparent' ? '#ffffff' : props.inputBgColor,
                paddingTop: props.actionAlign === 'start' ? `${8 + maxActionButtonSize.value}px` : undefined,
                paddingBottom: props.actionAlign === 'end' ? `${8 + maxActionButtonSize.value}px` : undefined,
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
            actionButtonPositionStyle,
            sendButtonStyle,
            attachmentButtonStyle,
        };
    },
};
</script>

<style lang="scss" scoped>
.ww-chat-input-area {
    padding: 16px;
    width: 100%;
    background-color: v-bind('inputBgColor');
}

.pending-attachments {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
    max-height: 120px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--ww-color-border-tertiary, #cbd5e1);
        border-radius: 2px;
    }
}

.attachment-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 16px;
    background-color: var(--ww-color-bg-secondary, rgba(0, 0, 0, 0.05));
    padding: 4px 10px;
    height: 28px;
    max-width: 200px;
    flex-shrink: 0;
    border: 1px solid var(--ww-color-border-tertiary, rgba(0, 0, 0, 0.08));
    box-shadow: var(--ww-shadow-small, 0 1px 2px rgba(0, 0, 0, 0.05));
}

.attachment-name {
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
}

.attachment-remove {
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
}

.input-container {
    position: relative;
    width: 100%;
}

.message-input {
    width: 100%;
    resize: none;
    min-height: v-bind('inputMinHeight');
    max-height: v-bind('inputMaxHeight');
    padding: 10px 16px;
    padding-right: 45px; /* Make space for the action button */
    padding-bottom: 12px; /* Ensure enough space at the bottom for the button */
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

    /* Scrollbar styling */
    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--ww-color-border-tertiary, #cbd5e1);
        border-radius: 2px;
    }

    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: var(--ww-color-border-tertiary, #cbd5e1) transparent; /* For Firefox */
}

.action-button {
    position: absolute;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    z-index: 1; /* Ensure button stays above textarea content */

    &:hover {
        background-color: var(--hover-bg-color, rgba(0, 0, 0, 0.05));
    }
}

.file-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(svg) {
        width: 100%;
        height: 100%;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
