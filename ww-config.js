// Common helpers for mappingAttachments evaluation
const __evalCode = (code, type, ctx) => {
    try {
        if (typeof code !== 'string') return undefined;
        const body = type === 'js' ? code : `return (${code});`;
        // eslint-disable-next-line no-new-func
        const fn = new Function('context', body);
        return fn(ctx);
    } catch {
        return undefined;
    }
};

const __pickTemplateMessageByMapping = (messages, mapping) => {
    if (mapping?.code && Array.isArray(messages) && messages.length) {
        for (const msg of messages) {
            const res = __evalCode(mapping.code, mapping.type || 'f', { mapping: msg });
            if (Array.isArray(res) && res.length) return msg;
        }
    }
    const fallback = messages.find(m => Array.isArray(m?.attachments) && m.attachments.length);
    return fallback || (messages.length ? messages[0] : null);
};

const __pickFirstAttachmentByMapping = (messages, mapping) => {
    if (mapping?.code && Array.isArray(messages) && messages.length) {
        for (const msg of messages) {
            const arr = __evalCode(mapping.code, mapping.type || 'f', { mapping: msg });
            if (Array.isArray(arr) && arr.length) return arr[0];
        }
    }
    const withAtt = messages.find(m => Array.isArray(m?.attachments) && m.attachments.length);
    return withAtt ? withAtt.attachments[0] : null;
};

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
                // Group chat avatar styling
                'groupChatAvatarColor',
                // Close button controls grouped at the end of header
                'headerShowCloseButton',
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
                'inputActionAlign',
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
                'imagePreviewTitle',
                'messagesAttachmentThumbMaxWidth',
                'messagesAttachmentThumbMaxHeight',
                'messagesAttachmentThumbBorderRadius',
            ],
            // Send button styles
            [
                'sendButtonTitle',
                'sendButtonBgColor',
                'sendButtonHoverBgColor',
                'sendButtonBorder',
                'sendButtonBorderRadius',
                'sendButtonSize',
                'sendButtonBoxShadow',
            ],
            // Attachment button styles
            [
                'attachmentButtonTitle',
                'attachmentButtonBgColor',
                'attachmentButtonHoverBgColor',
                'attachmentButtonBorder',
                'attachmentButtonBorderRadius',
                'attachmentButtonSize',
                'attachmentButtonBoxShadow',
            ],
        ],
        customSettingsPropertiesOrder: [
            // Chat settings
            ['chatSettingsTitle', 'groupChatText', 'groupChatAvatar', 'allowAttachments', 'disabled', 'autoScrollBehavior'],
            // Chat data + message mapping
            [
                'chatDataTitle',
                'messages',
                'mappingMessageId',
                'mappingMessageText',
                'mappingSenderId',
                'mappingTimestamp',
                'mappingAttachments',
                // Attachments Data mapping (visible only when mappingAttachments is bound)
                'attachmentsDataTitle',
                'mappingAttachmentId',
                'mappingAttachmentName',
                'mappingAttachmentUrl',
                'mappingAttachmentType',
                'mappingAttachmentSize',
            ],
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
            // Localization settings
            ['localizationTitle', 'locale', 'timeFormat', 'todayText', 'yesterdayText', 'justNowText'],
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
                    attachments: [
                        {
                            name: 'demo.txt',
                            type: 'text/plain',
                            size: 12,
                        },
                    ],
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
                    attachments: [
                        {
                            id: 'file-2',
                            name: 'spec.pdf',
                            type: 'application/pdf',
                            size: 102400,
                            url: 'https://example.com/spec.pdf',
                        },
                    ],
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
                    attachments: [
                        {
                            id: 'file-2',
                            name: 'spec.pdf',
                            type: 'application/pdf',
                            size: 102400,
                            url: 'https://example.com/spec.pdf',
                        },
                    ],
                },
                position: {
                    elementX: 50, // relative to chat element
                    elementY: 20,
                    viewportX: 320, // relative to page top-left
                    viewportY: 480,
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
            name: 'pendingAttachmentClick',
            label: { en: 'On pending attachment click' },
            event: {
                // attachment is a File object (unsent local upload)
                attachment: {
                    name: 'image.png',
                    type: 'image/png',
                    size: 204800,
                    // lastModified: 1695489600000
                },
                index: 0,
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
            propertyHelp: {
                tooltip:
                    'Font family used across the chat UI.\n\nExample: `Inter`, `Philosopher`, `Roboto`',
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
                    'Show or hide the top header (avatar/name/status/location).\n\nPossible values: `true`, `false`',
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
            propertyHelp: {
                tooltip:
                    'Background behind the header content.\n\nExample: `#ffffff`, `linear-gradient(180deg,#fff,#f8fafc)`',
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
            propertyHelp: {
                tooltip:
                    'Color for all header text.\n\nExample: `#1e293b`',
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
            propertyHelp: {
                tooltip:
                    'Bottom border separating header from messages.\n\nExample: `1px solid #e2e8f0`, `none`',
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
            propertyHelp: {
                tooltip:
                    'Inner spacing of the header.\n\nExample: `12px 16px`, `16px`, `8px 12px 8px 12px`',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false,
        },

        // Group chat avatar color (for initials fallback)
        groupChatAvatarColor: {
            label: { en: 'Group Avatar Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#4f46e5',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Background color for the group avatar initials' },
            propertyHelp: {
                tooltip:
                    'Fallback background for group initials (when no image).\n\nExample: `#4f46e5`',
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
            propertyHelp: {
                tooltip:
                    'Header name font size (px/em/rem).\n\nExample: `1rem`, `18px`, `1.125rem`',
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
            propertyHelp: {
                tooltip:
                    'Header name weight.\n\nPossible values: `100`, `400`, `600`, `700`, `900`',
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
            propertyHelp: {
                tooltip:
                    'Header subtitle/location size.\n\nExample: `0.875rem`, `14px`',
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
            propertyHelp: {
                tooltip:
                    'Subtitle transparency.\n\nExample: `0.7`, `1`, `0.5`',
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
            propertyHelp: {
                tooltip:
                    'Close icon color.\n\nExample: `#64748b`',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false || content.headerShowCloseButton === false,
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
            propertyHelp: {
                tooltip:
                    'Background on hover over the close icon.\n\nExample: `rgba(0,0,0,.05)`',
            },
            /* wwEditor:end */
            hidden: content => content.displayHeader === false || content.headerShowCloseButton === false,
        },

        headerShowCloseButton: {
            label: { en: 'Display Close Button' },
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
                tooltip: 'Whether to display the close button in the chat header',
            },
            propertyHelp: {
                tooltip:
                    'Show/hide the close (X) button.\n\nPossible values: `true`, `false`',
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
            propertyHelp: {
                tooltip:
                    'Conversation pane background.\n\nExample: `#ffffff`',
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
            propertyHelp: {
                tooltip:
                    'Inner spacing around messages.\n\nExample: `16px`, `20px 16px`',
            },
            /* wwEditor:end */
        },

        // Attachment thumbnails (messages area)
        messagesAttachmentThumbMaxWidth: {
            label: { en: 'Attachment Max Width' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '250px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Maximum width of image attachment thumbnails in the messages area',
            },
            propertyHelp: {
                tooltip:
                    'Max width of attached images in messages.\n\nExample: `250px`',
            },
            /* wwEditor:end */
        },
        messagesAttachmentThumbMaxHeight: {
            label: { en: 'Attachment Max Height' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '200px',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Maximum height of image attachment thumbnails in the messages area',
            },
            propertyHelp: {
                tooltip:
                    'Max height of attached images in messages.\n\nExample: `200px`',
            },
            /* wwEditor:end */
        },

        messagesAttachmentThumbBorderRadius: {
            label: { en: 'Attachment Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '6px',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Border radius of image attachment thumbnails' },
            propertyHelp: {
                tooltip:
                    'Border radius of attached images in messages.\n\nExample: `6px`',
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
            propertyHelp: {
                tooltip:
                    'Text when no messages are present.\n\nExample: `No messages yet`',
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
            propertyHelp: {
                tooltip:
                    'Color for the empty-state text.\n\nExample: `#64748b`',
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
            propertyHelp: {
                tooltip:
                    'Color of the date label.\n\nExample: `#64748b`',
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
            propertyHelp: {
                tooltip:
                    'Divider line color.\n\nExample: `#e2e8f0`',
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
            propertyHelp: {
                tooltip:
                    'Background behind date “pill”.\n\nExample: `#f8fafc`',
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
            propertyHelp: {
                tooltip:
                    'Corner roundness for the date “pill”.\n\nExample: `4px`',
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
            propertyHelp: {
                tooltip:
                    'Bubble background for others.\n\nExample: `#f1f5f9`',
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
            propertyHelp: {
                tooltip:
                    "Text color of others' messages.\n\nExample: `#334155`",
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
            propertyHelp: {
                tooltip:
                    "Font size of others' messages.\n\nExample: `0.875rem`, `16px`",
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
            propertyHelp: {
                tooltip:
                    "Font weight of others' messages.\n\nExample: `400`",
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
            propertyHelp: {
                tooltip:
                    'Font family for others’ messages.\n\nExample: `inherit`, `Inter, sans-serif`, `Georgia, serif`',
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
            propertyHelp: {
                tooltip:
                    "Border of others' messages bubble.\n\nExample: `1px solid #e2e8f0`",
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
            propertyHelp: {
                tooltip:
                    "Corner roundness of others' messages bubble.\n\nExample: `18px 18px 18px 18px`, `12px`",
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
            propertyHelp: {
                tooltip:
                    "Bubble background for current user's messages.\n\nExample: `#dbeafe`",
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
            propertyHelp: {
                tooltip:
                    "Text color of current user's messages.\n\nExample: `#1e40af`",
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
            propertyHelp: {
                tooltip:
                    "Font size of current user's messages.\n\nExample: `0.875rem`",
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
            propertyHelp: {
                tooltip:
                    "Font weight of current user's messages.\n\nExample: `400`",
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
            propertyHelp: {
                tooltip:
                    "Font family for current user's messages.\n\nExample: `Inter`",
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
            propertyHelp: {
                tooltip:
                    "Border of current user's messages bubble.\n\nExample: `1px solid #bfdbfe`",
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
            propertyHelp: {
                tooltip:
                    "Border radius of current user's messages bubble.\n\nExample: `18px 18px 18px 18px`, `12px`",
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
            propertyHelp: {
                tooltip:
                    'Background color of input area.\n\nExample: `#ffffff`',
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
            propertyHelp: {
                tooltip:
                    'Top border separating messages from input.\n\nExample: `1px solid #e2e8f0`',
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
            propertyHelp: {
                tooltip:
                    'Border of text input.\n\nExample: `1px solid #e2e8f0`',
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
            propertyHelp: {
                tooltip:
                    'Border of text input on hover.\n\nExample: `1px solid #cbd5e1`',
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
            propertyHelp: {
                tooltip:
                    'Border of text input on focus.\n\nExample: `1px solid #3b82f6`',
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
            propertyHelp: {
                tooltip:
                    'Text color of text input.\n\nExample: `#334155`',
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
            propertyHelp: {
                tooltip:
                    'Font size of text input.\n\nExample: `0.875rem`, `1rem`',
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
            propertyHelp: {
                tooltip:
                    'Font weight of text input.\n\nPossible values:`400`',
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
            propertyHelp: {
                tooltip:
                    'Font family of text input.\n\nExample: `monospace`',
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
            propertyHelp: {
                tooltip:
                    'Color of placeholder text in text input.\n\nExample: `#94a3b8`',
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
            propertyHelp: {
                tooltip:
                    'Height of text input.\n\nExample: `38px`',
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
            propertyHelp: {
                tooltip:
                    'Border radius of text input.\n\nExample: `20px`',
            },
            /* wwEditor:end */
        },
        inputActionAlign: {
            label: { en: 'Action Align' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'start', label: { en: 'Start' } },
                    { value: 'center', label: { en: 'Center' } },
                    { value: 'end', label: { en: 'End' } },
                ],
            },
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'end',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                enum: ['start', 'center', 'end'],
                tooltip: 'Vertical alignment of the action buttons (send/attachment) within the input row',
            },
            propertyHelp: {
                tooltip:
                    'Vertical alignment of action buttons beside the text input.\n\nPossible values: `start`, `center`, `end`',
            },
            /* wwEditor:end */
        },
        inputPlaceholder: {
            label: { en: 'Placeholder Text' },
            type: 'Text',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'Type a message...',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Placeholder text displayed in the message input',
            },
            propertyHelp: {
                tooltip:
                    'Placeholder text shown in text input when empty.\n\nExample: `Type a message...`',
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
            propertyHelp: {
                tooltip:
                    'Icon used for the send button.\n\nExample: `lucide/send`, `lucide/chevron-right`',
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
            propertyHelp: {
                tooltip:
                    'Send button icon color.\n\nExample: `#334155`',
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
            propertyHelp: {
                tooltip:
                    'Send button icon size.\n\nExample: `20px`',
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
            propertyHelp: {
                tooltip:
                    'Icon for adding attachments button.\n\nExample: `lucide/paperclip`, `lucide/plus`',
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
            propertyHelp: {
                tooltip:
                    'Attachment button icon color.\n\nExample: `#334155`',
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
            propertyHelp: {
                tooltip:
                    'Attachment button icon size.\n\nExample: `20px`',
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
            propertyHelp: {
                tooltip:
                    'Icon used for remove attachment button.\n\nExample: `lucide/x`, `lucide/trash`',
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
            propertyHelp: {
                tooltip:
                    'Remove button icon color.\n\nExample: `#334155`',
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
            propertyHelp: {
                tooltip:
                    'Remove button icon size.\n\nExample: `16px`',
            },
            /* wwEditor:end */
        },

        // Image preview (thumbnails inside messages)
        imagePreviewTitle: {
            type: 'Title',
            label: { en: 'Image Preview' },
            section: 'style',
        },

        // Send button styles
        sendButtonTitle: {
            type: 'Title',
            label: { en: 'Send Button' },
            section: 'style',
        },
        sendButtonBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                tooltip: 'Background (color or gradient) for the send button',
            },
            propertyHelp: {
                tooltip:
                    'Background color of send button.\n\nExample: `#2563eb`, `linear-gradient(135deg,#3b82f6,#2563eb)`',
            },
            /* wwEditor:end */
        },
        sendButtonHoverBgColor: {
            label: { en: 'Hover Background' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Hover background for the send button' },
            propertyHelp: {
                tooltip:
                    'Background color of send button on hover.\n\nExample: `linear-gradient(135deg,#2563eb,#1d4ed8)`, `#1d4ed8`',
            },
            /* wwEditor:end */
        },
        sendButtonBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: 'none',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Border for the send button' },
            propertyHelp: {
                tooltip:
                    'Border of send button.\n\nExample: `1px solid #e2e8f0`',
            },
            /* wwEditor:end */
        },
        sendButtonBorderRadius: {
            label: { en: 'Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '12px',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Border radius of the send button' },
            propertyHelp: {
                tooltip:
                    'Border radius of send button.\n\nExample: `12px`, `100%`',
            },
            /* wwEditor:end */
        },
        sendButtonSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '42px',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Square size of the send button' },
            propertyHelp: {
                tooltip:
                    'Width & height of send button.\n\nExample: `42px`',
            },
            /* wwEditor:end */
        },
        sendButtonBoxShadow: {
            label: { en: 'Shadow' },
            type: 'Shadows',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '0 2px 4px rgba(59, 130, 246, 0.3)',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Shadow applied to the send button' },
            propertyHelp: {
                tooltip:
                    'Background shadow of send button.\n\nExample: `0 2px 4px rgba(59,130,246,.3)`',
            },
            /* wwEditor:end */
        },

        // Attachment button styles
        attachmentButtonTitle: {
            type: 'Title',
            label: { en: 'Attachment Button' },
            section: 'style',
        },
        attachmentButtonBgColor: {
            label: { en: 'Background Color' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#f8fafc',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Background for the attachment button' },
            propertyHelp: {
                tooltip:
                    'Background color of attachment button.\n\nExample: `#f8fafc`',
            },
            /* wwEditor:end */
        },
        attachmentButtonHoverBgColor: {
            label: { en: 'Hover Background' },
            type: 'Color',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '#f1f5f9',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Hover background for the attachment button' },
            propertyHelp: {
                tooltip:
                    'Background color of attachment button on hover.\n\nExample: `#f1f5f9`',
            },
            /* wwEditor:end */
        },
        attachmentButtonBorder: {
            label: { en: 'Border' },
            type: 'Border',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '1px solid #e2e8f0',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Border for the attachment button' },
            propertyHelp: {
                tooltip:
                    'Border of attachment button.\n\nExample: `1px solid #e2e8f0`',
            },
            /* wwEditor:end */
        },
        attachmentButtonBorderRadius: {
            label: { en: 'Border Radius' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '12px',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Border radius of the attachment button' },
            propertyHelp: {
                tooltip:
                    'Border radius of attachment button.\n\nExample: `12px`, `8px`',
            },
            /* wwEditor:end */
        },
        attachmentButtonSize: {
            label: { en: 'Size' },
            type: 'Length',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '42px',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Square size of the attachment button' },
            propertyHelp: {
                tooltip:
                    'Width & height of attachment button.\n\nExample: `42px`',
            },
            /* wwEditor:end */
        },
        attachmentButtonBoxShadow: {
            label: { en: 'Shadow' },
            type: 'Shadows',
            section: 'style',
            bindable: true,
            classes: true,
            states: true,
            responsive: true,
            defaultValue: '0 1px 2px rgba(0, 0, 0, 0.06)',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'Shadow applied to the attachment button' },
            propertyHelp: {
                tooltip:
                    'Background shadow of attachment button.\n\nExample: `0 1px 2px rgba(0,0,0,.06)`',
            },
            /* wwEditor:end */
        },

        // ======== SETTINGS ========

        // User settings

        // Chat settings
        chatSettingsTitle: {
            type: 'Title',
            label: { en: 'Chat Settings' },
            section: 'settings',
        },
        groupChatAvatar: {
            label: { en: 'Group Avatar URL' },
            type: 'Text',
            section: 'settings',
            bindable: true,
            defaultValue: '',
            /* wwEditor:start */
            bindingValidation: { type: 'string', tooltip: 'URL of the image used as the group chat avatar' },
            propertyHelp: {
                tooltip:
                    'Image URL used as group avatar when there are 2+ participants (falls back to initials if empty).\n\nExample: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e`',
            },
            /* wwEditor:end */
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
                    'Custom header text for group chats (falls back to “Group Chat (X participants)” if empty).\n\nExample: `Team Discussion`',
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
                    'Enables attachment uploads in the input area.\n\nPossible values: `true`, `false`',
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
                    'Disables the entire chat UI and sending.\n\nPossible values: `true`, `false`',
            },
            /* wwEditor:end */
        },
        autoScrollBehavior: {
            label: { en: 'Auto-scroll Behavior' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'smooth', label: { en: 'Smooth' } },
                    { value: 'auto', label: { en: 'Instant' } },
                ],
            },
            section: 'settings',
            bindable: true,
            defaultValue: 'auto',
            /* wwEditor:start */
            bindingValidation: {
                type: 'string',
                enum: ['smooth', 'auto'],
                tooltip: 'Behavior when automatically scrolling to new messages',
            },
            propertyHelp: {
                tooltip:
                    'Scroll behavior when scrolling to new messages.\n\nPossible values: `smooth`, `auto`',
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
                    'Language & regional format for dates/times.\n\nExample: `enUS`, `enGB`, `fr`, `de`, `es`',
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
                    'Controls the format of displayed times in the chat.\n\nExample: `h:mm a`, `HH:mm`, `h:mm:ss a`',
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
                    'Text used for “today” in date separators.\n\nExample: `Today`, `Aujourd’hui`, `Hoy`',
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
                    'Text used for “yesterday” in separators.\n\nExample: `Yesterday`, `Hier`, `Ayer`',
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
                    'Text for very recent messages (< 1 min).\n\nExample: `just now`, `à l’instant`, `ahora mismo`',
            },
            /* wwEditor:end */
        },

        // Chat data
        chatDataTitle: {
            type: 'Title',
            label: { en: 'Chat Data' },
            section: 'settings',
        },
        messages: {
            label: { en: 'Messages' },
            type: 'Info',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip: 'Array of message objects for the chat history',
            },
            propertyHelp: {
                tooltip:
                    'A list of messages that represent the conversation history.\n\nEach message should include id, text, senderId, userName, and timestamp properties. Optionally can include attachments.\n\nExample:\n```json\n[{\n  "id": "msg-1",\n  "text": "Hello!",\n  "senderId": "user-1",\n  "userName": "John",\n  "timestamp": "2025-06-01T10:30:00Z",\n  "attachments": [\n    { "id": "file-1", "name": "image.png", "type": "image/png", "size": 204800, "url": "https://..." }\n  ]\n}]\n```',
            },
            /* wwEditor:end */
        },
        mappingMessageId: {
            label: { en: 'Message ID' },
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.messages) && content.messages.length ? content.messages[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['id']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula to extract the unique message ID from each message object',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the unique message ID in your `Messages` data.\n\nExample mapping: `context.mapping?.["id"]`\nExample value: `msg-1`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => !boundProps.messages,
        },
        mappingMessageText: {
            label: { en: 'Message Text' },
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.messages) && content.messages.length ? content.messages[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['text']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula to extract the message text content from each message object',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the message text in your `Messages` data.\n\nExample mapping: `context.mapping?.["text"]`\nExample value: `Hello! How are you?`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => !boundProps.messages,
        },
        mappingSenderId: {
            label: { en: 'Sender ID' },
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.messages) && content.messages.length ? content.messages[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['senderId']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula to extract the sender ID from each message object',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the sender ID in your `Messages` data.\n\nExample mapping: `context.mapping?.["senderId"]`\nExample value `user-1`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => !boundProps.messages,
        },

        mappingTimestamp: {
            label: { en: 'Timestamp' },
            type: 'Formula',
            options: content => ({
                template: Array.isArray(content.messages) && content.messages.length ? content.messages[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['timestamp']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula to extract the timestamp from each message object',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the timestamp in your `Messages` data.\n\nExample mapping: `context.mapping?.["timestamp"]`\nExample value: `2025-06-01T10:30:00Z`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => !boundProps.messages,
        },
        mappingAttachments: {
            label: { en: 'Attachments' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickTemplateMessageByMapping(messages, mapping) };
            },
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['attachments']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula to extract the attachments array from each message object',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the attachments in your `Messages` data.   \n\nExample mapping: `context.mapping?.["attachments"]`\nExample value:\n```json\n[{ \n  "id": "file-1", \n  "name": "image.png", \n  "type": "image/png", \n  "size": 204800, \n  "url": "https://www.file.com" \n}]\n```',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => !boundProps.messages,
        },

        // Attachments Data (visible only when mappingAttachments is provided)
        attachmentsDataTitle: {
            type: 'Title',
            label: { en: 'Attachments Data' },
            section: 'settings',
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentId: {
            label: { en: 'ID' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickFirstAttachmentByMapping(messages, mapping) };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['id']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the attachment unique id' },
            propertyHelp: {
                tooltip:
                    'Mapping to the unique ID in your `Attachments` data. \n\nExample mapping: `context.mapping?.["id"]`\nExample value: `file-1`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentName: {
            label: { en: 'Name' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickFirstAttachmentByMapping(messages, mapping) };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['name']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the display name' },
            propertyHelp: {
                tooltip:
                    'Mapping to the display name in your `Attachments` data. \n\nExample mapping: `context.mapping?.["name"]`\nExample value: `report.pdf`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentUrl: {
            label: { en: 'URL' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickFirstAttachmentByMapping(messages, mapping) };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['url'] ?? context.mapping?.['href']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the attachment URL' },
            propertyHelp: {
                tooltip:
                    'Mapping to the file URL in your `Attachments` data. \n\nExample mapping: `context.mapping?.["url"]`\nExample value: `https://example.com/file.pdf`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentType: {
            label: { en: 'MIME Type' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                return { template: __pickFirstAttachmentByMapping(messages, mapping) };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['type'] ?? context.mapping?.['mime']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the attachment MIME type' },
            propertyHelp: {
                tooltip:
                    'Mapping to the MIME type in your `Attachments` data.   \n\nExample mapping: `context.mapping?.["type"]`\nExample value: `image/png`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
        },
        mappingAttachmentSize: {
            label: { en: 'Size (bytes)' },
            type: 'Formula',
            options: content => {
                const messages = Array.isArray(content.messages) ? content.messages : [];
                const mapping = content?.mappingAttachments;
                const evalCode = (code, type, ctx) => {
                    try {
                        if (typeof code !== 'string') return undefined;
                        const body = type === 'js' ? code : `return (${code});`;
                        // eslint-disable-next-line no-new-func
                        const fn = new Function('context', body);
                        return fn(ctx);
                    } catch (e) {
                        return undefined;
                    }
                };
                let attachment = null;
                if (mapping?.code && messages.length) {
                    for (const msg of messages) {
                        const arr = evalCode(mapping.code, mapping.type || 'f', { mapping: msg });
                        if (Array.isArray(arr) && arr.length) {
                            attachment = arr[0];
                            break;
                        }
                    }
                }
                if (!attachment) {
                    const withAtt = messages.find(m => Array.isArray(m?.attachments) && m.attachments.length);
                    attachment = withAtt ? withAtt.attachments[0] : null;
                }
                return { template: attachment };
            },
            defaultValue: { type: 'f', code: "context.mapping?.['size'] ?? context.mapping?.['length']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the attachment size in bytes' },
            propertyHelp: {
                tooltip:
                    'Mapping to the file size in your `Attachments` data. \n\nExample mapping: `context.mapping?.["size"]`\nExample value: `102400`',
            },
            /* wwEditor:end */
            hidden: (content, _, boundProps) => {
                const hasMessages = !!boundProps?.messages;
                const hasAttachmentsMapping = !!content?.mappingAttachments?.code;
                return !(hasMessages && hasAttachmentsMapping);
            },
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
                    "A list of the chat's paricipants. \n\nEach participant should include an `id`, `name`, `avatar`, `location`, `status`, and an optional `isCurrentUser` flag. \n\nExample:\n```json\n[{\n  \"id\": \"user-1\",\n  \"name\": \"Alice\",\n  \"avatar\": \"https://example.com/alice.jpg\",\n  \"location\": \"Paris, FR\",\n  \"status\": \"online\",\n  \"isCurrentUser\": true\n}]\n```",
            },
            /* wwEditor:end */
        },
        mappingParticipantId: {
            label: { en: 'ID' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['id'] ?? context.mapping?.['userId'] ?? context.mapping?.['_id']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the unique participant ID' },
            propertyHelp: {
                tooltip:
                    'Mapping to the unique ID in your `Participants` data.\n\nExample mapping: `context.mapping?.["id"]`\nExample value: `user-1`',
            },
            hidden: (content, _, boundProps) => !boundProps.participants,
            /* wwEditor:end */
        },
        mappingParticipantName: {
            label: { en: 'Name' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['name'] ?? context.mapping?.['userName'] ?? context.mapping?.['fullName']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the participant display name' },
            propertyHelp: {
                tooltip:
                    'Mapping to the display name in your `Participants` data.\n\nExample mapping: `context.mapping?.["name"]`\nExample value: `Alice`',
            },
            hidden: (content, _, boundProps) => !boundProps.participants,
            /* wwEditor:end */
        },
        mappingParticipantAvatar: {
            label: { en: 'Avatar URL' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null,
            }),
            defaultValue: {
                type: 'f',
                code: "context.mapping?.['avatar'] ?? context.mapping?.['avatarUrl'] ?? context.mapping?.['photo']",
            },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the avatar URL' },
            propertyHelp: {
                tooltip:
                    'Mapping to the avatar image URL in your `Participants` data.\n\nExample mapping: `context.mapping?.["avatar"]`\nExample value: `https://example.com/alice.jpg`',
            },
            hidden: (content, _, boundProps) => !boundProps.participants,
            /* wwEditor:end */
        },
        mappingParticipantLocation: {
            label: { en: 'Location' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null,
            }),
            defaultValue: { type: 'f', code: "context.mapping?.['location'] ?? context.mapping?.['subtitle']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: { type: 'formula', tooltip: 'Formula that returns the location/subtitle' },
            propertyHelp: {
                tooltip:
                    'Mapping to the location in your `Participants` data.\n\nExample mapping: `context.mapping?.["location"]`\nExample value: `Paris`',
            },
            hidden: (content, _, boundProps) => !boundProps.participants,
            /* wwEditor:end */
        },
        mappingParticipantStatus: {
            label: { en: 'Status' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null,
            }),
            defaultValue: { type: 'f', code: "context.mapping?.['status']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula that returns the status (online, offline, away, busy)',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to the status in your `Participants` data.\n\nPossible values: `online`, `offline`, `away`, `busy`',
            },
            hidden: (content, _, boundProps) => !boundProps.participants,
            /* wwEditor:end */
        },
        mappingIsCurrentUser: {
            label: { en: 'Is Current User' },
            type: 'Formula',
            options: content => ({
                template:
                    Array.isArray(content.participants) && content.participants.length ? content.participants[0] : null,
            }),
            defaultValue: { type: 'f', code: "!!context.mapping?.['isCurrentUser']" },
            section: 'settings',
            /* wwEditor:start */
            bindingValidation: {
                type: 'formula',
                tooltip: 'Formula that returns true if this participant is the current user',
            },
            propertyHelp: {
                tooltip:
                    'Mapping to whether the user is the current user in your `Participants` data.\n\nPossible values: `true`, `false`',
            },
            hidden: (content, _, boundProps) => !boundProps.participants,
            /* wwEditor:end */
        },
    },
};
