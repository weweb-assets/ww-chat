---
name: ww-chat
description: Chat interface with optional header, always-present message area, and message input with attachments.
keywords: [chat, messaging, conversation, interface]
---

#### Chat Component

Structure:
- Header: Optional, controlled by `displayHeader`. Shows user/participant info and a close button.
- Messages area: Always present. Renders messages, grouping, and date separators.
- Input area: Always present. Includes textarea and actions (send, attachment).

Key Properties (selection):
- `displayHeader` (boolean) – Show/hide header. Default: `true`.
- `messages` (array) – Conversation data source.
- `participants` (array) – Participants with `id`, optional `name`, `avatar`, `location`, `status`, `isCurrentUser`.
- Textarea style: `inputHeight`, `inputBorderRadius`, `textareaBorder`, `textareaBorderHover`, `textareaBorderFocus`, `inputTextColor`, `inputPlaceholderColor`.
- Message style: `messageBgColor`, `messageTextColor`, `messageBorder`, `messageRadius`, and corresponding `ownMessage*` variants.
- Messages area: `messagesAreaBgColor`, `messagesAreaPadding`.

Events:
- `messageSent` ({ message }) – Fired when the user sends a message (Enter or Send button).
- `messageReceived` ({ message }) – Fired when a new message appears in `messages` from a different sender than the current user. The component watches the bound array, skips initial history, and de‑dupes by message `id`.
- `messageRightClick` ({ message, position }) – Fired on right‑click on a message.
- `attachmentClick` ({ attachment }) – Fired when an attachment preview is clicked.
- `close` ({}) – Fired when the header close button is clicked.

Actions:
- `scrollToBottom(smooth?: boolean)` – Scrolls the messages area to the bottom. If omitted, uses `autoScrollBehavior`.

Message Mapping:
- `mappingMessageId` – Formula for message id. Default: `context.mapping?.['id']`.
- `mappingMessageText` – Formula for text. Default: `context.mapping?.['text']`.
- `mappingSenderId` – Formula for sender id. Default: `context.mapping?.['senderId']`.
- `mappingTimestamp` – Formula for timestamp. Default: `context.mapping?.['timestamp']`.
- `mappingAttachments` – Formula for attachments. Default: `context.mapping?.['attachments']`.

Participant Mapping:
- `mappingParticipantId`, `mappingParticipantName`, `mappingParticipantAvatar`, `mappingParticipantLocation`, `mappingParticipantStatus`, `mappingIsCurrentUser`.

Behavior Notes:
- Current user is inferred from participants where `isCurrentUser` is true.
- `messageReceived` emits only for newly detected messages (not on initial load) where `senderId !== currentUserId`.
- Attachments in events are included as provided; File objects may not display in some inspectors.

Minimal Example:
```json
{
  "tag": "ww-chat",
  "content": {
    "participants": [
      { "id": "me", "name": "Me", "isCurrentUser": true },
      { "id": "bot", "name": "Bot" }
    ],
    "messages": [
      { "id": "m1", "text": "Hello", "senderId": "bot", "timestamp": "2023-06-01T11:15:00.000Z" }
    ],
    "displayHeader": true,
    "autoScrollBehavior": "auto"
  }
}
```

For the complete list of properties and defaults, see `ww-config.js`.

