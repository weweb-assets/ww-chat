---
name: ww-chat
description: A comprehensive chat interface component with customizable styling, user details, and support for messages and attachments.
keywords:
    - chat
    - messaging
    - conversation
    - communication
    - interface
---

#### Chat Component

Container Properties:

-   `fontFamily`: `string` - Font family used throughout the chat. Default: `inherit`

Header Style Properties:

-   `displayHeader`: `boolean` - Whether to display the chat header. Default: `true`
-   `headerBgColor`: `string` - Background color of the chat header. Default: `#ffffff`
-   `headerTextColor`: `string` - Text color in the chat header. Default: `#1e293b`
-   `headerBorder`: `string` - Border of the chat header. Default: `1px solid #e2e8f0`
-   `headerPadding`: `string` - Padding of the chat header using Spacing type. Default: `12px 16px`
-   `headerNameFontSize`: `string` - Font size of the user name in header. Supports px, em, and rem units. Default: `1rem`
-   `headerNameFontWeight`: `string` - Font weight of the user name in header (100-900). Default: `600`
-   `headerLocationFontSize`: `string` - Font size of the location text in header. Supports px, em, and rem units. Default: `0.875rem`
-   `headerLocationOpacity`: `number` - Opacity of the location text in header. Default: `0.7`
-   `headerCloseButtonColor`: `string` - Color of the close button (leave empty to inherit). Default: ``
-   `headerCloseButtonBgHover`: `string` - Background color of the close button on hover. Default: `rgba(0, 0, 0, 0.05)`

Messages Area Properties:

-   `messagesAreaBgColor`: `string` - Background color of the messages area. Default: `#ffffff`
-   `messagesAreaPadding`: `string` - Padding inside the messages area using Spacing type. Default: `16px`
-   `emptyMessageText`: `string` - Text to display when there are no messages. Default: `No messages yet`
-   `emptyMessageColor`: `string` - Color of the empty message text. Default: `#64748b`

Date Separator Properties:

-   `dateSeparatorTextColor`: `string` - Text color of the date separator. Default: `#64748b`
-   `dateSeparatorLineColor`: `string` - Color of the date separator divider line. Default: `#e2e8f0`
-   `dateSeparatorBgColor`: `string` - Background color behind the date text. Default: `#ffffff`
-   `dateSeparatorBorderRadius`: `string` - Border radius of the date separator. Default: `4px`

Message Style Properties:

-   `messageBgColor`: `string` - Background color of messages from others. Default: `#f1f5f9`
-   `messageTextColor`: `string` - Text color of messages from others. Default: `#334155`
-   `messageBorder`: `string` - Border of messages from others. Default: `1px solid #e2e8f0`
-   `messageRadius`: `Spacing` - Border radius of messages from others with advanced corner control. Supports all CSS border-radius formats. Default: `18px 18px 18px 18px`
-   `messageFontSize`: `string` - Font size of messages from others. Supports px, em, and rem units. Default: `0.9375rem`
-   `messageFontWeight`: `string` - Font weight of messages from others (100-900). Default: `400`
-   `messageFontFamily`: `string` - Font family of messages from others. Default: `inherit`
-   `ownMessageBgColor`: `string` - Background color of your own messages. Default: `#dbeafe`
-   `ownMessageTextColor`: `string` - Text color of your own messages. Default: `#1e40af`
-   `ownMessageBorder`: `string` - Border of your own messages. Default: `1px solid #bfdbfe`
-   `ownMessageRadius`: `Spacing` - Border radius of your own messages with advanced corner control. Supports all CSS border-radius formats. Default: `18px 18px 18px 18px`
-   `ownMessageFontSize`: `string` - Font size of your own messages. Supports px, em, and rem units. Default: `0.9375rem`
-   `ownMessageFontWeight`: `string` - Font weight of your own messages (100-900). Default: `400`
-   `ownMessageFontFamily`: `string` - Font family of your own messages. Default: `inherit`

Input Area Properties:

