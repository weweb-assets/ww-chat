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
-   `messageFontSize`: `string` - Font size of messages from others. Supports px, em, and rem units. Default: `0.9375rem`
-   `messageFontWeight`: `string` - Font weight of messages from others (100-900). Default: `400`
-   `messageFontFamily`: `string` - Font family of messages from others. Default: `inherit`
-   `ownMessageBgColor`: `string` - Background color of your own messages. Default: `#dbeafe`
-   `ownMessageTextColor`: `string` - Text color of your own messages. Default: `#1e40af`
-   `ownMessageBorder`: `string` - Border of your own messages. Default: `1px solid #bfdbfe`
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

-   `userName`: `string` - Name to display for the current user. Default: `User`
-   `userAvatar`: `string` - URL of the user avatar image (initials will be used if empty). Default: ``
-   `userLocation`: `string` - Location to display under the user name (optional). Default: ``
-   `userStatus`: `string` - Current status of the user. Options: `online`, `offline`, `away`, `busy`. Default: `online`
-   `currentUserId`: `string` - Unique identifier for the current user (used to identify your messages). Default: `current-user`
-   `showSelfInHeader`: `boolean` - If enabled, shows the current user in the header instead of the chat partner. Default: `false`

Chat Settings:

-   `groupChatTemplate`: `string` - Template for group chat header text. Use {count} as placeholder for number of participants. Default: `Group Chat ({count} participants)`
-   `allowAttachments`: `boolean` - Whether to allow file attachments. Default: `false`
-   `disabled`: `boolean` - Whether the chat component is disabled. Default: `false`

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

-   `chatHistory`: `array` - Array of message objects for the chat history. Each message contains:
    -   `id`: `string` - Unique identifier for the message
    -   `text`: `string` - Message text content
    -   `senderId`: `string` - ID of the message sender
    -   `userName`: `string` - Display name of the message sender
    -   `timestamp`: `string` - ISO timestamp of when the message was sent
    -   `attachments`: `array` (optional) - Array of attachment objects
    -   `avatar` or `avatarUrl`: `string` (optional) - URL of sender's avatar image

Message Data Mapping:

-   `mappingMessageId`: `Formula` - Formula to extract message ID from your data. Default: `context.mapping?.['id']`
-   `mappingMessageText`: `Formula` - Formula to extract message text from your data. Default: `context.mapping?.['text']`
-   `mappingSenderId`: `Formula` - Formula to extract sender ID from your data. Default: `context.mapping?.['senderId']`
-   `mappingUserName`: `Formula` - Formula to extract user name from your data. Default: `context.mapping?.['userName']`
-   `mappingTimestamp`: `Formula` - Formula to extract timestamp from your data. Default: `context.mapping?.['timestamp']`
-   `mappingAttachments`: `Formula` - Formula to extract attachments from your data. Default: `context.mapping?.['attachments']`

Events:

-   `messageSent`: {message: messageObject} - Triggered when a new message is sent
-   `messageReceived`: {message: messageObject} - Triggered when a new message is received from someone else
-   `messageRightClick`: {message: messageObject, position: {x, y}} - Triggered when a message is right-clicked
-   `attachmentClick`: {attachment: attachmentObject} - Triggered when an attachment is clicked
-   `close`: {} - Triggered when the close button in the header is clicked

Actions:

-   `scrollToBottom`: Scrolls the message area to the bottom. Args: `smooth` (boolean, optional) - Whether to use smooth scrolling animation. Default: `false`
-   `clearMessages`: Clears all messages from the chat history
-   `addMessage`: Adds a new message to the chat. Args: message (object with text, senderId, and userName properties)

Variables:

-   `chatHistory`: array - The full conversation history as an array of message objects

Special Features:

