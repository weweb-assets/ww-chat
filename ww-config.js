export default {
    inherit: {
        type: 'ww-layout',
    },
    options: {
        displayAllowedValues: ['flex', 'grid', 'inline-flex', 'inline-grid'],
    },
    editor: {
        label: { en: 'Chat' },
        icon: 'chat',
        customStylePropertiesOrder: [
            'fontFamily',
            // Header styles
            [
                'headerTitle',
                'displayHeader',
                'headerBgColor',
                'headerTextColor',
                'headerBorder',
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
                'messageFontSize',
                'messageFontWeight',
                'messageFontFamily',
                'messageBorder',
                'messageRadius',
                'ownMessageTitle',
                'ownMessageBgColor',
                'ownMessageTextColor',
                'ownMessageFontSize',
                'ownMessageFontWeight',
                'ownMessageFontFamily',
                'ownMessageBorder',
                'ownMessageRadius',
            ],
            // Input styles
            [
                'inputAreaTitle',
                'inputBgColor',
                'inputAreaBorder',
                'textAreaTitle',
                'textareaBorder',
                'textareaBorderHover',
                'textareaBorderFocus',
                'inputTextColor',
                'inputFontSize',
                'inputFontWeight',
                'inputFontFamily',
                'inputPlaceholderColor',
                'inputHeight',
                'inputBorderRadius',
                'inputPlaceholder',
            ],
            // Icons
            [
                'sendTitle',
                'sendIcon',
                'sendIconColor',
                'sendIconSize',
                'attachmentTitle',
                'attachmentIcon',
                'attachmentIconColor',
                'attachmentIconSize',
                'removeTitle',
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
            ['chatSettingsTitle', 'groupChatText', 'allowAttachments', 'disabled'],
            // Localization settings
            ['localizationTitle', 'locale', 'timeFormat', 'todayText', 'yesterdayText', 'justNowText'],
            // Chat data
            [
                'chatDataTitle',
                'chatHistory',
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
        {
            name: 'settingsChanged',
            label: { en: 'On user settings changed' },
            event: {
                userName: 'New Username',
                userAvatar: 'https://example.com/new-avatar.jpg',
                userLocation: 'New Location',
                userStatus: 'away',
            },
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
            label: 'Set user settings',
            action: 'actionSetUserSettings',
            args: [
                {
                    name: 'User id',
                    type: 'string',
                    label: { en: 'User id' },
                },
                {
                    name: 'User name',
                    type: 'string',
                    label: { en: 'User name' },
                },
                {
                    name: 'User avatar',
                    type: 'string',
                    label: { en: 'User avatar' },
                },
                {
                    name: 'User location',
                    type: 'string',
                    label: { en: 'User location' },
                },
                {
                    name: 'User status',
                    type: 'select',
                    options: [
                        { value: 'online', label: { en: 'Online' } },
                        { value: 'offline', label: { en: 'Offline' } },
                        { value: 'away', label: { en: 'Away' } },
                        { value: 'busy', label: { en: 'Busy' } },
                    ],
                    label: { en: 'User status' },
                },
            ],
        },
    ],
    properties: {
        // ======== APPEARANCE ========

        // Container styles
        fontFamily: {
            label: { en: 'Font Family' },
            type: 'FontFamily',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
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
            classes: true,
            states: true,
            responsive: true,
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
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#ffffff',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color of the chat header',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
        },
        headerTextColor: {
            label: { en: 'Text Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#1e293b',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text color in the chat header',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
        },
        headerBorder: {
            label: { en: 'Border Bottom' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of the chat header',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
        },

        headerPadding: {
            label: { en: 'Padding' },
            type: 'Spacing',
            section: 'style',
            defaultValue: '12px 16px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Padding of the chat header',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
        },
        headerNameFontSize: {
            label: { en: 'Name Font Size' },
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 100 },
                    { value: 'em', label: 'em', min: 0.5, max: 5, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 5, digits: 3, step: 0.1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '1rem',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font size of the user name in header',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
        },
        headerNameFontWeight: {
            label: { en: 'Name Font Weight' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: '100', label: { en: '100 - Thin' } },
                    { value: '200', label: { en: '200 - Extra Light' } },
                    { value: '300', label: { en: '300 - Light' } },
                    { value: '400', label: { en: '400 - Normal' } },
                    { value: '500', label: { en: '500 - Medium' } },
                    { value: '600', label: { en: '600 - Semi Bold' } },
                    { value: '700', label: { en: '700 - Bold' } },
                    { value: '800', label: { en: '800 - Extra Bold' } },
                    { value: '900', label: { en: '900 - Black' } },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '600',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font weight of the user name in header',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
        },
        headerLocationFontSize: {
            label: { en: 'Location Font Size' },
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 100 },
                    { value: 'em', label: 'em', min: 0.5, max: 5, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 5, digits: 3, step: 0.1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '0.875rem',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font size of the location text in header',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
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
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 0.7,
            /* wwEditor:start */
            bindingValidation: {
                type: 'number',
                tooltip: 'Opacity of the location text in header',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
        },
        headerCloseButtonColor: {
            label: { en: 'Close Button Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the close button (leave empty to inherit from header text color)',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
        },
        headerCloseButtonBgHover: {
            label: { en: 'Close Button Hover BG' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'rgba(0, 0, 0, 0.05)',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color of the close button on hover',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
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
            classes: true,
            states: true,
            responsive: true,
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
            type: 'Spacing',
            section: 'style',
            defaultValue: '16px',
            classes: true,
            states: true,
            responsive: true,
            bindable: true,
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Padding of the messages area',
            },
            /* wwEditor:end */
        },

        emptyMessageText: {
            label: { en: 'Empty Message Text' },
            type: 'Text',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
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
            classes: true,
            states: true,
            responsive: true,
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
            classes: true,
            states: true,
            responsive: true,
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
            classes: true,
            states: true,
            responsive: true,
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
            classes: true,
            states: true,
            responsive: true,
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
            classes: true,
            states: true,
            responsive: true,
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
            classes: true,
            states: true,
            responsive: true,
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
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text color of messages from others',
            },
            /* wwEditor:end */
        },
        messageFontSize: {
            label: { en: 'Font Size' },
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 100 },
                    { value: 'em', label: 'em', min: 0.5, max: 5, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 5, digits: 3, step: 0.1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '0.875rem',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font size of messages from others',
            },
            /* wwEditor:end */
        },
        messageFontWeight: {
            label: { en: 'Font Weight' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: '100', label: { en: '100 - Thin' } },
                    { value: '200', label: { en: '200 - Extra Light' } },
                    { value: '300', label: { en: '300 - Light' } },
                    { value: '400', label: { en: '400 - Normal' } },
                    { value: '500', label: { en: '500 - Medium' } },
                    { value: '600', label: { en: '600 - Semi Bold' } },
                    { value: '700', label: { en: '700 - Bold' } },
                    { value: '800', label: { en: '800 - Extra Bold' } },
                    { value: '900', label: { en: '900 - Black' } },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '400',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font weight of messages from others',
            },
            /* wwEditor:end */
        },
        messageFontFamily: {
            label: { en: 'Font Family' },
            type: 'FontFamily',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'inherit',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font family of messages from others',
            },
            /* wwEditor:end */
        },
        messageBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of messages from others',
            },
            /* wwEditor:end */
        },
        messageRadius: {
            label: { en: 'Border Radius' },
            type: 'Spacing',
            options: {
                isCorner: true,
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 50, default: true },
                    { value: '%', label: '%', min: 0, max: 100, digits: 2, step: 1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '18px 18px 18px 18px',
            /* wwEditor:start */
            bindingValidation: {
                markdown: 'border-radius',
                type: 'string',
                cssSupports: 'border-radius',
                tooltip: 'Border radius of messages from others',
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
            classes: true,
            states: true,
            responsive: true,
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
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#1e40af',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text color of your own messages',
            },
            /* wwEditor:end */
        },
        ownMessageFontSize: {
            label: { en: 'Font Size' },
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 100 },
                    { value: 'em', label: 'em', min: 0.5, max: 5, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 5, digits: 3, step: 0.1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '0.875rem',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font size of your own messages',
            },
            /* wwEditor:end */
        },
        ownMessageFontWeight: {
            label: { en: 'Font Weight' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: '100', label: { en: '100 - Thin' } },
                    { value: '200', label: { en: '200 - Extra Light' } },
                    { value: '300', label: { en: '300 - Light' } },
                    { value: '400', label: { en: '400 - Normal' } },
                    { value: '500', label: { en: '500 - Medium' } },
                    { value: '600', label: { en: '600 - Semi Bold' } },
                    { value: '700', label: { en: '700 - Bold' } },
                    { value: '800', label: { en: '800 - Extra Bold' } },
                    { value: '900', label: { en: '900 - Black' } },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '400',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font weight of your own messages',
            },
            /* wwEditor:end */
        },
        ownMessageFontFamily: {
            label: { en: 'Font Family' },
            type: 'FontFamily',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'inherit',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font family of your own messages',
            },
            /* wwEditor:end */
        },
        ownMessageBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '1px solid #bfdbfe',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of your own messages',
            },
            /* wwEditor:end */
        },
        ownMessageRadius: {
            label: { en: 'Border Radius' },
            type: 'Spacing',
            options: {
                isCorner: true,
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 50, default: true },
                    { value: '%', label: '%', min: 0, max: 100, digits: 2, step: 1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '18px 18px 18px 18px',
            /* wwEditor:start */
            bindingValidation: {
                markdown: 'border-radius',
                type: 'string',
                cssSupports: 'border-radius',
                tooltip: 'Border radius of your own messages',
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
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#ffffff',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background color of the message input',
            },
            /* wwEditor:end */
        },
        inputAreaBorder: {
            label: { en: 'Input Area Border Top' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border top of the input area container',
            },
            /* wwEditor:end */
        },
        textAreaTitle: {
            type: 'Title',
            label: { en: 'Text Area' },
            section: 'style',
        },
        textareaBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of the textarea',
            },
            /* wwEditor:end */
        },
        textareaBorderHover: {
            label: { en: 'Border (Hover)' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '1px solid #cbd5e1',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of the textarea on hover',
            },
            /* wwEditor:end */
        },
        textareaBorderFocus: {
            label: { en: 'Border (Focus)' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '1px solid #3b82f6',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Border of the textarea when focused',
            },
            /* wwEditor:end */
        },
        inputTextColor: {
            label: { en: 'Text Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Text color of the message input',
            },
            /* wwEditor:end */
        },
        inputFontSize: {
            label: { en: 'Font Size' },
            type: 'Length',
            options: {
                unitChoices: [
                    { value: 'px', label: 'px', min: 8, max: 100 },
                    { value: 'em', label: 'em', min: 0.5, max: 5, digits: 3, step: 0.1 },
                    { value: 'rem', label: 'rem', min: 0.5, max: 5, digits: 3, step: 0.1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '0.875rem',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font size of the message input',
            },
            /* wwEditor:end */
        },
        inputFontWeight: {
            label: { en: 'Font Weight' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: '100', label: { en: '100 - Thin' } },
                    { value: '200', label: { en: '200 - Extra Light' } },
                    { value: '300', label: { en: '300 - Light' } },
                    { value: '400', label: { en: '400 - Normal' } },
                    { value: '500', label: { en: '500 - Medium' } },
                    { value: '600', label: { en: '600 - Semi Bold' } },
                    { value: '700', label: { en: '700 - Bold' } },
                    { value: '800', label: { en: '800 - Extra Bold' } },
                    { value: '900', label: { en: '900 - Black' } },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '400',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font weight of the message input',
            },
            /* wwEditor:end */
        },
        inputFontFamily: {
            label: { en: 'Font Family' },
            type: 'FontFamily',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'inherit',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Font family of the message input',
            },
            /* wwEditor:end */
        },
        inputPlaceholderColor: {
            label: { en: 'Placeholder Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#94a3b8',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Placeholder text color in the message input',
            },
            /* wwEditor:end */
        },
        inputHeight: {
            label: { en: 'Height' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '38px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Fixed height of the input area',
            },
            /* wwEditor:end */
        },
        inputBorderRadius: {
            label: { en: 'Border Radius' },
            type: 'Spacing',
            options: {
                isCorner: true,
                unitChoices: [
                    { value: 'px', label: 'px', min: 0, max: 50, default: true },
                    { value: '%', label: '%', min: 0, max: 100, digits: 2, step: 1 },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '20px',
            /* wwEditor:start */
            bindingValidation: {
                markdown: 'border-radius',
                type: 'string',
                cssSupports: 'border-radius',
            },
            /* wwEditor:end */
        },

        // Icon properties
        sendTitle: {
            type: 'Title',
            label: { en: 'Send Icon' },
            section: 'style',
        },
        sendIcon: {
            label: { en: 'Icon' },
            type: 'SystemIcon',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'send',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Icon for the send button',
            },
            /* wwEditor:end */
        },
        sendIconColor: {
            label: { en: 'Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the send button icon',
            },
            /* wwEditor:end */
        },
        sendIconSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '20px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Size of the send button icon',
            },
            /* wwEditor:end */
        },
        attachmentTitle: {
            type: 'Title',
            label: { en: 'Attachment Icon' },
            section: 'style',
        },
        attachmentIcon: {
            label: { en: 'Icon' },
            type: 'SystemIcon',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'paperclip',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Icon for the attachment button',
            },
            /* wwEditor:end */
        },
        attachmentIconColor: {
            label: { en: 'Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the attachment button icon',
            },
            /* wwEditor:end */
        },
        attachmentIconSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '20px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Size of the attachment button icon',
            },
            /* wwEditor:end */
        },
        removeTitle: {
            type: 'Title',
            label: { en: 'Remove Attachment Icon' },
            section: 'style',
        },
        removeIcon: {
            label: { en: 'Icon' },
            type: 'SystemIcon',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'x',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Icon for the remove attachment button',
            },
            /* wwEditor:end */
        },
        removeIconColor: {
            label: { en: 'Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#334155',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Color of the remove attachment button icon',
            },
            /* wwEditor:end */
        },
        removeIconSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
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
        groupChatText: {
            label: { en: 'Group Chat Text' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: '',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Custom text for group chat header. If empty, shows default format with participant count.',
            },
            propertyHelp: {
                tooltip:
                    'Custom text displayed in the header when there are multiple chat participants.\n\nIf this field is empty or null, the system will show "Group Chat (X participants)" where X is the number of participants.\n\n**Examples**: Team Discussion, Project Chat, Meeting Room',
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