-   `inputBgColor`: `string` - Background color of the input area container. Default: `#ffffff`
-   `inputAreaBorder`: `string` - Border top of the input area container (separates from messages area). Default: `1px solid #e2e8f0`

Text Area Properties:

-   `textareaBorder`: `string` - Default border of the textarea input field. Default: `1px solid #e2e8f0`
-   `textareaBorderHover`: `string` - Border of the textarea when user hovers over it. Default: `1px solid #cbd5e1`
-   `textareaBorderFocus`: `string` - Border of the textarea when focused/active. Default: `1px solid #3b82f6`
-   `inputTextColor`: `string` - Text color of the message input. Default: `#334155`
-   `inputPlaceholderColor`: `string` - Placeholder text color in the message input. Default: `#94a3b8`
-   `inputHeight`: `string` - Fixed height of the textarea (content scrolls if exceeds height). Default: `38px`
-   `inputBorderRadius`: `Spacing` - Border radius of the input field with advanced corner control (supports px and % units). Default: `20px`
-   `inputActionAlign`: `start | center | end` - Vertical alignment of the action buttons (attachment/send) within the input row. Default: `end`
-   `inputFontSize`: `string` - Font size of the input text. Supports px, em, and rem units. Default: `0.875rem`
-   `inputFontWeight`: `string` - Font weight of the input text (100-900). Default: `400`
-   `inputFontFamily`: `string` - Font family of the input text. Default: `inherit`
-   `inputPlaceholder`: `string` - Placeholder text for the message input. Default: `Type a message...`

Icon Properties:

-   `sendIcon`: `string` - Icon for the send button. Default: `send`
-   `sendIconColor`: `string` - Color of the send button icon. Default: `#334155`
-   `sendIconSize`: `string` - Size of the send button icon. Default: `20px`
-   `attachmentIcon`: `string` - Icon for the attachment button. Default: `paperclip`
-   `attachmentIconColor`: `string` - Color of the attachment button icon. Default: `#334155`
-   `attachmentIconSize`: `string` - Size of the attachment button icon. Default: `20px`
-   `removeIcon`: `string` - Icon for the remove attachment button. Default: `x`
-   `removeIconColor`: `string` - Color of the remove attachment button icon. Default: `#f43f5e`
-   `removeIconSize`: `string` - Size of the remove attachment button icon. Default: `16px`

User Properties:


User Settings Management:

-   `usersSettings`: `object` - **Priority source** for all user information throughout the component. Automatically stores and manages user settings by user ID. Structure:
    ```javascript
    {
      "user-id-1": {
        name: "User Name",
        avatar: "avatar-url",
        location: "User Location",
        status: "online|offline|away|busy"
      },
      "user-id-2": { ... }
    }
    ```
    The component automatically prioritizes values from `usersSettings` over direct props (`userName`, `userAvatar`, etc.). This ensures consistent user display across messages, headers, and participant lists.

Chat Settings:

-   `groupChatTemplate`: `string` - Template for group chat header text. Use {count} as placeholder for number of participants. Default: `Group Chat ({count} participants)`
-   `allowAttachments`: `boolean` - Whether to allow file attachments. Default: `false`
-   `disabled`: `boolean` - Whether the chat component is disabled. Default: `false`
-   `autoScrollBehavior`: `string` - Controls how the chat scrolls to bottom when new messages arrive. Options: `smooth` (animated scrolling), `auto` (instant jump). Default: `auto`

Localization Properties:

-   `locale`: `string` - Locale code for date/time formatting. Supports over 40 languages and regional variants including:
    -   English (US, UK, Canada, Australia, New Zealand, Ireland, India, South Africa)
    -   French (France, Canada, Switzerland)
    -   German (Germany, Austria)
    -   Spanish
    -   Italian (Italy, Switzerland)
    -   Portuguese (Portugal, Brazil)
    -   Russian
    -   Japanese (including Hiragana)
    -   Chinese (Simplified, Hong Kong, Taiwan)
    -   Korean
    -   Arabic (multiple variants)
    -   Hindi, Bengali
    -   And many more European and Asian languages.
        Default: `enUS`