-   User status indicator (online, offline, away, busy)
-   Chat partner detection that automatically updates the header based on conversation participants
-   Group chat support with customizable display template and participant count
-   Message grouping by sender
-   Date separators with "Today", "Yesterday", or date labels, fully customizable
-   Empty message state with customizable text and styling
-   File attachments with image preview support
-   Auto-scrolling to latest messages
-   Context menu support via right-click events on messages
-   Fixed-height textarea with scroll support and hover/focus state styling
-   Shift+Enter support for multiline messages
-   Customizable styling for all elements
-   Formula-based data mapping for flexible message structure

Important Implementation Notes:

-   The chat component is designed for real-time messaging but doesn't include built-in socket connections
-   For large chat histories, consider pagination or virtual scrolling
-   The component uses reactive Vue 3 styling with v-bind for dynamic property updates
-   All styling properties are bindable for dynamic theming
-   The header will automatically display the chat partner's information based on message history
-   Right-click events provide coordinates for showing custom context menus at the correct position
-   Responsive design adapts to container size but may need additional styling for small screens
-   The `inputBorderRadius` property supports advanced corner control - you can set individual corner radii using the Spacing type interface
-   Textarea border states (default/hover/focus) are completely separate from the input area container border for precise styling control

Enhanced Styling Capabilities:

-   **Classes, States & Responsive Support**: All style properties support CSS classes, pseudo-states (hover, focus, etc.), and responsive breakpoints for advanced styling control
-   **Advanced Font Control**: Comprehensive font properties for messages and input area including size, weight (100-900), and family
-   **Flexible Unit Support**: Font size properties support px, em, and rem units with appropriate value ranges and step controls
-   **Spacing Type Integration**: Padding properties and `inputBorderRadius` use the advanced Spacing type with corner control and multiple unit options (px, %)
-   **Interactive Border States**: Textarea supports separate styling for default, hover, and focus states with dedicated border properties
-   **Fixed-Height Input Control**: Textarea maintains consistent height with internal scrolling, eliminating dynamic resizing behavior
-   **Typography Consistency**: Font weight properties use standardized numeric values (100-900) for consistent typography across the component

Example Basic Implementation:

```json
{
    "tag": "ww-chat",
    "content": {
        "userName": "John Doe",
        "userStatus": "online",
        "currentUserId": "john-doe",
        "displayHeader": true,
        "allowAttachments": true,
        "chatHistory": [
            {
                "id": "msg-1",
                "text": "Hello there! Welcome to our support chat.",
                "senderId": "support-agent",
                "userName": "Support Agent",
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
        "userName": "John Doe",
        "userAvatar": "https://example.com/avatars/john.jpg",
        "userStatus": "online",
        "currentUserId": "john-doe",
        "messageBgColor": "#ffffff",
        "messageTextColor": "#24292f",
        "messageBorder": "1px solid #d0d7de",
        "messageFontSize": "1rem",
        "messageFontWeight": "400",
        "messageFontFamily": "Inter, sans-serif",
        "ownMessageBgColor": "#ddf4ff",
        "ownMessageTextColor": "#0969da",
        "ownMessageBorder": "1px solid #54aeff",
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

-   **Messages showing incorrect sender:** Check that `currentUserId` matches the `senderId` in your messages
-   **Attachments not working:** Ensure `allowAttachments` is set to `true` and file URLs are accessible
-   **Chat not scrolling to bottom:** Call `scrollToBottom` action after programmatically adding messages
-   **User avatar not displaying:** Verify the avatar URL is valid (initials will be shown as fallback)
-   **Right-click event not firing:** Make sure the component is not in editing mode
-   **Group chat header not showing correctly:** Check that you have messages from multiple different senders
-   **messageReceived event not triggering:** Verify that the incoming message has a different senderId than currentUserId
-   **Textarea border states not working:** Ensure all three border properties (`textareaBorder`, `textareaBorderHover`, `textareaBorderFocus`) are properly configured
-   **Input height not consistent:** The textarea now uses fixed height with internal scrolling - adjust `inputHeight` property instead of expecting auto-resize behavior
