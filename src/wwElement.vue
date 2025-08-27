<template>
    <div class="ww-chat" :class="{ 'ww-chat--disabled': isDisabled }" :style="containerStyles">
        <!-- Chat Header -->
        <ChatHeader
            v-if="displayHeader"
            :user-name="headerUserName"
            :user-avatar="headerUserAvatar"
            :user-location="headerUserLocation"
            :user-status="headerUserStatus"
            :header-bg-color="headerBgColor"
            :text-color="headerTextColor"
            :header-border="headerBorder"
            :header-padding="headerPadding"
            :name-font-size="headerNameFontSize"
            :name-font-weight="headerNameFontWeight"
            :location-font-size="headerLocationFontSize"
            :location-opacity="headerLocationOpacity"
            :close-button-color="headerCloseButtonColor"
            :close-button-bg-hover="headerCloseButtonBgHover"
            :participants="headerParticipants"
            @close="handleClose"
        />

        <!-- Messages Area -->
        <div ref="messagesContainer" class="ww-chat__messages" :style="messagesContainerStyles">
            <MessageList
                :messages="messages"
                :current-user-id="currentUserId"
                :message-bg-color="messageBgColor"
                :message-text-color="messageTextColor"
                :message-font-size="messageFontSize"
                :message-font-weight="messageFontWeight"
                :message-font-family="messageFontFamily"
                :message-border="messageBorder"
                :own-message-bg-color="ownMessageBgColor"
                :own-message-text-color="ownMessageTextColor"
                :own-message-font-size="ownMessageFontSize"
                :own-message-font-weight="ownMessageFontWeight"
                :own-message-font-family="ownMessageFontFamily"
                :own-message-border="ownMessageBorder"
                :empty-message-text="emptyMessageText"
                :empty-message-color="emptyMessageColor"
                :date-separator-text-color="dateSeparatorTextColor"
                :date-separator-line-color="dateSeparatorLineColor"
                :date-separator-bg-color="dateSeparatorBgColor"
                :date-separator-border-radius="dateSeparatorBorderRadius"
                @attachment-click="handleAttachmentClick"
                @message-right-click="handleMessageRightClick"
            />
        </div>

        <!-- Input Area -->
        <InputArea
            v-model="newMessage"
            :is-disabled="isDisabled"
            :allow-attachments="allowAttachments"
            :pending-attachments="pendingAttachments"
            :input-bg-color="inputBgColor"
            :input-text-color="inputTextColor"
            :input-font-size="inputFontSize"
            :input-font-weight="inputFontWeight"
            :input-font-family="inputFontFamily"
            :input-placeholder-color="inputPlaceholderColor"
            :input-area-border="inputAreaBorder"
            :textarea-border="textareaBorder"
            :textarea-border-hover="textareaBorderHover"
            :textarea-border-focus="textareaBorderFocus"
            :input-height="inputHeight"
            :input-border-radius="inputBorderRadius"
            :placeholder="inputPlaceholder"
            :send-icon="sendIcon"
            :send-icon-color="sendIconColor"
            :send-icon-size="sendIconSize"
            :attachment-icon="attachmentIcon"
            :attachment-icon-color="attachmentIconColor"
            :attachment-icon-size="attachmentIconSize"
            :remove-icon="removeIcon"
            :remove-icon-color="removeIconColor"
            :remove-icon-size="removeIconSize"
            @send="sendMessage"
            @attachment="handleAttachment"
            @remove-attachment="handleRemoveAttachment"
        />
    </div>
</template>

<script>
import { ref, computed, watch, nextTick, provide, onMounted } from 'vue';
import ChatHeader from './components/ChatHeader.vue';
import MessageList from './components/MessageList.vue';
import InputArea from './components/InputArea.vue';

import {
    enUS,
    enGB,
    enCA,
    enAU,
    enNZ,
    enIE,
    enIN,
    enZA,
    fr,
    frCA,
    frCH,
    de,
    deAT,
    es,
    it,
    itCH,
    pt,
    ptBR,
    ru,
    ja,
    jaHira,
    zhCN as zh,
    zhHK,
    zhTW,
    ko,
    ar,
    arDZ,
    arEG,
    arMA,
    arSA,
    arTN,
    hi,
    bn,
    nl,
    nlBE,
    sv,
    nb,
    nn,
    da,
    fi,
    el,
    tr,
    cs,
    pl,
    ro,
    hu,
    vi,
    th,
    id,
    ms,
    uk,
} from 'date-fns/locale';