-   `timeFormat`: `string` - Format for time display using date-fns format pattern. Default: `h:mm a`
-   `todayText`: `string` - Text to display for today's date. Default: `Today`
-   `yesterdayText`: `string` - Text to display for yesterday's date. Default: `Yesterday`
-   `justNowText`: `string` - Text to display for very recent messages. Default: `just now`

Chat Data:

-   `messages`: `array` - Array of message objects for the chat history. Each message contains:
    -   `id`: `string` - Unique identifier for the message
    -   `text`: `string` - Message text content
    -   `senderId`: `string` - ID of the message sender

    -   `timestamp`: `string` - ISO timestamp of when the message was sent
    -   `attachments`: `array` (optional) - Array of attachment objects
    -   `avatar` or `avatarUrl`: `string` (optional) - URL of sender's avatar image

Message Data Mapping:

-   `mappingMessageId`: `Formula` - Formula to extract message ID from your data. Default: `context.mapping?.['id']`
-   `mappingMessageText`: `Formula` - Formula to extract message text from your data. Default: `context.mapping?.['text']`
-   `mappingSenderId`: `Formula` - Formula to extract sender ID from your data. Default: `context.mapping?.['senderId']`
-   `mappingTimestamp`: `Formula` - Formula to extract timestamp from your data. Default: `context.mapping?.['timestamp']`
-   `mappingAttachments`: `Formula` - Formula to extract attachments from your data. Default: `context.mapping?.['attachments']`

Events:

-   `messageSent`: {message: messageObject} - Triggered when a new message is sent
-   `messageReceived`: {message: messageObject} - Triggered when a new message is received from someone else
-   `messageRightClick`: {message: messageObject, position: {x, y}} - Triggered when a message is right-clicked
-   `attachmentClick`: {attachment: attachmentObject} - Triggered when an attachment is clicked
-   `close`: {} - Triggered when the close button in the header is clicked

User Settings:

-   There are no dedicated user settings events. User info is provided via participants and optional per-message `userSettings`.

Actions:

-   `scrollToBottom`: Scrolls the message area to the bottom. Args: `smooth` (boolean, optional) - Whether to use smooth scrolling animation. When not specified, uses the `autoScrollBehavior` setting. Default: Uses `autoScrollBehavior` setting

Variables:

-   `chatState`: object - The complete chat state including:
    -   `messages`: array - The full conversation history as an array of message objects
    -   `conversation`: object - Information about the conversation (type, participants, etc.)
    -   `currentUser`: object - Current user information (id, name, avatar, location, status)
    -   `messages`: array - Each message includes user settings in the `userSettings` property
    -   `utils`: object - Component state information (messageCount, isDisabled, etc.)

Local Context Data:

The component provides rich local context data for use in formulas and bindings:

-   `messages`: array - Enhanced message objects with display information and participant details
-   `conversation`: object - Conversation metadata including type (private/group), participant counts, and participant lists
-   `currentUser`: object - Current user information
-   `messages`: array - Each message includes a `userSettings` object containing user information for that message
-   `utils`: object - Component state utilities (message count, disabled state, etc.)

Participant Data:

-   `participants`: `array` - List of chat participants with optional fields: `id`, `name`, `avatar`, `location`, `status`, `isCurrentUser`
-   Mapping formulas:
    -   `mappingParticipantId`, `mappingParticipantName`, `mappingParticipantAvatar`, `mappingParticipantLocation`, `mappingParticipantStatus`, `mappingIsCurrentUser`
-   The component derives sender display names and header information from participants. The current user is inferred from `isCurrentUser`.

