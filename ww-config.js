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
            ['chatSettingsTitle', 'groupChatText', 'allowAttachments', 'disabled', 'autoScrollBehavior'],
            // Group chat avatar settings
            ['groupAvatarSettingsTitle', 'groupChatAvatar'],
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
                    // New recommended fields
                    elementX: 50, // relative to chat element
                    elementY: 20,
                    viewportX: 320, // relative to page top-left
                    viewportY: 480,
                    // Back-compat
                    x: 12, // relative to clicked sub-element
                    y: 8,
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
                    'Sets the font family for all text elements in the chat component.\n\nThis affects all typography including messages, headers, input text, and UI elements. You can use web-safe fonts, Google Fonts, or custom font stacks.\n\n**Examples**:\n- "Inter, sans-serif" - Modern sans-serif\n- "Georgia, serif" - Classic serif\n- "Monaco, monospace" - Monospace font',
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
            propertyHelp: {
                tooltip:
                    'Sets the background color of the chat header area.\n\nThe header contains user information like name, avatar, status, and location. Choose a color that complements your app design and provides good contrast with the header text.\n\n**Examples**:\n- "#ffffff" - Clean white background\n- "#f8fafc" - Light gray for subtle distinction\n- "#1e293b" - Dark theme header',
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
                    'Sets the color of all text elements in the chat header.\n\nThis affects the user name, location text, and other header content. Ensure good contrast with the header background color for optimal readability.\n\n**Examples**:\n- "#1e293b" - Dark gray for light backgrounds\n- "#ffffff" - White for dark backgrounds\n- "#64748b" - Medium gray for subtle text',
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
                    'Sets the bottom border of the chat header.\n\nThis creates a visual separation between the header and the messages area. You can control the width, style, and color of the border.\n\n**Examples**:\n- "1px solid #e2e8f0" - Thin light gray border\n- "2px solid #3b82f6" - Thicker blue border\n- "none" - No border for seamless design',
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
                    'Controls the internal spacing around content in the chat header.\n\nUses the advanced Spacing interface allowing you to set different padding for each side (top, right, bottom, left) or uniform padding.\n\n**Examples**:\n- "16px" - Uniform 16px padding on all sides\n- "12px 16px" - 12px top/bottom, 16px left/right\n- "8px 16px 12px 16px" - Different padding for each side',
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
                    'Controls the background color of the group chat avatar when showing text initials (i.e., when no custom Group Avatar URL is set).\n\nUse this to ensure consistent avatars in a chat list UI. If a Group Avatar URL is provided, this color is ignored.',
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
                    'Sets the font size for the user name displayed in the chat header.\n\nSupports multiple units (px, em, rem) with appropriate ranges for each. The name is the primary text element in the header, so choose a size that creates good visual hierarchy.\n\n**Examples**:\n- "1rem" - Standard readable size\n- "1.2rem" - Slightly larger for emphasis\n- "18px" - Fixed pixel size',
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
                    'Controls how bold or light the user name appears in the header.\n\nFont weight affects the visual hierarchy and emphasis of the name. Higher values (600-900) create bolder text, while lower values (100-400) create lighter text.\n\n**Examples**:\n- "400" - Normal weight for body text\n- "600" - Semi-bold for emphasis (default)\n- "700" - Bold for strong emphasis',
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
                    'Sets the font size for the location text displayed under the user name in the header.\n\nThe location text is secondary information, so it\'s typically smaller than the user name. Supports px, em, and rem units.\n\n**Examples**:\n- "0.875rem" - Standard secondary text size (default)\n- "14px" - Fixed small size\n- "0.75rem" - Smaller for compact design',
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
                    'Controls the transparency of the location text in the header.\n\nLower opacity values make the text more subtle and less prominent. This helps create visual hierarchy between the main user name and secondary location information.\n\n**Examples**:\n- "0.7" - Subtle but readable (default)\n- "1" - Full opacity for maximum visibility\n- "0.5" - Very subtle for minimal design',
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
                    'Sets the color of the close button icon in the chat header.\n\nIf left empty, the close button will inherit the color from the header text color setting. This allows for consistent theming while providing the flexibility to customize the close button separately if needed.\n\n**Examples**:\n- "" - Inherit from header text color (recommended)\n- "#64748b" - Custom gray color\n- "#dc2626" - Red for emphasis',
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
                    'Sets the background color that appears behind the close button when users hover over it.\n\nThis provides visual feedback to indicate the button is interactive. Using a subtle background color enhances usability without being distracting.\n\n**Examples**:\n- "rgba(0, 0, 0, 0.05)" - Light gray overlay (default)\n- "rgba(255, 0, 0, 0.1)" - Light red tint\n- "transparent" - No hover background',
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
                    'Sets the background color of the main messages area where all chat messages are displayed.\n\nThis area contains the conversation history and should provide good contrast with message bubbles. Choose a neutral color that doesn\'t compete with message content.\n\n**Examples**:\n- "#ffffff" - Clean white background\n- "#f8fafc" - Light gray for reduced eye strain\n- "#1e293b" - Dark background for dark theme',
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
                    'Controls the internal spacing around the messages area content.\n\nThis padding creates space between the messages and the edges of the container, improving readability and visual comfort. Uses the advanced Spacing interface for precise control.\n\n**Examples**:\n- "16px" - Uniform 16px padding on all sides\n- "20px 16px" - 20px top/bottom, 16px left/right\n- "12px 24px 16px 24px" - Different padding for each side',
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
                    'Sets the maximum width for image thumbnails displayed inside messages.\n\nUse this to make previews more compact or larger depending on your layout. The image will keep its aspect ratio and never exceed this width.\n\n**Examples**:\n- "180px" - Compact previews\n- "220px" - Medium size\n- "300px" - Larger previews',
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
                    'Sets the maximum height for image thumbnails displayed inside messages.\n\nLower values create smaller thumbnails. The image scales proportionally and will not exceed this height.\n\n**Examples**:\n- "120px" - Small thumbnails\n- "160px" - Medium thumbnails\n- "220px" - Larger thumbnails',
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
                    'Sets the corner radius for image thumbnails shown inside messages.\n\nThis controls only the image preview, not the message bubble.\n\n**Examples**:\n- "6px" - Default rounded corners\n- "0px" - Sharp corners\n- "12px" - More rounded',
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
                    'The text displayed in the messages area when there are no messages to show.\n\nThis provides helpful feedback to users and can encourage them to start the conversation. The message should be friendly and contextually appropriate for your application.\n\n**Examples**:\n- "No messages yet" - Generic and friendly\n- "Start the conversation!" - Encouraging\n- "Your conversation will appear here" - Descriptive',
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
                    'Sets the color of the empty message text displayed when there are no messages.\n\nThis text is typically styled as secondary/muted content since it\'s informational rather than actual conversation content. Choose a subtle color that\'s readable but not distracting.\n\n**Examples**:\n- "#64748b" - Medium gray for subtle appearance\n- "#9ca3af" - Lighter gray for minimal emphasis\n- "#374151" - Darker gray for better readability',
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
                    'Sets the color of the date text in date separators that appear between messages from different days.\n\nDate separators help users navigate through conversation history. The text should be readable but subtle enough not to dominate the conversation flow.\n\n**Examples**:\n- "#64748b" - Medium gray for subtle separation\n- "#9ca3af" - Lighter gray for minimal emphasis\n- "#374151" - Darker gray for better visibility',
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
                    'Sets the color of the horizontal line that extends from both sides of the date text in date separators.\n\nThis line provides visual separation between message groups from different days. It should be subtle enough to organize content without being distracting.\n\n**Examples**:\n- "#e2e8f0" - Light gray for subtle separation\n- "#d1d5db" - Slightly darker for more definition\n- "transparent" - No divider line, text only',
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
                    'Sets the background color directly behind the date text in date separators.\n\nThis background ensures the date text remains readable over the divider line. It should typically match the messages area background for a seamless appearance.\n\n**Examples**:\n- "#ffffff" - White to match light backgrounds\n- "#f8fafc" - Light gray to match gray backgrounds\n- "#1e293b" - Dark color for dark themes',
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
                    'Sets the border radius for the background area behind the date text in date separators.\n\nThis creates rounded corners around the date text background, softening the appearance and making it more visually appealing. Small values create subtle rounding.\n\n**Examples**:\n- "4px" - Subtle rounded corners\n- "8px" - More pronounced rounding\n- "0px" - Sharp, square corners',
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
                    'Sets the background color for message bubbles from other participants (not the current user).\n\nThis color helps distinguish between messages from different senders and should provide good contrast with the message text. Choose a color that complements your overall design theme.\n\n**Examples**:\n- "#f1f5f9" - Light blue-gray for neutral appearance\n- "#f3f4f6" - Light gray for subtle distinction\n- "#fef3c7" - Light yellow for warmth',
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
                    'Sets the text color for messages from other participants (not the current user).\n\nThis should provide excellent readability against the message background color. Dark colors work well on light backgrounds, while light colors work on dark backgrounds.\n\n**Examples**:\n- "#334155" - Dark slate for light backgrounds\n- "#ffffff" - White for dark backgrounds\n- "#1f2937" - Very dark gray for maximum contrast',
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
                    'Sets the font size for message text from other participants.\n\nThis determines the readability and visual prominence of message content. Choose a size that\'s comfortable to read on your target devices and screen sizes.\n\n**Examples**:\n- "0.875rem" - Standard readable size (14px)\n- "1rem" - Base font size (16px)\n- "16px" - Fixed pixel size for consistency',
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
                    'Controls how bold or light the message text appears for messages from other participants.\n\nFont weight affects readability and emphasis. Normal weight (400) is typically used for body text, while higher weights can create emphasis.\n\n**Examples**:\n- "400" - Normal weight for easy reading\n- "500" - Medium weight for slight emphasis\n- "300" - Light weight for elegant appearance',
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
                    'Sets the font family for message text from other participants.\n\nBy default, inherits from the main chat font family setting. You can override this to use a different font specifically for message content, such as a more readable font for long conversations.\n\n**Examples**:\n- "inherit" - Use the main chat font family\n- "Inter, sans-serif" - Modern sans-serif font\n- "Georgia, serif" - Serif font for readability',
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
                    'Sets the border around message bubbles from other participants.\n\nBorders can help define message boundaries and add visual structure. You can control the width, style, and color. Use "none" for borderless messages.\n\n**Examples**:\n- "1px solid #e2e8f0" - Thin light gray border\n- "2px solid #3b82f6" - Thicker blue border\n- "none" - No border for clean appearance',
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
                    'Controls the corner rounding of message bubbles from other users.\n\nSupports all CSS border-radius formats including individual corner control using the advanced Spacing interface. You can set uniform radius or customize each corner separately.\n\n**Examples**:\n- "12px" - uniform 12px radius on all corners\n- "20px 8px" - 20px on top/bottom, 8px on left/right\n- "16px 16px 4px 16px" - custom radius for each corner (top-left, top-right, bottom-right, bottom-left)',
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
                    'Sets the background color for message bubbles from the current user.\n\nThis color distinguishes your messages from others\' messages, creating clear visual separation in the conversation. Typically uses a different color or shade than other participants.\n\n**Examples**:\n- "#dbeafe" - Light blue for current user emphasis\n- "#dcfce7" - Light green for positive association\n- "#f3e8ff" - Light purple for unique distinction',
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
                    'Sets the text color for messages from the current user.\n\nThis should provide excellent readability against your own message background color. The color can match or complement the background to maintain visual consistency.\n\n**Examples**:\n- "#1e40af" - Blue text to match blue background theme\n- "#166534" - Green text for green background theme\n- "#334155" - Dark gray for universal readability',
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
                    'Sets the font size for message text from the current user.\n\nTypically matches the font size of other messages for consistency, but can be adjusted to create visual distinction if desired.\n\n**Examples**:\n- "0.875rem" - Standard readable size matching others\n- "1rem" - Slightly larger for current user emphasis\n- "16px" - Fixed pixel size for consistency',
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
                    'Controls how bold or light your own message text appears.\n\nTypically matches the font weight of other messages for consistency, but can be adjusted to subtly emphasize your own messages if desired.\n\n**Examples**:\n- "400" - Normal weight matching others\n- "500" - Medium weight for slight emphasis\n- "300" - Light weight for elegant distinction',
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
                    'Sets the font family for your own message text.\n\nBy default, inherits from the main chat font family setting. You can override this to use a different font specifically for your own messages, though consistency is typically preferred.\n\n**Examples**:\n- "inherit" - Use the main chat font family (recommended)\n- "Inter, sans-serif" - Modern sans-serif if different from others\n- "system-ui" - System font for native appearance',
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
                    'Sets the border around your own message bubbles.\n\nThis can match or complement the border used for other messages. The border helps define message boundaries and can reinforce the visual distinction between your messages and others.\n\n**Examples**:\n- "1px solid #bfdbfe" - Light blue border matching background\n- "2px solid #3b82f6" - Stronger blue border for emphasis\n- "none" - No border for clean, modern appearance',
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
                    'Controls the corner rounding of your own message bubbles.\n\nSupports all CSS border-radius formats including individual corner control using the advanced Spacing interface. You can set uniform radius or customize each corner separately to create unique styling for your own messages.\n\n**Examples**:\n- "12px" - uniform 12px radius on all corners\n- "20px 8px" - 20px on top/bottom, 8px on left/right\n- "16px 16px 4px 16px" - custom radius for each corner (top-left, top-right, bottom-right, bottom-left)',
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
                    'Sets the background color of the entire input area containing the message input field and action buttons.\n\nThis area is typically separated from the messages area and should provide good contrast with the input field itself.\n\n**Examples**:\n- "#ffffff" - White for clean separation\n- "#f8fafc" - Light gray for subtle distinction\n- "#1e293b" - Dark background for dark themes',
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
                    'Sets the top border of the input area container that separates it from the messages area.\n\nThis border helps visually distinguish the input section from the conversation history. Use "none" for a seamless design.\n\n**Examples**:\n- "1px solid #e2e8f0" - Subtle gray separation\n- "2px solid #3b82f6" - Stronger blue accent\n- "none" - No border for seamless flow',
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
                    'Sets the border around the message input textarea in its default state.\n\nThis border defines the input field boundary and should provide clear visual indication of the interactive area. Works in combination with hover and focus states.\n\n**Examples**:\n- "1px solid #e2e8f0" - Subtle gray border\n- "2px solid #d1d5db" - More prominent definition\n- "none" - Borderless for minimal design',
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
                    'Sets the border around the message input textarea when users hover over it.\n\nThis provides visual feedback indicating the field is interactive. Typically uses a slightly darker or more prominent color than the default border.\n\n**Examples**:\n- "1px solid #cbd5e1" - Darker gray on hover\n- "2px solid #9ca3af" - Thicker and darker\n- "1px solid #3b82f6" - Color change to blue',
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
                    'Sets the border around the message input textarea when it has focus (user is typing).\n\nThis provides clear visual feedback that the field is active and ready for input. Typically uses an accent color to draw attention.\n\n**Examples**:\n- "1px solid #3b82f6" - Blue focus indicator\n- "2px solid #059669" - Green with thicker border\n- "1px solid #7c3aed" - Purple for brand colors',
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
                    'Sets the color of text that users type in the message input field.\n\nThis should provide excellent readability against the input background and be consistent with your overall design theme.\n\n**Examples**:\n- "#334155" - Dark slate for light backgrounds\n- "#ffffff" - White for dark input backgrounds\n- "#1f2937" - Very dark gray for maximum contrast',
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
                    'Sets the font size for text in the message input field.\n\nThis should be comfortable for typing and typically matches or is similar to the message font size for consistency.\n\n**Examples**:\n- "0.875rem" - Standard input size (14px)\n- "1rem" - Base font size (16px) for better mobile usability\n- "16px" - Fixed pixel size for consistency',
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
                    'Controls how bold or light the text appears in the message input field.\n\nNormal weight (400) is standard for input fields and provides good readability without being distracting.\n\n**Examples**:\n- "400" - Normal weight for standard inputs\n- "500" - Medium weight for slightly more presence\n- "300" - Light weight for elegant appearance',
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
                    'Sets the font family for text in the message input field.\n\nBy default, inherits from the main chat font family setting. Keeping consistency with message fonts is typically preferred for a cohesive experience.\n\n**Examples**:\n- "inherit" - Use the main chat font family (recommended)\n- "system-ui" - System font for native feel\n- "monospace" - Fixed-width font for specific use cases',
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
                    'Sets the color of the placeholder text in the message input field.\n\nPlaceholder text should be clearly distinguishable from actual input text while remaining readable. It typically uses a muted or lighter color.\n\n**Examples**:\n- "#94a3b8" - Medium gray for subtle guidance\n- "#d1d5db" - Lighter gray for minimal appearance\n- "#6b7280" - Darker gray for better visibility',
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
                    'Sets the fixed height of the message input field.\n\nThis determines how tall the input field appears and affects the overall size of the input area. Consider touch target sizes for mobile devices.\n\n**Examples**:\n- "38px" - Compact height for desktop interfaces\n- "44px" - Better for touch devices (recommended minimum)\n- "50px" - Larger for improved accessibility',
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
                    'Sets the border radius for the message input field corners.\n\nRounded corners can make the input feel more modern and friendly. Higher values create more pronounced rounding. Uses the advanced Spacing interface for precise corner control.\n\n**Examples**:\n- "20px" - Highly rounded, pill-like appearance\n- "8px" - Moderately rounded corners\n- "4px" - Subtle rounding\n- "0px" - Sharp, square corners',
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
                    'Controls the vertical alignment of the action buttons (attachment and send) relative to the textarea in the input row.\n\nstart aligns to the top, center vertically centers them, end aligns to the bottom.',
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
                    'The placeholder text shown in the message input field when it\'s empty.\n\nThis text provides guidance to users about what they should type. It disappears when the user starts typing.\n\n**Examples**:\n- "Type a message..."\n- "Write your message here"\n- "Enter your text"',
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
                    'Sets the icon used for the send message button.\n\nThis icon appears in the input area and allows users to send their typed message. Choose an icon that clearly represents the send action.\n\n**Examples**:\n- "send" - Arrow pointing up/right (default)\n- "chevron-right" - Right-pointing arrow\n- "arrow-up" - Upward arrow for vertical send',
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
                    'Sets the color of the send button icon.\n\nThis should provide good contrast against the input background and be easily recognizable as an interactive element. Consider using an accent color to draw attention to this important action.\n\n**Examples**:\n- "#334155" - Dark gray for subtle appearance\n- "#3b82f6" - Blue for accent/primary action\n- "#059669" - Green for positive action indication',
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
                    'Sets the size of the send button icon.\n\nThe icon should be large enough to be easily clickable, especially on touch devices, while fitting comfortably within the input area design.\n\n**Examples**:\n- "20px" - Standard size for desktop interfaces\n- "24px" - Larger for better touch targets\n- "16px" - Smaller for compact designs',
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
                    'Sets the icon used for the file attachment button.\n\nThis icon appears when attachments are enabled and allows users to add files to their messages. Choose an icon that clearly represents file attachment.\n\n**Examples**:\n- "paperclip" - Classic attachment symbol (default)\n- "plus" - Plus sign for adding files\n- "file" - Document icon for file uploads',
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
                    'Sets the color of the attachment button icon.\n\nThis should be easily visible against the input background and indicate that the button is interactive. Can match other icon colors for consistency.\n\n**Examples**:\n- "#334155" - Dark gray for neutral appearance\n- "#6b7280" - Medium gray for subtle presence\n- "#3b82f6" - Blue to match other interactive elements',
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
                    'Sets the size of the attachment button icon.\n\nShould be large enough for easy interaction while maintaining visual balance with other input area elements. Consider touch target requirements.\n\n**Examples**:\n- "20px" - Standard size matching other icons\n- "22px" - Slightly larger for emphasis\n- "18px" - Smaller for compact layouts',
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
                    'Sets the icon used for removing attachments from messages.\n\nThis icon appears on attachment previews and allows users to remove files before sending. Choose an icon that clearly indicates removal or deletion.\n\n**Examples**:\n- "x" - X mark for close/remove (default)\n- "trash" - Trash bin for delete action\n- "minus" - Minus sign for removal',
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
                    'Sets the color of the remove attachment button icon.\n\nThis icon should be clearly visible and may use a color that indicates a destructive action, such as red, or match other UI elements for consistency.\n\n**Examples**:\n- "#334155" - Dark gray for neutral appearance\n- "#dc2626" - Red to indicate destructive action\n- "#6b7280" - Medium gray for subtle presence',
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
                    'Sets the size of the remove attachment button icon.\n\nThis icon appears on attachment previews and should be large enough to interact with easily while not overwhelming the attachment preview. Typically smaller than main action icons.\n\n**Examples**:\n- "16px" - Compact size for attachment previews\n- "18px" - Slightly larger for easier interaction\n- "14px" - Smaller for minimal design',
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
                    'Sets the send button background. Can be a solid color or gradient.\n\nExamples:\n- #2563eb\n- linear-gradient(135deg, #3b82f6, #2563eb)',
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
                tooltip: 'Background (color or gradient) applied to the send button on hover.',
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
                tooltip: 'Defines the border of the send button.\n\nExamples:\n- none\n- 1px solid #e2e8f0',
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
                tooltip: 'Corner roundness of the send button. Accepts any CSS length (px, %).',
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
                tooltip: 'Width and height of the send button (square). Example: 42px.',
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
                tooltip: 'CSS box-shadow for the send button.',
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
                tooltip: 'Sets the attachment button background color or gradient.',
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
                tooltip: 'Background applied to the attachment button on hover.',
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
                tooltip: 'Defines the border of the attachment button. Example: 1px solid #e2e8f0.',
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
                tooltip: 'Corner roundness of the attachment button. Accepts any CSS length (px, %).',
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
                tooltip: 'Width and height of the attachment button (square). Example: 42px.',
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
                tooltip: 'CSS box-shadow for the attachment button.',
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
                    'Controls how the chat scrolls to the bottom when new messages are received.\n\n"Smooth" provides a gradual animated scroll effect, while "Instant" immediately jumps to the bottom without animation.\n\n**Smooth**: Better user experience with animated scrolling\n**Instant**: Immediate response, better for high-frequency message environments',
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
                    'An array of message objects that represent the conversation history.\n\nEach message should include id, text, senderId, userName, and timestamp properties. Optionally can include attachments.\n\n**Example**: \n```json\n[{ \n  "id": "msg-1", \n  "text": "Hello!", \n  "senderId": "user-1", \n  "userName": "John", \n  "timestamp": "2023-06-01T10:30:00Z" \n}]\n```',
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
                    'Formula to extract the message ID from your data structure.\n\nThis formula is executed for each message in the chat history to determine its unique identifier.\n\n**Examples**:\n- `context.mapping?.["id"]`\n- `context.mapping?.["messageId"]`\n- `"msg-" + context.mapping?.["index"]`',
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
                    'Formula to extract the message text content from your data structure.\n\nThis formula is executed for each message in the chat history to get the text that will be displayed.\n\n**Examples**:\n- `context.mapping?.["text"]`\n- `context.mapping?.["content"]`\n- `context.mapping?.["message"]`',
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
                    'Formula to extract the sender ID from your data structure.\n\nThis formula is executed for each message to determine who sent it. This is compared with the currentUserId to style messages differently.\n\n**Examples**:\n- `context.mapping?.["senderId"]`\n- `context.mapping?.["userId"]`\n- `context.mapping?.["from"]`',
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
                    'Formula to extract the timestamp from your data structure.\n\nThis formula is executed for each message to get the time when it was sent. Should return an ISO date string or Date object.\n\n**Examples**:\n- `context.mapping?.["timestamp"]`\n- `context.mapping?.["sentAt"]`\n- `context.mapping?.["date"]`',
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
                    'Formula to extract the attachments array from your data structure.\n\nThis formula should return an array of attachment objects, each with id, name, type, size, and url properties.\n\n**Examples**:\n- `context.mapping?.["attachments"]`\n- `context.mapping?.["files"]`\n- `context.mapping?.["media"]`',
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
            propertyHelp: { tooltip: 'Unique identifier for the attachment. Optional but recommended for stable rendering.' },
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
            propertyHelp: { tooltip: 'Displayed file name in the UI.' },
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
            propertyHelp: { tooltip: 'Used for image previews and click behavior.' },
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
            propertyHelp: { tooltip: 'Used to detect images (image/...) for previews; otherwise treated as a generic file.' },
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
            propertyHelp: { tooltip: 'Optional. When omitted, the UI hides the size.' },
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
                    'Provide the list of chat participants. Each participant may include id, name, avatar, location, status, and an optional isCurrentUser flag. Use the mapping formulas below to adapt to your data structure.',
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
                    'Extracts the unique ID for each participant.\n\nExamples:\n- context.mapping?.["id"]\n- context.mapping?.["userId"]\n- context.mapping?.["_id"]',
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
                    'Extracts the display name for each participant.\n\nExamples:\n- context.mapping?.["name"]\n- context.mapping?.["userName"]\n- context.mapping?.["fullName"]',
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
                    'Extracts the avatar URL.\n\nExamples:\n- context.mapping?.["avatar"]\n- context.mapping?.["avatarUrl"]\n- context.mapping?.["photo"]',
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
                    'Extracts a location/subtitle string for each participant.\n\nExamples:\n- context.mapping?.["location"]\n- context.mapping?.["subtitle"]',
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
                tooltip: 'Extracts the participant status. Expected values: online, offline, away, busy.',
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
                    'Return a boolean indicating whether the participant is the current user. When true, the component infers currentUserId from this participant.',
            },
            hidden: (content, _, boundProps) => !boundProps.participants,
            /* wwEditor:end */
        },
    },
};