export default {
    name: 'Chat',
    components: {
        ChatHeader,
        MessageList,
        InputArea,
    },
    props: {
        content: {
            type: Object,
            required: true,
        },
        /* wwEditor:start */
        wwEditorState: {
            type: Object,
            required: true,
        },
        /* wwEditor:end */
        uid: {
            type: String,
            required: true,
        },
        wwElementState: {
            type: Object,
            required: true,
        },
    },
    emits: ['trigger-event'],
    setup(props, { emit }) {
        const messagesContainer = ref(null);
        const newMessage = ref('');
        const isScrolling = ref(false);
        const pendingAttachments = ref([]);

        const debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(null, args), delay);
            };
        };

        const { value: chatState, setValue: setChatState } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'chatState',
            type: 'object',
            defaultValue: {
                messages: [],
                conversation: {
                    type: 'private',
                    participantCount: 1,
                    otherParticipantCount: 0,
                    participants: [],
                    allParticipants: [],
                },
                currentUser: { id: '', name: '', avatar: '', location: '', status: 'online' },
                utils: { messageCount: 0, isDisabled: false, allowAttachments: false, displayHeader: true },
            },
        });

        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();

        const resolveMapping = (message, mappingFormula, defaultProp) => {
            if (!mappingFormula) return message[defaultProp];
            return resolveMappingFormula(mappingFormula, message);
        };

        const isEditing = computed(() => {
            /* wwEditor:start */
            return props.wwEditorState.isEditing;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        });

        const currentUserId = computed(() => props.content?.currentUserId || 'current-user');
        const rawMessages = computed(() => props.content?.chatHistory || chatState.value?.messages || []);

        const messages = computed(() => {
            return rawMessages.value.map(message => {
                const senderId = resolveMapping(message, props.content?.mappingSenderId, 'senderId') || '';
                const originalUserName = resolveMapping(message, props.content?.mappingUserName, 'userName') || '';

                // Use userSettings from message if available, otherwise use original mapping
                const userSettings = message.userSettings || {};
                const displayUserName = userSettings.userName || originalUserName || 'Unknown User';

                return {
                    id:
                        resolveMapping(message, props.content?.mappingMessageId, 'id') ||
                        `msg-${wwLib.wwUtils.getUid()}`,
                    text: resolveMapping(message, props.content?.mappingMessageText, 'text') || '',
                    senderId: senderId,
                    userName: displayUserName,
                    avatar: userSettings.userAvatar || '',
                    location: userSettings.userLocation || '',
                    status: userSettings.userStatus || 'online',
                    timestamp:
                        resolveMapping(message, props.content?.mappingTimestamp, 'timestamp') ||
                        new Date().toISOString(),
                    attachments: resolveMapping(message, props.content?.mappingAttachments, 'attachments'),
                    userSettings: userSettings,
                    _originalData: message,
                };
            });
        });

        const isDisabled = computed(() => props.content?.disabled || false);
        const displayHeader = computed(() => props.content?.displayHeader !== false);
        const allowAttachments = computed(() => props.content?.allowAttachments || false);
        const inputPlaceholder = computed(() => props.content?.inputPlaceholder || 'Type a message...');

        // User properties - use direct props since we no longer have global user settings
        const userName = computed(() => props.content?.userName || 'User');
        const userAvatar = computed(() => props.content?.userAvatar || '');
        const userLocation = computed(() => props.content?.userLocation || '');
        const userStatus = computed(() => props.content?.userStatus || 'online');

        // Style properties
        const containerStyles = computed(() => ({
            fontFamily: props.content?.fontFamily || 'inherit',
        }));

        const messagesAreaPadding = computed(() => props.content?.messagesAreaPadding || '16px');

        const messagesContainerStyles = computed(() => ({
            backgroundColor: props.content?.messagesAreaBgColor || '#ffffff',
            padding: messagesAreaPadding.value,
        }));

        // Header styles
        const headerBgColor = computed(() => props.content?.headerBgColor || '#ffffff');
        const headerTextColor = computed(() => props.content?.headerTextColor || '#1e293b');
        const headerBorder = computed(() => props.content?.headerBorder || '1px solid #e2e8f0');

        const headerPadding = computed(() => props.content?.headerPadding || '16px');
        const headerNameFontSize = computed(() => props.content?.headerNameFontSize || '18px');
        const headerNameFontWeight = computed(() => props.content?.headerNameFontWeight || '600');
        const headerLocationFontSize = computed(() => props.content?.headerLocationFontSize || '14px');
        const headerLocationOpacity = computed(() => props.content?.headerLocationOpacity || '0.7');
        const headerCloseButtonColor = computed(() => props.content?.headerCloseButtonColor || '#334155');
        const headerCloseButtonBgHover = computed(() => props.content?.headerCloseButtonBgHover || '#dbeafe');

        // Message styles
        const messageBgColor = computed(() => props.content?.messageBgColor || '#f1f5f9');
        const messageTextColor = computed(() => props.content?.messageTextColor || '#334155');
        const messageFontSize = computed(() => props.content?.messageFontSize || '0.875rem');
        const messageFontWeight = computed(() => props.content?.messageFontWeight || '400');
        const messageFontFamily = computed(() => props.content?.messageFontFamily || 'inherit');
        const messageBorder = computed(() => props.content?.messageBorder || '1px solid #e2e8f0');

        const ownMessageBgColor = computed(() => props.content?.ownMessageBgColor || '#dbeafe');
        const ownMessageTextColor = computed(() => props.content?.ownMessageTextColor || '#1e40af');
        const ownMessageFontSize = computed(() => props.content?.ownMessageFontSize || '0.875rem');
        const ownMessageFontWeight = computed(() => props.content?.ownMessageFontWeight || '400');
        const ownMessageFontFamily = computed(() => props.content?.ownMessageFontFamily || 'inherit');
        const ownMessageBorder = computed(() => props.content?.ownMessageBorder || '1px solid #bfdbfe');

        // Input styles
        const inputBgColor = computed(() => props.content?.inputBgColor || '#ffffff');
        const inputTextColor = computed(() => props.content?.inputTextColor || '#334155');
        const inputFontSize = computed(() => props.content?.inputFontSize || '0.875rem');
        const inputFontWeight = computed(() => props.content?.inputFontWeight || '400');
        const inputFontFamily = computed(() => props.content?.inputFontFamily || 'inherit');
        const inputPlaceholderColor = computed(() => props.content?.inputPlaceholderColor || '#94a3b8');
        const inputAreaBorder = computed(() => props.content?.inputAreaBorder || '1px solid #e2e8f0');
        const textareaBorder = computed(() => props.content?.textareaBorder || '1px solid #e2e8f0');
        const textareaBorderHover = computed(() => props.content?.textareaBorderHover || '1px solid #cbd5e1');
        const textareaBorderFocus = computed(() => props.content?.textareaBorderFocus || '1px solid #3b82f6');
        const inputHeight = computed(() => props.content?.inputHeight || '38px');
        const inputBorderRadius = computed(() => props.content?.inputBorderRadius || '8px');

        // Empty message styles
        const emptyMessageText = computed(() => props.content?.emptyMessageText || 'No messages yet');
        const emptyMessageColor = computed(() => props.content?.emptyMessageColor || '#64748b');

        // Date separator styles
        const dateSeparatorTextColor = computed(() => props.content?.dateSeparatorTextColor || '#64748b');
        const dateSeparatorLineColor = computed(() => props.content?.dateSeparatorLineColor || '#e2e8f0');
        const dateSeparatorBgColor = computed(() => props.content?.dateSeparatorBgColor || '#ffffff');
        const dateSeparatorBorderRadius = computed(() => props.content?.dateSeparatorBorderRadius || '8px');

        watch(
            messages,
            () => {
                if (!isScrolling.value) {
                    scrollToBottom();
                }
            },
            { deep: true }
        );

        // Store the latest user settings for event emission
        const latestUserSettings = ref(null);

        // Debounced function to update all current user messages with new settings
        const updateUserMessages = debounce(
            (newUserId, oldUserId, newUserName, newUserAvatar, newUserLocation, newUserStatus) => {
                if (chatState.value?.messages) {
                    const updatedMessages = chatState.value.messages.map(message => {
                        if (
                            message.senderId === newUserId ||
                            (message.senderId === oldUserId && oldUserId !== newUserId)
                        ) {
                            return {
                                ...message,
                                userSettings: {
                                    userName: newUserName || 'User',
                                    userAvatar: newUserAvatar || '',
                                    userLocation: newUserLocation || '',
                                    userStatus: newUserStatus || 'online',
                                },
                            };
                        }
                        return message;
                    });

                    setChatState({
                        ...chatState.value,
                        messages: updatedMessages,
                    });

                    // Store settings for immediate event emission
                    latestUserSettings.value = {
                        userName: newUserName,
                        userAvatar: newUserAvatar,
                        userLocation: newUserLocation,
                        userStatus: newUserStatus,
                    };
                }
            },
            1000
        );

        watch(latestUserSettings, newSettings => {
            if (newSettings) {
                emit('trigger-event', {
                    name: 'settingsChanged',
                    event: newSettings,
                });

                console.log('Log: Settings changed emitted');

                // Reset to avoid duplicate events
                latestUserSettings.value = null;
            }
        });

        // Watch for user settings changes and debounce updates
        watch(
            [
                currentUserId,
                () => props.content?.userName,
                () => props.content?.userAvatar,
                () => props.content?.userLocation,
                () => props.content?.userStatus,
            ],
            (
                [newUserId, newUserName, newUserAvatar, newUserLocation, newUserStatus],
                [oldUserId, oldUserName, oldUserAvatar, oldUserLocation, oldUserStatus]
            ) => {
                // Check if any setting has changed
                const hasChanges =
                    oldUserName !== newUserName ||
                    oldUserAvatar !== newUserAvatar ||
                    oldUserLocation !== newUserLocation ||
                    oldUserStatus !== newUserStatus ||
                    oldUserId !== newUserId;

                if (hasChanges) {
                    updateUserMessages(
                        newUserId,
                        oldUserId,
                        newUserName,
                        newUserAvatar,
                        newUserLocation,
                        newUserStatus
                    );
                }
            },
            { immediate: true }
        );

        const scrollToBottom = async (smooth = false) => {
            await nextTick();
            if (messagesContainer.value) {
                if (smooth) {
                    const lastElement = messagesContainer.value.lastElementChild;
                    if (lastElement) {
                        lastElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    } else {
                        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
                    }
                } else {
                    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
                }
            }
        };

        const sendMessage = () => {
            if (isEditing.value || isDisabled.value || !newMessage.value.trim()) return;

            const attachments = [...pendingAttachments.value];
            pendingAttachments.value = [];

            const message = {
                id: `msg-${wwLib.wwUtils.getUid()}`,
                text: newMessage.value.trim(),
                senderId: currentUserId.value,
                userName: userName.value,
                timestamp: new Date().toISOString(),
                attachments: attachments.length > 0 ? attachments : undefined,
                userSettings: {
                    userName: userName.value,
                    userAvatar: userAvatar.value,
                    userLocation: userLocation.value,
                    userStatus: userStatus.value,
                },
            };

            newMessage.value = '';

            emit('trigger-event', {
                name: 'messageSent',
                event: { message },
            });
        };

        const handleAttachment = files => {
            if (isEditing.value || isDisabled.value) return;

            const attachmentFiles = Array.from(files).map(file => ({
                id: `file-${wwLib.wwUtils.getUid()}`,
                name: file.name,
                type: file.type,
                size: file.size,
                url: URL.createObjectURL(file),
                file,
            }));

            pendingAttachments.value = [...pendingAttachments.value, ...attachmentFiles];
        };

        const handleRemoveAttachment = index => {
            if (isEditing.value || isDisabled.value) return;

            // Release the object URL to avoid memory leaks
            if (pendingAttachments.value[index]?.url) {
                URL.revokeObjectURL(pendingAttachments.value[index].url);
            }

            pendingAttachments.value.splice(index, 1);
        };

        const handleAttachmentClick = attachment => {
            if (isEditing.value) return;

            emit('trigger-event', {
                name: 'attachmentClick',
                event: { attachment },
            });
        };

        const handleMessageRightClick = ({ message, position }) => {
            if (isEditing.value) return;

            emit('trigger-event', {
                name: 'messageRightClick',
                event: { message, position },
            });
        };

        const handleClose = () => {
            if (isEditing.value) return;

            emit('trigger-event', {
                name: 'close',
                event: {},
            });
        };

        const addMessage = message => {
            if (isEditing.value) return;

            const newMessageRaw = {
                id: message.id || `msg-${wwLib.wwUtils.getUid()}`,
                text: message.text || '',
                senderId: message.senderId || '',
                userName: message.userName || '',
                timestamp: message.timestamp || new Date().toISOString(),
                attachments: message.attachments,
                userSettings: message.userSettings || {
                    userName: message.userName || '',
                    userAvatar: message.userAvatar || '',
                    userLocation: message.userLocation || '',
                    userStatus: message.userStatus || 'online',
                },
                ...message,
            };

            const updatedMessages = [...(chatState.value?.messages || []), newMessageRaw];
            setChatState({
                ...chatState.value,
                messages: updatedMessages,
            });

            scrollToBottom();

            if (newMessageRaw.senderId !== currentUserId.value) {
                emit('trigger-event', {
                    name: 'messageReceived',
                    event: { message: newMessageRaw },
                });
            }

            return newMessageRaw;
        };

        // Date/time locale configuration
        const locale = computed(() => {
            if (!props.content?.locale) return enUS;

            const locales = {
                // English variants
                enUS,
                enGB,
                enCA,
                enAU,
                enNZ,
                enIE,
                enIN,
                enZA,
                // French variants
                fr,
                frCA,
                frCH,
                // German variants
                de,
                deAT,
                // Spanish
                es,
                // Italian variants
                it,
                itCH,
                // Portuguese variants
                pt,
                ptBR,
                // Russian
                ru,
                // East Asian languages
                ja,
                jaHira,
                zh,
                zhHK,
                zhTW,
                ko,
                // Arabic variants
                ar,
                arDZ,
                arEG,
                arMA,
                arSA,
                arTN,
                // Indian subcontinent languages
                hi,
                bn,
                // Other European
                nl,
                nlBE,
                sv,
                nb,
                nn,
                da,
                fi,
                el,
                tr,
                cs,
                pl,
                ro,
                hu,
                // Southeast Asian
                vi,
                th,
                id,
                ms,
                // Other
                uk,
            };

            return locales[props.content.locale] || enUS;
        });

        const dateTimeOptions = computed(() => ({
            locale: locale.value,
            timeFormat: props.content?.timeFormat,
            todayText: props.content?.todayText,
            yesterdayText: props.content?.yesterdayText,
            justNowText: props.content?.justNowText,
        }));

        provide('dateTimeOptions', dateTimeOptions);

        const clearMessages = () => {
            if (isEditing.value) return;

            setChatState({
                ...chatState.value,
                messages: [],
            });
        };

        const chatPartners = computed(() => {
            // If no messages, return current user info as fallback
            if (messages.value.length === 0) {
                return {
                    name: userName.value,
                    avatar: userAvatar.value,
                    location: userLocation.value,
                    status: userStatus.value,
                    participants: [],
                    participantsString: '',
                };
            }

            // Get all unique sender IDs from messages
            const allSenderIds = [...new Set(messages.value.map(msg => msg.senderId))];
            const otherSenderIds = allSenderIds.filter(id => id !== currentUserId.value);

            const participants = otherSenderIds.map(senderId => {
                const msg = messages.value.find(m => m.senderId === senderId);
                return msg?.userSettings?.userName || msg?.userName || 'Unknown User';
            });

            const participantsString = participants.join(', ');

            // If no other participants (only current user messages), show current user
            if (otherSenderIds.length === 0) {
                return {
                    name: userName.value,
                    avatar: userAvatar.value,
                    location: userLocation.value,
                    status: userStatus.value,
                    participants: [],
                    participantsString: '',
                };
            }

            // Two participants total (current user + 1 other) - show recipient info
            if (allSenderIds.length === 2 || (otherSenderIds.length === 1 && !props.content?.showSelfInHeader)) {
                const otherUserId = otherSenderIds[0];
                const otherUser = messages.value.find(msg => msg.senderId === otherUserId);

                return {
                    name: otherUser?.userSettings?.userName || otherUser?.userName || 'Unknown User',
                    avatar: otherUser?.userSettings?.userAvatar || otherUser?.avatar || otherUser?.avatarUrl || '',
                    location: otherUser?.userSettings?.userLocation || otherUser?.location || '',
                    status: otherUser?.userSettings?.userStatus || otherUser?.status || 'online',
                    participants,
                    participantsString,
                };
            }

            // Multiple participants (3+) - show group chat info
            const lastOtherMsg = [...messages.value]
                .filter(msg => msg.senderId !== currentUserId.value)
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

            // Use groupChatText if defined, otherwise use default template
            let groupChatName;
            if (props.content?.groupChatText && props.content.groupChatText.trim() !== '') {
                groupChatName = props.content.groupChatText;
            } else {
                const totalParticipants = allSenderIds.length;
                groupChatName = `Group Chat (${totalParticipants} participants)`;
            }

            // For group chat location, use userSettings from the last message sender
            let groupLocation = '';
            if (lastOtherMsg) {
                const displayName = lastOtherMsg.userSettings?.userName || lastOtherMsg.userName;
                groupLocation = `Last message from ${displayName}`;
            }

            return {
                name: groupChatName,
                avatar: props.content?.groupChatAvatar || '',
                location: groupLocation,
                status: 'online',
                participants,
                participantsString,
            };
        });

        const headerUserName = computed(() => chatPartners.value?.name || '');
        const headerUserAvatar = computed(() => chatPartners.value?.avatar || '');
        const headerUserLocation = computed(() => chatPartners.value?.location || '');
        const headerUserStatus = computed(() => chatPartners.value?.status || 'online');
        const headerParticipants = computed(() => chatPartners.value?.participantsString || '');

        // Local context functionality
        const currentLocalContext = ref({});

        const registerChatLocalContext = ({ data, markdown }) => {
            wwLib.wwElement.useRegisterElementLocalContext('chat', data, {}, markdown);
            currentLocalContext.value = { data, markdown };
        };

        // Chat local context data
        const conversationData = computed(() => {
            const allSenderIds = [...new Set(messages.value.map(msg => msg.senderId))];
            const otherSenderIds = allSenderIds.filter(id => id !== currentUserId.value);

            return {
                type: allSenderIds.length <= 2 ? 'private' : 'group',
                participantCount: allSenderIds.length,
                otherParticipantCount: otherSenderIds.length,
                participants: otherSenderIds.map(senderId => {
                    const msg = messages.value.find(m => m.senderId === senderId);
                    return {
                        id: senderId,
                        name: msg?.userSettings?.userName || msg?.userName || 'Unknown User',
                        avatar: msg?.userSettings?.userAvatar || msg?.avatar || msg?.avatarUrl || '',
                        location: msg?.userSettings?.userLocation || '',
                        status: msg?.userSettings?.userStatus || 'online',
                        lastMessageTime: messages.value
                            .filter(m => m.senderId === senderId)
                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]?.timestamp,
                    };
                }),
                allParticipants: allSenderIds.map(senderId => {
                    const msg = messages.value.find(m => m.senderId === senderId);
                    const isCurrentUser = senderId === currentUserId.value;

                    return {
                        id: senderId,
                        name: isCurrentUser
                            ? userName.value
                            : msg?.userSettings?.userName || msg?.userName || 'Unknown User',
                        avatar: isCurrentUser
                            ? userAvatar.value
                            : msg?.userSettings?.userAvatar || msg?.avatar || msg?.avatarUrl || '',
                        location: isCurrentUser ? userLocation.value : msg?.userSettings?.userLocation || '',
                        status: isCurrentUser ? userStatus.value : msg?.userSettings?.userStatus || 'online',
                        isCurrentUser,
                        lastMessageTime: messages.value
                            .filter(m => m.senderId === senderId)
                            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]?.timestamp,
                    };
                }),
            };
        });

        const chatData = computed(() => ({
            messages: messages.value.map((message, index) => ({
                ...message,
                isOwn: message.senderId === currentUserId.value,
                isFirst: index === 0 || messages.value[index - 1].senderId !== message.senderId,
                isLast: index === messages.value.length - 1 || messages.value[index + 1].senderId !== message.senderId,
                participantInfo: conversationData.value.allParticipants.find(p => p.id === message.senderId) || {
                    id: message.senderId,
                    name: message.userSettings?.userName || message.userName || 'Unknown User',
                    avatar: message.userSettings?.userAvatar || message.avatar || '',
                    location: message.userSettings?.userLocation || message.location || '',
                    status: message.userSettings?.userStatus || message.status || 'online',
                    isCurrentUser: message.senderId === currentUserId.value,
                },
            })),
            conversation: conversationData.value,
            currentUser: {
                id: currentUserId.value,
                name: userName.value || '',
                avatar: userAvatar.value || '',
                location: userLocation.value || '',
                status: userStatus.value || 'online',
            },
            utils: {
                messageCount: messages.value.length,
                isDisabled: isDisabled.value,
                allowAttachments: allowAttachments.value,
                displayHeader: displayHeader.value,
            },
        }));

        const chatMarkdown = `### Chat local information

        #### messages
        Array of all messages in the conversation. Each message contains:
        - \`id\`: Unique message identifier
        - \`text\`: Message content
        - \`senderId\`: ID of the message sender
        - \`userName\`: Name of the message sender
        - \`timestamp\`: Message timestamp (ISO string)
        - \`attachments\`: Message attachments (if any)
        - \`isOwn\`: Boolean indicating if message is from current user
        - \`isFirst\`: Boolean indicating if this is first message in a group from this sender
        - \`isLast\`: Boolean indicating if this is last message in a group from this sender
        - \`participantInfo\`: Information about the sender (id, name, avatar, isCurrentUser)

        #### conversation
        Information about the conversation:
        - \`type\`: Conversation type ('private' for 2 participants, 'group' for 3+)
        - \`participantCount\`: Total number of participants including current user
        - \`otherParticipantCount\`: Number of other participants (excluding current user)
        - \`participants\`: Array of other participants (excluding current user)
        - \`allParticipants\`: Array of all participants including current user

        #### currentUser
        Information about the current user:
        - \`id\`: Current user ID
        - \`name\`: Current user name
        - \`avatar\`: Current user avatar URL
        - \`location\`: Current user location
        - \`status\`: Current user status

        #### userSettings (per message)
        Each message contains a userSettings object with user information:
        - \`userName\`: User's display name
        - \`userAvatar\`: User's avatar URL
        - \`userLocation\`: User's location
        - \`userStatus\`: User's status (online, offline, away, busy)
        - Automatically updated for current user's messages when settings change

        #### utils
        Component state information:
        - \`messageCount\`: Total number of messages
        - \`isDisabled\`: Boolean indicating if chat is disabled
        - \`allowAttachments\`: Boolean indicating if attachments are allowed
        - \`displayHeader\`: Boolean indicating if header is displayed`;

        // Sync chatState with local context data
        watch(
            chatData,
            newChatData => {
                setChatState({
                    ...newChatData,
                });
            },
            { deep: true, immediate: true }
        );

        registerChatLocalContext({
            data: chatData,
            markdown: chatMarkdown,
        });

        provide('isEditing', isEditing);
        provide('_wwChat:localContext', currentLocalContext);

        onMounted(() => {
            scrollToBottom();
        });

        return {
            messagesContainer,
            newMessage,
            messages,
            pendingAttachments,

            currentUserId,
            isDisabled,
            displayHeader,
            allowAttachments,
            inputPlaceholder,
            userName,
            userAvatar,
            userLocation,
            userStatus,

            headerUserName,
            headerUserAvatar,
            headerUserLocation,
            headerUserStatus,
            headerParticipants,

            containerStyles,
            messagesContainerStyles,
            headerBgColor,
            headerTextColor,
            headerBorder,

            headerPadding,
            headerNameFontSize,
            headerNameFontWeight,
            headerLocationFontSize,
            headerLocationOpacity,
            headerCloseButtonColor,
            headerCloseButtonBgHover,
            messageBgColor,
            messageTextColor,
            messageFontSize,
            messageFontWeight,
            messageFontFamily,
            messageBorder,
            messagesAreaPadding,
            ownMessageBgColor,
            ownMessageTextColor,
            ownMessageFontSize,
            ownMessageFontWeight,
            ownMessageFontFamily,
            ownMessageBorder,
            inputBgColor,
            inputTextColor,
            inputFontSize,
            inputFontWeight,
            inputFontFamily,
            inputPlaceholderColor,
            inputAreaBorder,
            textareaBorder,
            textareaBorderHover,
            textareaBorderFocus,
            inputHeight,
            inputBorderRadius,

            emptyMessageText,
            emptyMessageColor,

            dateSeparatorTextColor,
            dateSeparatorLineColor,
            dateSeparatorBgColor,
            dateSeparatorBorderRadius,

            // Icons
            sendIcon: computed(() => props.content?.sendIcon || 'send'),
            sendIconColor: computed(() => props.content?.sendIconColor || '#334155'),
            sendIconSize: computed(() => props.content?.sendIconSize || '20px'),
            attachmentIcon: computed(() => props.content?.attachmentIcon || 'paperclip'),
            attachmentIconColor: computed(() => props.content?.attachmentIconColor || '#334155'),
            attachmentIconSize: computed(() => props.content?.attachmentIconSize || '20px'),
            removeIcon: computed(() => props.content?.removeIcon || 'x'),
            removeIconColor: computed(() => props.content?.removeIconColor || '#f43f5e'),
            removeIconSize: computed(() => props.content?.removeIconSize || '12px'),

            // Methods
            scrollToBottom,
            sendMessage,
            handleAttachment,
            handleRemoveAttachment,
            handleAttachmentClick,
            handleMessageRightClick,
            handleClose,
            addMessage,
            clearMessages,
            currentLocalContext,
        };
    },
    methods: {
        actionScrollToBottom(smooth = false) {
            this.scrollToBottom(smooth);
        },
        actionClearMessages() {
            this.clearMessages();
        },
        actionAddMessage(message) {
            return this.addMessage(message);
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-chat {
    --ww-chat-font-family: v-bind('containerStyles.fontFamily');

    --ww-chat-header-bg: v-bind('headerBgColor');
    --ww-chat-header-text: v-bind('headerTextColor');
    --ww-chat-header-border: v-bind('headerBorder');

    --ww-chat-header-padding: v-bind('headerPadding');
    --ww-chat-header-name-font-size: v-bind('headerNameFontSize');
    --ww-chat-header-name-font-weight: v-bind('headerNameFontWeight');
    --ww-chat-header-location-font-size: v-bind('headerLocationFontSize');
    --ww-chat-header-location-opacity: v-bind('headerLocationOpacity');
    --ww-chat-header-close-button-color: v-bind('headerCloseButtonColor');
    --ww-chat-header-close-button-bg-hover: v-bind('headerCloseButtonBgHover');

    --ww-chat-messages-bg: v-bind('messagesContainerStyles.backgroundColor');

    --ww-chat-message-bg: v-bind('messageBgColor');
    --ww-chat-message-text: v-bind('messageTextColor');
    --ww-chat-message-font-size: v-bind('messageFontSize');
    --ww-chat-message-font-weight: v-bind('messageFontWeight');
    --ww-chat-message-font-family: v-bind('messageFontFamily');
    --ww-chat-message-border: v-bind('messageBorder');

    --ww-chat-own-message-bg: v-bind('ownMessageBgColor');
    --ww-chat-own-message-text: v-bind('ownMessageTextColor');
    --ww-chat-own-message-font-size: v-bind('ownMessageFontSize');
    --ww-chat-own-message-font-weight: v-bind('ownMessageFontWeight');
    --ww-chat-own-message-font-family: v-bind('ownMessageFontFamily');
    --ww-chat-own-message-border: v-bind('ownMessageBorder');

    --ww-chat-empty-message-text: v-bind('emptyMessageText');
    --ww-chat-empty-message-color: v-bind('emptyMessageColor');

    --ww-chat-date-separator-text-color: v-bind('dateSeparatorTextColor');
    --ww-chat-date-separator-line-color: v-bind('dateSeparatorLineColor');
    --ww-chat-date-separator-bg-color: v-bind('dateSeparatorBgColor');
    --ww-chat-date-separator-border-radius: v-bind('dateSeparatorBorderRadius');

    --ww-chat-input-bg: v-bind('inputBgColor');
    --ww-chat-input-text: v-bind('inputTextColor');
    --ww-chat-input-font-size: v-bind('inputFontSize');
    --ww-chat-input-font-weight: v-bind('inputFontWeight');
    --ww-chat-input-font-family: v-bind('inputFontFamily');
    --ww-chat-input-placeholder: v-bind('inputPlaceholderColor');
    --ww-chat-input-area-border: v-bind('inputAreaBorder');
    --ww-chat-textarea-border: v-bind('textareaBorder');
    --ww-chat-textarea-border-hover: v-bind('textareaBorderHover');
    --ww-chat-textarea-border-focus: v-bind('textareaBorderFocus');
    --ww-chat-input-height: v-bind('inputHeight');
    --ww-chat-input-border-radius: v-bind('inputBorderRadius');

    --ww-chat-messages-padding: v-bind('messagesAreaPadding');

    display: flex;
    flex-direction: column;
    overflow: hidden;

    font-family: var(--ww-chat-font-family);

    &--disabled {
        opacity: 0.7;
        pointer-events: none;
    }

    .ww-chat-header {
        flex-shrink: 0;
        z-index: 2;
    }
    &__messages {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        scroll-behavior: smooth;
        padding: var(--ww-chat-messages-padding);
        background-color: var(--ww-chat-messages-bg);
        position: relative;
        z-index: 1;
    }

    .ww-chat-input-area {
        flex-shrink: 0;
        z-index: 2;
    }
}
</style>