Special Features:


 
-   **Self-Contained Messages** - Each message is self-contained with user information, eliminating dependency on external user storage
-   User status indicator (online, offline, away, busy) with automatic fallback handling
-   Chat partner detection that automatically updates the header based on conversation participants
-   Group chat support with customizable display template and participant count
-   Message grouping by sender with enhanced participant information
-   Date separators with "Today", "Yesterday", or date labels, fully customizable
-   Empty message state with customizable text and styling
-   File attachments with image preview support
-   Auto-scrolling to latest messages with configurable behavior (smooth or instant)
-   Context menu support via right-click events on messages
-   Fixed-height textarea with scroll support and hover/focus state styling
-   Shift+Enter support for multiline messages
-   Customizable styling for all elements
-   Formula-based data mapping for flexible message structure

Important Implementation Notes:

Participant identity is fully derived from Participant Data (participants array + mappings). The current user is inferred via `mappingIsCurrentUser`.
-   **Automatic User Settings Management**: When user properties change, the component automatically updates `usersSettings` for the current user
-   **Multi-user Display**: For optimal display, populate `usersSettings` with information for all chat participants, not just the current user
-   **Real-time Reactivity**: Changes to `usersSettings` immediately update all UI elements (messages, headers, participant lists)
-   The chat component is designed for real-time messaging but doesn't include built-in socket connections
-   For large chat histories, consider pagination or virtual scrolling
-   The component uses reactive Vue 3 styling with v-bind for dynamic property updates
-   All styling properties are bindable for dynamic theming
-   The header will automatically display the chat partner's information based on message history and `usersSettings`
-   Right-click events provide coordinates for showing custom context menus at the correct position
-   Responsive design adapts to container size but may need additional styling for small screens
-   The `inputBorderRadius`, `messageRadius`, and `ownMessageRadius` properties support advanced corner control - you can set individual corner radii using the Spacing type interface
-   Message border radius properties give you complete control over message bubble appearance without automatic modifications for message grouping
-   Textarea border states (default/hover/focus) are completely separate from the input area container border for precise styling control

Enhanced Styling Capabilities:

-   **Classes, States & Responsive Support**: All style properties support CSS classes, pseudo-states (hover, focus, etc.), and responsive breakpoints for advanced styling control
-   **Advanced Font Control**: Comprehensive font properties for messages and input area including size, weight (100-900), and family
-   **Flexible Unit Support**: Font size properties support px, em, and rem units with appropriate value ranges and step controls
-   **Spacing Type Integration**: Padding properties, `inputBorderRadius`, `messageRadius`, and `ownMessageRadius` use the advanced Spacing type with corner control and multiple unit options (px, %)
-   **Interactive Border States**: Textarea supports separate styling for default, hover, and focus states with dedicated border properties
-   **Fixed-Height Input Control**: Textarea maintains consistent height with internal scrolling, eliminating dynamic resizing behavior
-   **Typography Consistency**: Font weight properties use standardized numeric values (100-900) for consistent typography across the component

Example Basic Implementation:

```json
{
    "tag": "ww-chat",
    "content": {
        "participants": [
            { "id": "john-doe", "name": "John Doe", "status": "online", "isCurrentUser": true },
            { "id": "agent-007", "name": "Support Agent", "status": "busy" }
        ],
        "displayHeader": true,
        "allowAttachments": true,
        "autoScrollBehavior": "smooth",
        "messages": [
            {
                "id": "msg-1",
                "text": "Hello there! Welcome to our support chat.",
                "senderId": "support-agent",
                
                "timestamp": "2023-06-01T11:15:00.000Z"
            }
        ]
    }
}
```

Example Styled Implementation:

