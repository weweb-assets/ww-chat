export default {
    editor: {
        label: { en: 'Chat' },
        icon: 'chat',
        customStylePropertiesOrder: [
            // Container styles
            [
                'containerTitle',
                'backgroundColor',
                'containerBorder',
                'containerBorderRadius',
                'containerShadow',
                'fontFamily',
            ],
            // Header styles
            [
                'headerTitle',
                'displayHeader',
                'headerBgColor',
                'headerTextColor',
                'headerBorder',
                'headerBoxShadow',
                'headerPadding',
                'headerNameFontSize',
                'headerNameFontWeight',
                'headerLocationFontSize',
                'headerLocationOpacity',
                'headerCloseButtonColor',
                'headerCloseButtonBgHover',
            ],
            // Messages area styles
            [
                'messagesAreaTitle',
                'messagesAreaBgColor',
                'messagesAreaPadding',
                'messagesAreaHeight',
                'emptyMessageText',
                'emptyMessageColor',
            ],
            // Date separator styles
            [
                'dateSeparatorTitle',
                'dateSeparatorTextColor',
                'dateSeparatorLineColor',
                'dateSeparatorBgColor',
                'dateSeparatorBorderRadius',
            ],
            // Message styles
            [
                'messageTitle',
                'messageBgColor',
                'messageTextColor',
                'messageBorder',
                'ownMessageTitle',
                'ownMessageBgColor',
                'ownMessageTextColor',
                'ownMessageBorder',
            ],
            // Input styles
            [
                'inputAreaTitle',
                'inputBgColor',
                'inputTextColor',
                'inputPlaceholderColor',
                'inputBorder',
                'inputMaxHeight',
                'inputMinHeight',
                'inputBorderRadius',
                'inputPlaceholder',
            ],
            // Icons
            [
                'iconsTitle',
                'sendIcon',
                'sendIconColor',
                'sendIconSize',
                'attachmentIcon',
                'attachmentIconColor',
                'attachmentIconSize',
                'removeIcon',
                'removeIconColor',
                'removeIconSize',
            ],
        ],
        customSettingsPropertiesOrder: [
            // User settings
            [
                'userSettingsTitle',
                'userName',
                'userAvatar',
                'userLocation',
                'userStatus',
                'currentUserId',
                'showSelfInHeader',
            ],
            // Chat settings
            ['chatSettingsTitle', 'groupChatTemplate', 'allowAttachments', 'disabled'],
            // Localization settings
            ['localizationTitle', 'locale', 'timeFormat', 'todayText', 'yesterdayText', 'justNowText'],
            // Chat data
            ['chatDataTitle', 'chatHistory'],
            // Participant data
            [
                'participantDataTitle',
                'participants',
                'mappingParticipantId',
                'mappingParticipantName',
                'mappingParticipantAvatar',
                'mappingParticipantLocation',
                'mappingParticipantStatus',
                'mappingIsCurrentUser',
            ],
            // Message data mapping
            [
                'messageDataTitle',
                'mappingMessageId',
                'mappingMessageText',
                'mappingSenderId',
                'mappingUserName',
                'mappingTimestamp',
                'mappingAttachments',
            ],
        ],
    },
    triggerEvents: [
        {
            name: 'messageSent',
            label: { en: 'On message sent' },
            event: {
                message: {
                    id: 'msg-1',
                    text: 'Hello there!',
                    senderId: 'current-user',
                    userName: 'User',
                    timestamp: new Date().toISOString(),
                },
            },
        },
        {
            name: 'messageReceived',
            label: { en: 'On message received' },
            event: {
                message: {
                    id: 'msg-2',
                    text: 'New message received',
                    senderId: 'other-user',
                    userName: 'Other User',
                    timestamp: new Date().toISOString(),
                },
            },
        },
        {
            name: 'messageRightClick',
            label: { en: 'On message right click' },
            event: {
                message: {
                    id: 'msg-1',
                    text: 'Message content',
                    senderId: 'user-id',
                    userName: 'User Name',
                    timestamp: new Date().toISOString(),
                },
                position: {
                    x: 100,
                    y: 200,
                },
            },
        },
        {
            name: 'attachmentClick',
            label: { en: 'On attachment click' },
            event: {
                attachment: {
                    id: 'file-1',
                    name: 'document.pdf',
                    type: 'application/pdf',
                    size: 1024000,
                    url: 'https://example.com/document.pdf',
                },
            },
        },
        {
            name: 'close',
            label: { en: 'On close' },
            event: {},
        },
    ],
    actions: [
        {
            action: 'scrollToBottom',
            label: { en: 'Scroll to bottom' },
            args: [
                {
                    name: 'smooth',
                    type: 'boolean',
                    label: { en: 'Smooth scroll' },
                },
            ],
        },
        {
            action: 'clearMessages',
            label: { en: 'Clear messages' },
        },
        {
            action: 'addMessage',
            label: { en: 'Add message' },
            args: [
                {
                    name: 'message',
                    type: 'object',
                    label: { en: 'Message' },
                    options: {
                        item: {
                            text: { type: 'string', label: { en: 'Text' } },
                            senderId: { type: 'string', label: { en: 'Sender ID' } },
                            userName: { type: 'string', label: { en: 'Sender Name' } },
                        },
                    },
                },
            ],
        },
    ],
    properties: {
        // ======== APPEARANCE ========

        // Container styles
        containerTitle: {
            type: 'Title',
            label: { en: 'Container' },
            section: 'style',
        },
        backgroundColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#f5f7fb',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color of the chat container',
            },
            /* wwEditor:end */
        },
        containerBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of the chat container',
            },
            /* wwEditor:end */
        },
        containerBorderRadius: {
            label: { en: 'Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '8px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border radius of the chat container',
            },
            /* wwEditor:end */
        },
        containerShadow: {
            label: { en: 'Shadow' },
            type: 'Shadows',
            section: 'style',
            bindable: true,
            defaultValue: '0 2px 8px rgba(0, 0, 0, 0.05)',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Box shadow of the chat container',
            },
            /* wwEditor:end */
        },
        fontFamily: {
            label: { en: 'Font Family' },
            type: 'FontFamily',
            section: 'style',
            bindable: true,
            defaultValue: 'inherit',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font family used throughout the chat',
            },
            /* wwEditor:end */
        },

        // Header styles
        headerTitle: {
            type: 'Title',
            label: { en: 'Header' },
            section: 'style',
        },
        displayHeader: {
            label: { en: 'Display Header' },
            type: 'OnOff',
            section: 'style',
            bindable: true,
            defaultValue: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Whether to display the chat header',
            },
            propertyHelp: {
                tooltip:
                    'Determines whether the chat header with user information is visible or hidden.\n\nThe header displays user details such as name, avatar, status, and location. Turn this off for a more compact chat interface.',
            },
            /* wwEditor:end */
        },
        headerBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#ffffff',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color of the chat header',
            },
            /* wwEditor:end */
        },
        headerTextColor: {
            label: { en: 'Text Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#1e293b',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text color in the chat header',
            },
            /* wwEditor:end */
        },
        headerBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of the chat header',
            },
            /* wwEditor:end */
        },
        headerBoxShadow: {
            label: { en: 'Shadow' },
            type: 'Shadows',
            section: 'style',
            bindable: true,
            defaultValue: '0 1px 2px rgba(0, 0, 0, 0.05)',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Box shadow of the chat header',
            },
            /* wwEditor:end */
        },
        headerPadding: {
            label: { en: 'Padding' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '12px 16px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Padding of the chat header',
            },
            /* wwEditor:end */
        },
        headerNameFontSize: {
            label: { en: 'Name Font Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '1rem',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font size of the user name in header',
            },
            /* wwEditor:end */
        },
        headerNameFontWeight: {
            label: { en: 'Name Font Weight' },
            type: 'TextWeight',
            section: 'style',
            bindable: true,
            defaultValue: '600',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font weight of the user name in header',
            },
            /* wwEditor:end */
        },
        headerLocationFontSize: {
            label: { en: 'Location Font Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '0.875rem',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font size of the location text in header',
            },
            /* wwEditor:end */
        },
        headerLocationOpacity: {
            label: { en: 'Location Opacity' },
            type: 'Number',
            options: {
                min: 0,
                max: 1,
                step: 0.1,
            },
            section: 'style',
            bindable: true,
            defaultValue: 0.7,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'Opacity of the location text in header',
            },
            /* wwEditor:end */
        },
        headerCloseButtonColor: {
            label: { en: 'Close Button Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the close button (leave empty to inherit from header text color)',
            },
            /* wwEditor:end */
        },
        headerCloseButtonBgHover: {
            label: { en: 'Close Button Hover BG' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: 'rgba(0, 0, 0, 0.05)',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color of the close button on hover',
            },
            /* wwEditor:end */
        },

        // Messages area styles
        messagesAreaTitle: {
            type: 'Title',
            label: { en: 'Messages Area' },
            section: 'style',
        },
        messagesAreaBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#ffffff',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color of the messages area',
            },
            /* wwEditor:end */
        },
        messagesAreaPadding: {
            label: { en: 'Padding' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '16px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Padding of the messages area',
            },
            /* wwEditor:end */
        },
        messagesAreaHeight: {
            label: { en: 'Height' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: 'auto',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Specific height for the messages area (use "auto" to fill available space)',
            },
            /* wwEditor:end */
        },
        emptyMessageText: {
            label: { en: 'Empty Message Text' },
            type: 'Text',
            section: 'style',
            bindable: true,
            defaultValue: 'No messages yet',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text to display when there are no messages',
            },
            /* wwEditor:end */
        },
        emptyMessageColor: {
            label: { en: 'Empty Message Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#64748b',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the empty message text',
            },
            /* wwEditor:end */
        },
        dateSeparatorTitle: {
            type: 'Title',
            label: { en: 'Date Separator' },
            section: 'style',
        },
        dateSeparatorTextColor: {
            label: { en: 'Text Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#64748b',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text color of the date separator',
            },
            /* wwEditor:end */
        },
        dateSeparatorLineColor: {
            label: { en: 'Line Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#e2e8f0',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the date separator divider line',
            },
            /* wwEditor:end */
        },
        dateSeparatorBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#ffffff',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color behind the date text',
            },
            /* wwEditor:end */
        },
        dateSeparatorBorderRadius: {
            label: { en: 'Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '4px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border radius of the date separator',
            },
            /* wwEditor:end */
        },

        // Message styles
        messageTitle: {
            type: 'Title',
            label: { en: "Others' Messages" },
            section: 'style',
        },
        messageBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#f1f5f9',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color of messages from others',
            },
            /* wwEditor:end */
        },
        messageTextColor: {
            label: { en: 'Text Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text color of messages from others',
            },
            /* wwEditor:end */
        },
        messageBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of messages from others',
            },
            /* wwEditor:end */
        },

        // Own message styles
        ownMessageTitle: {
            type: 'Title',
            label: { en: 'Your Messages' },
            section: 'style',
        },
        ownMessageBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#dbeafe',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color of your own messages',
            },
            /* wwEditor:end */
        },
        ownMessageTextColor: {
            label: { en: 'Text Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#1e40af',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text color of your own messages',
            },
            /* wwEditor:end */
        },
        ownMessageBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            defaultValue: '1px solid #bfdbfe',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of your own messages',
            },
            /* wwEditor:end */
        },

        // Input area styles
        inputAreaTitle: {
            type: 'Title',
            label: { en: 'Input Area' },
            section: 'style',
        },
        inputBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#ffffff',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color of the message input',
            },
            /* wwEditor:end */
        },
        inputTextColor: {
            label: { en: 'Text Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text color of the message input',
            },
            /* wwEditor:end */
        },
        inputPlaceholderColor: {
            label: { en: 'Placeholder Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#94a3b8',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Placeholder text color in the message input',
            },
            /* wwEditor:end */
        },
        inputBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of the message input',
            },
            /* wwEditor:end */
        },
        inputMaxHeight: {
            label: { en: 'Input Max Height' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '120px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Maximum height of the input area before scrolling',
            },
            /* wwEditor:end */
        },
        inputMinHeight: {
            label: { en: 'Input Min Height' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '38px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Minimum height of the input area',
            },
            /* wwEditor:end */
        },
        inputBorderRadius: {
            label: { en: 'Input Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '20px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border radius of the input field',
            },
            /* wwEditor:end */
        },

        // Icon properties
        iconsTitle: {
            type: 'Title',
            label: { en: 'Icons' },
            section: 'style',
        },
        sendIcon: {
            label: { en: 'Send Icon' },
            type: 'SystemIcon',
            section: 'style',
            bindable: true,
            defaultValue: 'send',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Icon for the send button',
            },
            /* wwEditor:end */
        },
        sendIconColor: {
            label: { en: 'Send Icon Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the send button icon',
            },
            /* wwEditor:end */
        },
        sendIconSize: {
            label: { en: 'Send Icon Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '20px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Size of the send button icon',
            },
            /* wwEditor:end */
        },
        attachmentIcon: {
            label: { en: 'Attachment Icon' },
            type: 'SystemIcon',
            section: 'style',
            bindable: true,
            defaultValue: 'paperclip',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Icon for the attachment button',
            },
            /* wwEditor:end */
        },
        attachmentIconColor: {
            label: { en: 'Attachment Icon Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the attachment button icon',
            },
            /* wwEditor:end */
        },
        attachmentIconSize: {
            label: { en: 'Attachment Icon Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '20px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Size of the attachment button icon',
            },
            /* wwEditor:end */
        },
        removeIcon: {
            label: { en: 'Remove Attachment Icon' },
            type: 'SystemIcon',
            section: 'style',
            bindable: true,
            defaultValue: 'x',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Icon for the remove attachment button',
            },
            /* wwEditor:end */
        },
        removeIconColor: {
            label: { en: 'Remove Icon Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the remove attachment button icon',
            },
            /* wwEditor:end */
        },
        removeIconSize: {
            label: { en: 'Remove Icon Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            defaultValue: '16px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Size of the remove attachment button icon',
            },
            /* wwEditor:end */
        },

        // ======== SETTINGS ========

        // User settings
        userSettingsTitle: {
            type: 'Title',
            label: { en: 'User Settings' },
            section: 'settings',
        },
        userName: {
            label: { en: 'User Name' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'User',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Name to display for the current user',
            },
            propertyHelp: {
                tooltip:
                    'The display name for the current user that will appear on their messages and potentially in the header.\n\n**Examples**: John Doe, Customer Service, Support Agent',
            },
            /* wwEditor:end */
        },
        userAvatar: {
            label: { en: 'User Avatar URL' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: '',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'URL of the user avatar image (initials will be used if empty)',
            },
            propertyHelp: {
                tooltip:
                    "URL to the image that will be displayed as the user's avatar. If left empty, the user's initials will be displayed instead.\n\n**Example**: https://example.com/avatars/user.jpg",
            },
            /* wwEditor:end */
        },
        userLocation: {
            label: { en: 'User Location' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: '',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Location to display under the user name (optional)',
            },
            propertyHelp: {
                tooltip:
                    "Optional information to display under the user's name in the header, such as their location or status.\n\n**Examples**: New York USA, Online, Available until 5 PM",
            },
            /* wwEditor:end */
        },
        userStatus: {
            label: { en: 'User Status' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'online', label: { en: 'Online' } },
                    { value: 'offline', label: { en: 'Offline' } },
                    { value: 'away', label: { en: 'Away' } },
                    { value: 'busy', label: { en: 'Busy' } },
                ],
            },
            section: 'settings',
            bindable: true,
            defaultValue: 'online',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                enum: ['online', 'offline', 'away', 'busy'],
                tooltip: 'Current status of the user',
            },
            propertyHelp: {
                tooltip:
                    'The current availability status of the user, displayed as a colored indicator in the chat header.\n\nEach status has a specific color: online (green), offline (gray), away (yellow), busy (red).',
            },
            /* wwEditor:end */
        },
        currentUserId: {
            label: { en: 'Current User ID' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'current-user',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Unique identifier for the current user (used to identify your messages)',
            },
            propertyHelp: {
                tooltip:
                    'A unique ID that identifies the current user. This is used to determine which messages belong to the user versus other participants.\n\nThe component uses this ID to style messages differently depending on whether they are sent by the current user or others.\n\n**Examples**: user-123, customer-456, agent-789',
            },
            /* wwEditor:end */
        },

        // Chat settings
        chatSettingsTitle: {
            type: 'Title',
            label: { en: 'Chat Settings' },
            section: 'settings',
        },
        groupChatTemplate: {
            label: { en: 'Group Chat Text' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'Group Chat ({count} participants)',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Template for group chat header text. Use {count} as placeholder for number of participants.',
            },
            propertyHelp: {
                tooltip:
                    'The text displayed in the header when there are multiple chat participants.\n\nUse {count} as a placeholder which will be replaced with the actual number of participants in the conversation.\n\n**Examples**: Group Conversation ({count}), Chat Room - {count} people, Team Discussion',
            },
            /* wwEditor:end */
        },
        allowAttachments: {
            label: { en: 'Allow Attachments' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Whether to allow file attachments',
            },
            propertyHelp: {
                tooltip:
                    'Enables the attachment button in the chat input, allowing users to send files and images.\n\nWhen enabled, an attachment button appears next to the input field. Images will be displayed with thumbnails, and other files will show appropriate icons.',
            },
            /* wwEditor:end */
        },
        disabled: {
            label: { en: 'Disabled' },
            type: 'OnOff',
            section: 'settings',
            bindable: true,
            defaultValue: false,
            /* wwEditor:start */
            bindingValidation: {
                type: 'boolean',
                tooltip: 'Whether the chat component is disabled',
            },
            propertyHelp: {
                tooltip:
                    'When enabled, the entire chat component becomes inactive and users cannot send messages.\n\nUse this setting to temporarily disable chat functionality while maintaining the UI. The component will appear faded when disabled.',
            },
            /* wwEditor:end */
        },

        // Localization settings
        localizationTitle: {
            type: 'Title',
            label: { en: 'Localization' },
            section: 'settings',
        },
        locale: {
            label: { en: 'Locale' },
            type: 'TextSelect',
            options: {
                options: [
                    // English variants
                    { value: 'enUS', label: { en: 'English (US)' } },
                    { value: 'enGB', label: { en: 'English (UK)' } },
                    { value: 'enCA', label: { en: 'English (Canada)' } },
                    { value: 'enAU', label: { en: 'English (Australia)' } },
                    { value: 'enNZ', label: { en: 'English (New Zealand)' } },
                    { value: 'enIE', label: { en: 'English (Ireland)' } },
                    { value: 'enIN', label: { en: 'English (India)' } },
                    { value: 'enZA', label: { en: 'English (South Africa)' } },

                    // French variants
                    { value: 'fr', label: { en: 'French (France)' } },
                    { value: 'frCA', label: { en: 'French (Canada)' } },
                    { value: 'frCH', label: { en: 'French (Switzerland)' } },

                    // German variants
                    { value: 'de', label: { en: 'German (Germany)' } },
                    { value: 'deAT', label: { en: 'German (Austria)' } },

                    // Spanish
                    { value: 'es', label: { en: 'Spanish' } },

                    // Italian variants
                    { value: 'it', label: { en: 'Italian (Italy)' } },
                    { value: 'itCH', label: { en: 'Italian (Switzerland)' } },

                    // Portuguese variants
                    { value: 'pt', label: { en: 'Portuguese (Portugal)' } },
                    { value: 'ptBR', label: { en: 'Portuguese (Brazil)' } },

                    { value: 'ru', label: { en: 'Russian' } },

                    // East Asian languages
                    { value: 'ja', label: { en: 'Japanese' } },
                    { value: 'jaHira', label: { en: 'Japanese (Hiragana)' } },
                    { value: 'zh', label: { en: 'Chinese (Simplified)' } },
                    { value: 'zhHK', label: { en: 'Chinese (Hong Kong)' } },
                    { value: 'zhTW', label: { en: 'Chinese (Taiwan)' } },
                    { value: 'ko', label: { en: 'Korean' } },

                    // Arabic variants
                    { value: 'ar', label: { en: 'Arabic' } },
                    { value: 'arDZ', label: { en: 'Arabic (Algeria)' } },
                    { value: 'arEG', label: { en: 'Arabic (Egypt)' } },
                    { value: 'arMA', label: { en: 'Arabic (Morocco)' } },
                    { value: 'arSA', label: { en: 'Arabic (Saudi Arabia)' } },
                    { value: 'arTN', label: { en: 'Arabic (Tunisia)' } },

                    // Indian subcontinent languages
                    { value: 'hi', label: { en: 'Hindi (India)' } },
                    { value: 'bn', label: { en: 'Bengali' } },

                    // Other European languages
                    { value: 'nl', label: { en: 'Dutch (Netherlands)' } },
                    { value: 'nlBE', label: { en: 'Dutch (Belgium)' } },
                    { value: 'sv', label: { en: 'Swedish' } },
                    { value: 'nb', label: { en: 'Norwegian (Bokmål)' } },
                    { value: 'nn', label: { en: 'Norwegian (Nynorsk)' } },
                    { value: 'da', label: { en: 'Danish' } },
                    { value: 'fi', label: { en: 'Finnish' } },
                    { value: 'el', label: { en: 'Greek' } },
                    { value: 'tr', label: { en: 'Turkish' } },
                    { value: 'cs', label: { en: 'Czech' } },
                    { value: 'pl', label: { en: 'Polish' } },
                    { value: 'ro', label: { en: 'Romanian' } },
                    { value: 'hu', label: { en: 'Hungarian' } },

                    // Southeast Asian languages
                    { value: 'vi', label: { en: 'Vietnamese' } },
                    { value: 'th', label: { en: 'Thai' } },
                    { value: 'id', label: { en: 'Indonesian' } },
                    { value: 'ms', label: { en: 'Malay' } },

                    // Other languages
                    { value: 'uk', label: { en: 'Ukrainian' } },
                ],
            },
            section: 'settings',
            bindable: true,
            defaultValue: 'enUS',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Locale code for date/time formatting',
            },
            propertyHelp: {
                tooltip:
                    'Sets the language and regional format for displaying dates and times in the chat.\n\nThis affects how dates, times, and relative time expressions (like "2 hours ago") are formatted according to regional standards.\n\n**Examples**:\n- enUS - "Today at 3:45 PM"\n- fr - "Aujourd\'hui à 15:45"\n- ptBR - "Hoje às 15:45"',
            },
            /* wwEditor:end */
        },
        timeFormat: {
            label: { en: 'Time Format' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'h:mm a',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Format for time display using date-fns format pattern',
            },
            propertyHelp: {
                tooltip:
                    'Determines how time is displayed in the chat using date-fns format patterns.\n\nUses date-fns formatting tokens: h (hours 1-12), H (hours 0-23), mm (minutes), a (am/pm), etc.\n\n**Examples**:\n- h:mm a - "3:45 pm"\n- HH:mm - "15:45"\n- h:mm:ss a - "3:45:30 pm"\n\nSee [date-fns format documentation](https://date-fns.org/docs/format) for all pattern options.',
            },
            /* wwEditor:end */
        },
        todayText: {
            label: { en: 'Today Text' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'Today',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: "Text to display for today's date",
            },
            propertyHelp: {
                tooltip:
                    "The text displayed for today's date in the date separator.\n\nCustomize this text to match the language of your interface.\n\n**Examples**: Today, Aujourd'hui, Hoje, 今日",
            },
            /* wwEditor:end */
        },
        yesterdayText: {
            label: { en: 'Yesterday Text' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'Yesterday',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: "Text to display for yesterday's date",
            },
            propertyHelp: {
                tooltip:
                    "The text displayed for yesterday's date in the date separator.\n\nCustomize this text to match the language of your interface.\n\n**Examples**: Yesterday, Hier, Ontem, 昨日",
            },
            /* wwEditor:end */
        },
        justNowText: {
            label: { en: 'Just Now Text' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: 'just now',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text to display for very recent messages',
            },
            propertyHelp: {
                tooltip:
                    "The text displayed for messages that were sent within the last minute.\n\nCustomize this text to match the language of your interface.\n\n**Examples**: just now, à l'instant, agora mesmo, 今すぐ",
            },
            /* wwEditor:end */
        },

        // Chat data
        chatDataTitle: {
            type: 'Title',
            label: { en: 'Chat Data' },
            section: 'settings',
        },
        chatHistory: {
            label: { en: 'Chat History' },
            type: 'Array',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            options: {
                item: {
                    type: 'Object',
                    defaultValue: {
                        id: 'msg-1',
                        text: 'Hello there!',
                        senderId: 'user-1',
                        userName: 'John Doe',
                        timestamp: new Date().toISOString(),
                    },
                    options: {
                        item: {
                            id: {
                                label: { en: 'Message ID' },
                                type: 'Text',
                            },
                            text: {
                                label: { en: 'Message Text' },
                                type: 'Textarea',
                            },
                            senderId: {
                                label: { en: 'Sender ID' },
                                type: 'Text',
                            },
                            userName: {
                                label: { en: 'Sender Name' },
                                type: 'Text',
                            },
                            timestamp: {
                                label: { en: 'Timestamp' },
                                type: 'Text',
                            },
                            attachments: {
                                label: { en: 'Attachments' },
                                type: 'Array',
                                options: {
                                    item: {
                                        type: 'Object',
                                        options: {
                                            item: {
                                                id: {
                                                    label: { en: 'ID' },
                                                    type: 'Text',
                                                },
                                                name: {
                                                    label: { en: 'Name' },
                                                    type: 'Text',
                                                },
                                                type: {
                                                    label: { en: 'MIME Type' },
                                                    type: 'Text',
                                                },
                                                size: {
                                                    label: { en: 'Size (bytes)' },
                                                    type: 'Number',
                                                },
                                                url: {
                                                    label: { en: 'URL' },
                                                    type: 'Text',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip: 'Array of message objects for the chat history',
            },
            propertyHelp: {
                tooltip:
                    'An array of message objects that represent the conversation history.\n\nEach message should include id, text, senderId, userName, and timestamp properties. Optionally can include attachments.\n\n**Example**: \n```json\n[{ \n  "id": "msg-1", \n  "text": "Hello!", \n  "senderId": "user-1", \n  "userName": "John", \n  "timestamp": "2023-06-01T10:30:00Z" \n}]\n```',
            },
            /* wwEditor:end */
        },

        // Participant data
        participantDataTitle: {
            type: 'Title',
            label: { en: 'Participant Data' },
            section: 'settings',
        },
        participants: {
            label: { en: 'Participants' },
            type: 'Array',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            id: { label: { en: 'Participant ID' }, type: 'Text' },
                            name: { label: { en: 'Name' }, type: 'Text' },
                            avatar: { label: { en: 'Avatar URL' }, type: 'Text' },
                            location: { label: { en: 'Location' }, type: 'Text' },
                            status: {
                                label: { en: 'Status' },
                                type: 'TextSelect',
                                options: {
                                    options: [
                                        { value: 'online', label: { en: 'Online' } },
                                        { value: 'offline', label: { en: 'Offline' } },
                                        { value: 'away', label: { en: 'Away' } },
                                        { value: 'busy', label: { en: 'Busy' } },
                                    ],
                                },
                            },
                            isCurrentUser: { label: { en: 'Is Current User' }, type: 'OnOff' },
                        },
                    },
                },
            },
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip: 'Array of participant objects representing users in the conversation',
            },
            propertyHelp: {
                tooltip:
                    'Provide the list of chat participants. Each participant can include id, name, avatar, location, status, and an optional isCurrentUser flag.\n\nThe mapping formulas below let you adapt to any data shape.',
            },
            /* wwEditor:end */
        },
        mappingParticipantId: {
            label: { en: 'Participant ID Mapping' },
            type: 'Formula',
            options: content => ({ template: Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null }),
            defaultValue: { type: 'f', code: "context.mapping?.['id'] ?? context.mapping?.['participantId']" },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the unique ID from each participant object.\n\nExamples:\n- `context.mapping?.["id"]`\n- `context.mapping?.["userId"]`\n- `context.mapping?.["_id"]`',
            },
            /* wwEditor:end */
        },
        mappingParticipantName: {
            label: { en: 'Participant Name Mapping' },
            type: 'Formula',
            options: content => ({ template: Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null }),
            defaultValue: { type: 'f', code: "context.mapping?.['name'] ?? context.mapping?.['userName'] ?? context.mapping?.['fullName']" },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the display name for each participant.\n\nExamples:\n- `context.mapping?.["name"]`\n- `context.mapping?.["userName"]`\n- `context.mapping?.["fullName"]`',
            },
            /* wwEditor:end */
        },
        mappingParticipantAvatar: {
            label: { en: 'Participant Avatar Mapping' },
            type: 'Formula',
            options: content => ({ template: Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null }),
            defaultValue: { type: 'f', code: "context.mapping?.['avatar'] ?? context.mapping?.['avatarUrl'] ?? context.mapping?.['photo']" },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the avatar URL for each participant.\n\nExamples:\n- `context.mapping?.["avatar"]`\n- `context.mapping?.["avatarUrl"]`\n- `context.mapping?.["photo"]`',
            },
            /* wwEditor:end */
        },
        mappingParticipantLocation: {
            label: { en: 'Participant Location Mapping' },
            type: 'Formula',
            options: content => ({ template: Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null }),
            defaultValue: { type: 'f', code: "context.mapping?.['location'] ?? context.mapping?.['subtitle']" },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the location or subtitle text for each participant.\n\nExamples:\n- `context.mapping?.["location"]`\n- `context.mapping?.["subtitle"]`',
            },
            /* wwEditor:end */
        },
        mappingParticipantStatus: {
            label: { en: 'Participant Status Mapping' },
            type: 'Formula',
            options: content => ({ template: Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null }),
            defaultValue: { type: 'f', code: "context.mapping?.['status']" },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the status for each participant (online, offline, away, busy).',
            },
            /* wwEditor:end */
        },
        mappingIsCurrentUser: {
            label: { en: 'Is Current User Mapping' },
            type: 'Formula',
            options: content => ({ template: Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null }),
            defaultValue: { type: 'f', code: "!!context.mapping?.['isCurrentUser']" },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula that returns true if the participant is the current user.\n\nIf provided, this can be used to infer the current user ID from the participants list.',
            },
            /* wwEditor:end */
        },
        messageDataTitle: {
            type: 'Title',
            label: { en: 'Message Data Mapping' },
            section: 'settings',
        },
        mappingMessageId: {
            label: { en: 'Message ID Mapping' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.chatHistory) && content.chatHistory.length ? content.chatHistory[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['id']",
            },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the message ID from your data structure.\n\nThis formula is executed for each message in the chat history to determine its unique identifier.\n\n**Examples**:\n- `context.mapping?.["id"]`\n- `context.mapping?.["messageId"]`\n- `"msg-" + context.mapping?.["index"]`',
            },
            /* wwEditor:end */
        },
        mappingMessageText: {
            label: { en: 'Message Text Mapping' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.chatHistory) && content.chatHistory.length ? content.chatHistory[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['text']",
            },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the message text content from your data structure.\n\nThis formula is executed for each message in the chat history to get the text that will be displayed.\n\n**Examples**:\n- `context.mapping?.["text"]`\n- `context.mapping?.["content"]`\n- `context.mapping?.["message"]`',
            },
            /* wwEditor:end */
        },
        mappingSenderId: {
            label: { en: 'Sender ID Mapping' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.chatHistory) && content.chatHistory.length ? content.chatHistory[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['senderId']",
            },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the sender ID from your data structure.\n\nThis formula is executed for each message to determine who sent it. This is compared with the currentUserId to style messages differently.\n\n**Examples**:\n- `context.mapping?.["senderId"]`\n- `context.mapping?.["userId"]`\n- `context.mapping?.["from"]`',
            },
            /* wwEditor:end */
        },
        mappingUserName: {
            label: { en: 'User Name Mapping' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.chatHistory) && content.chatHistory.length ? content.chatHistory[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['userName']",
            },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the user display name from your data structure.\n\nThis formula is executed for each message to get the display name of the sender shown above their messages.\n\n**Examples**:\n- `context.mapping?.["userName"]`\n- `context.mapping?.["senderName"]`\n- `context.mapping?.["from_name"]`',
            },
            /* wwEditor:end */
        },
        mappingTimestamp: {
            label: { en: 'Timestamp Mapping' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.chatHistory) && content.chatHistory.length ? content.chatHistory[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['timestamp']",
            },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the timestamp from your data structure.\n\nThis formula is executed for each message to get the time when it was sent. Should return an ISO date string or Date object.\n\n**Examples**:\n- `context.mapping?.["timestamp"]`\n- `context.mapping?.["sentAt"]`\n- `context.mapping?.["date"]`',
            },
            /* wwEditor:end */
        },
        mappingAttachments: {
            label: { en: 'Attachments Mapping' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.chatHistory) && content.chatHistory.length ? content.chatHistory[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['attachments']",
            },
            section: 'settings',
            /* wwEditor:start */
            propertyHelp: {
                tooltip:
                    'Formula to extract the attachments array from your data structure.\n\nThis formula should return an array of attachment objects, each with id, name, type, size, and url properties.\n\n**Examples**:\n- `context.mapping?.["attachments"]`\n- `context.mapping?.["files"]`\n- `context.mapping?.["media"]`',
            },
            /* wwEditor:end */
        },
    },
};
