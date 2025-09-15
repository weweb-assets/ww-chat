---
name: ww-chat
description: Configurable chat interface with optional header, always-present message area, and an input supporting attachments and events.
keywords: [chat, messaging, conversation, interface]
---

#### ww-chat

***Purpose:***
Unified chat UI: optional header (via `displayHeader`), always-present messages area, and a message input with send/attachment actions. Supports custom styles, mappings, and interaction events.

***Features:***
- Optional header with user/participant info and close button.
- Message grouping, date separators, and auto-scroll.
- Attachments with preview and click event.
- Right-click event on messages for custom menus.
- External updates trigger `messageReceived` (watcher, skip initial, de-dupe by id).

***Properties:***
- displayHeader: boolean – Toggle header visibility. Example: true
- messages: array – Conversation data. Example: [{ id, text, senderId, timestamp, attachments? }]
- participants: array – [{ id, name?, avatar?, location?, status?, isCurrentUser? }]
- autoScrollBehavior: 'auto'|'smooth' – Scrolling when new messages appear. Example: 'auto'
- inputHeight: string – Textarea height. Example: '38px'
- inputPlaceholder: string – Placeholder text. Example: 'Type a message...'
- textareaBorder: string – Border CSS. Example: '1px solid #e2e8f0'
- messageBgColor: string – Other messages background. Example: '#f1f5f9'
- ownMessageBgColor: string – Own messages background. Example: 'linear-gradient(135deg, #3b82f6, #2563eb)'

***Slots:***
- None.

***Context data (only accessible to this element and its children):***
- context.local.data?.['chat']?.['messages'] – Normalized messages with display info.
- context.local.data?.['chat']?.['conversation'] – Conversation metadata (type, participants, counts).
- context.local.data?.['chat']?.['currentUser'] – Current user info.
- context.local.data?.['chat']?.['utils'] – State: messageCount, isDisabled, allowAttachments, displayHeader.

***Exposed Variables:***
- chatState: Full chat state (messages, conversation, currentUser, utils). Path: variables['<current_element_uid>-chatState']

***Events:***
- messageSent: Triggered when the user sends a message. Payload: { message }
- messageReceived: Triggered when a new message appears in `messages` from another sender. Payload: { message }
- messageRightClick: Triggered on right-click on a message. Payload: { message, position }
- attachmentClick: Triggered when an attachment is clicked. Payload: { attachment }
- close: Triggered when the header close button is clicked. Payload: {}

***Exposed Element Actions:***
- scrollToBottom: (smooth?: boolean) Scroll to the latest message; uses `autoScrollBehavior` when arg omitted.

***Notes:***
- Messages area is always rendered; the header is controlled by `displayHeader`.
- Enter sends; Shift+Enter inserts a newline.
- Attachment File objects may not be visible in some inspectors; ids, name, type, size, and url remain available.