```json
{
    "tag": "ww-chat",
    "content": {
        "participants": [
            { "id": "john-doe", "name": "John Doe", "status": "online", "isCurrentUser": true },
            { "id": "agent-007", "name": "Support Agent", "status": "busy" }
        ],
        "messageBgColor": "#ffffff",
        "messageTextColor": "#24292f",
        "messageBorder": "1px solid #d0d7de",
        "messageRadius": "16px 16px 16px 4px",
        "messageFontSize": "1rem",
        "messageFontWeight": "400",
        "messageFontFamily": "Inter, sans-serif",
        "ownMessageBgColor": "#ddf4ff",
        "ownMessageTextColor": "#0969da",
        "ownMessageBorder": "1px solid #54aeff",
        "ownMessageRadius": "16px 4px 16px 16px",
        "ownMessageFontSize": "1rem",
        "ownMessageFontWeight": "500",
        "ownMessageFontFamily": "Inter, sans-serif",
        "emptyMessageText": "No conversations yet. Start chatting!",
        "emptyMessageColor": "#6e7781",
        "dateSeparatorTextColor": "#57606a",
        "dateSeparatorLineColor": "#d0d7de",
        "dateSeparatorBgColor": "#f0f4f8",
        "dateSeparatorBorderRadius": "12px",
        "inputBgColor": "#ffffff",
        "inputAreaBorder": "1px solid #d0d7de",
        "textareaBorder": "1px solid #d0d7de",
        "textareaBorderHover": "1px solid #a3a8b0",
        "textareaBorderFocus": "1px solid #0969da",
        "inputTextColor": "#24292f",
        "inputHeight": "42px",
        "inputBorderRadius": "12px",
        "inputFontSize": "0.9rem",
        "inputFontWeight": "400",
        "inputFontFamily": "Inter, sans-serif",
        "headerNameFontSize": "1.1rem",
        "headerNameFontWeight": "600"
    }
}
```

 

Troubleshooting:

-   **User information not updating:** Ensure participants and per-message `userSettings` contain the desired display values
-   **Inconsistent user display:** Each message contains its own `userSettings` object - ensure messages have proper user information when added
-   **Messages showing incorrect sender:** Check that `currentUserId` matches the `senderId` in your messages
-   **Participant info not showing:** Ensure each message includes proper `userSettings` when adding messages from different participants
-   **Attachments not working:** Ensure `allowAttachments` is set to `true` and file URLs are accessible
-   **Chat not scrolling to bottom:** Call `scrollToBottom` action after programmatically adding messages. Configure `autoScrollBehavior` setting to control automatic scroll behavior for new messages
-   **User avatar not displaying:** Verify the avatar URL is valid in the message's `userSettings` property (initials will be shown as fallback)
-   **Right-click event not firing:** Make sure the component is not in editing mode
-   **Group chat header not showing correctly:** Check that you have messages from multiple different senders
-   **messageReceived event not triggering:** Verify that the incoming message has a different senderId than currentUserId
-   **Textarea border states not working:** Ensure all three border properties (`textareaBorder`, `textareaBorderHover`, `textareaBorderFocus`) are properly configured
-   **Input height not consistent:** The textarea now uses fixed height with internal scrolling - adjust `inputHeight` property instead of expecting auto-resize behavior

Production content example:

{"uid":"c01ded26-8cd1-411e-b908-7724b45a1daf","name":"Chat 1","wwObjectBaseId":"2c8e3e54-3ea3-48ea-b8c8-e7580e3362a2","libraryComponentBaseId":null,"parentSectionId":"0b7157db-1974-4139-9f41-9a53c4a35e42","parentLibraryComponentId":null,"\_state":{"style":{"mobile":{"padding":"8px"},"tablet":{"padding":"12px"},"default":{"flex":"0 1 auto","width":"500px","height":"800px","display":"flex","overflow":"hidden","customCss":{},"aspectRatio":"unset","borderRadius":"16px"}},"interactions":[{"id":"033cf581-cd67-4cc9-a1d5-58d161a5e821","name":"Insert message","actions":{"40c6dd73-f7c5-4ff4-ac86-c4db3ab1401a":{"id":"40c6dd73-f7c5-4ff4-ac86-c4db3ab1401a","next":"60b36d26-c290-4334-a28f-c625d33e0869","type":"variable","varId":"3e631ef9-8fc9-4dc1-9db7-b8a90d138c8f","internal":false,"varValue":{"code":"event?.['message']","**wwtype":"f"},"arrayUpdateType":"push"},"60b36d26-c290-4334-a28f-c625d33e0869":{"id":"60b36d26-c290-4334-a28f-c625d33e0869","uid":"c01ded26-8cd1-411e-b908-7724b45a1daf","args":[false],"type":"component-action","category":"elements","actionName":"scrollToBottom"}},"trigger":"messageSent","firstAction":"40c6dd73-f7c5-4ff4-ac86-c4db3ab1401a","triggerConditions":null}]},"content":{"default":{"locale":"enUS","disabled":false,"sendIcon":"lucide/send","userName":{"code":"variables['8d04d52d-e816-4b54-b6ce-5fa731592f38-value']","**wwtype":"f","defaultValue":"John"},"todayText":"Today","fontFamily":null,"removeIcon":"lucide/x","timeFormat":"h:mm a","userAvatar":{"code":"variables['f8afce9e-e59b-4a97-8c08-3fc6b8ac54e5-value']","**wwtype":"f","defaultValue":"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"},"userStatus":{"code":"variables['b135e389-bcbd-4abd-b85c-d1d2f4a662ae-value']","__wwtype":"f","defaultValue":"online"},"chatHistory":{"code":"variables['3e631ef9-8fc9-4dc1-9db7-b8a90d138c8f']","__wwtype":"f"},"inputBorder":"1px solid #2d3748","inputHeight":"52px","justNowText":"just now","headerBorder":"none","inputBgColor":"#1e293b","sendIconSize":"20px","userLocation":{"code":"variables['97515301-3723-4779-9c8f-4524bf587e69-value']","\_\_wwtype":"f","defaultValue":"Paris"},"currentUserId":"user-2","displayHeader":true,"headerBgColor":"#1e293b","headerPadding":"16px 24px","messageBorder":"none","sendIconColor":"#3b82f6","yesterdayText":"Yesterday","attachmentIcon":"lucide/paperclip","inputMaxHeight":"120px","inputMinHeight":"48px","inputTextColor":"#ffffff","messageBgColor":"#1e293b","removeIconSize":"16px","backgroundColor":"#121826","containerBorder":"1px solid #2d3748","containerShadow":"0 4px 20px rgba(0, 0, 0, 0.3)","headerBoxShadow":"0 2px 8px rgba(0, 0, 0, 0.2)","headerTextColor":"#ffffff","mappingSenderId":{"code":"context.mapping?.['senderId']","type":"f"},"mappingUserName":{"code":"context.mapping?.['userName']","type":"f"},"removeIconColor":"#f43f5e","allowAttachments":true,"emptyMessageText":"No messages yet","inputPlaceholder":"Ask me anything...","mappingMessageId":{"code":"context.mapping?.['id']","type":"f"},"mappingTimestamp":{"code":"context.mapping?.['timestamp']","type":"f"},"messageTextColor":"#ffffff","ownMessageBorder":"none","showSelfInHeader":false,"emptyMessageColor":"#94a3b8","groupChatTemplate":"Group Chat ({count} participants)","inputBorderRadius":"24px","ownMessageBgColor":"linear-gradient(135deg, #3b82f6, #2563eb)","attachmentIconSize":"20px","headerNameFontSize":"18px","mappingAttachments":{"code":"context.mapping?.['attachments']","type":"f"},"mappingMessageText":{"code":"context.mapping?.['text']","type":"f"},"messagesAreaHeight":"500px","attachmentIconColor":"#64748b","messagesAreaBgColor":"#121826","messagesAreaPadding":"24px","ownMessageTextColor":"#ffffff","dateSeparatorBgColor":"#121826","headerNameFontWeight":"600","containerBorderRadius":"16px","headerLocationOpacity":.7,"inputPlaceholderColor":"#94a3b8","messagesAreaMinHeight":"100px","dateSeparatorLineColor":"#2d3748","dateSeparatorTextColor":"#94a3b8","headerCloseButtonColor":"#64748b","headerLocationFontSize":"14px","headerCloseButtonBgHover":"rgba(0, 0, 0, 0.05)","dateSeparatorBorderRadius":"4px","autoScrollBehavior":"auto"}}}
