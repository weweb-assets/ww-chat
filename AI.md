---
name: ww-chat
description: Configurable chat interface with optional header, always-present message area, and an input supporting attachments and events.
keywords: [chat, messaging, conversation, interface]
---

#### ww-chat

***Purpose:***
Unified chat UI: optional header (via `displayHeader`), always-present messages area, and a message input with send/attachment actions. Supports custom styles, mappings, and interaction events.

***Properties:***
- fontFamily: string – Global font family. Example: 'Inter, sans-serif'
- displayHeader: boolean – Toggle header visibility. Example: true
- messages: array – Conversation data. Example: [{ id, text, senderId, timestamp, attachments? }]
- participants: array – [{ id, name?, avatar?, location?, status?, isCurrentUser? }]
- allowAttachments: boolean – Enable file attachments. Example: true
- disabled: boolean – Disable input/actions. Example: false
- autoScrollBehavior: 'auto'|'smooth' – Scroll mode for new messages. Example: 'auto'

- headerBgColor: string – Header background. Example: '#ffffff'
- headerTextColor: string – Header text color. Example: '#1e293b'
- headerBorder: string – Header bottom border. Example: '1px solid #e2e8f0'
- headerPadding: string – Header padding. Example: '12px 16px'
- headerNameFontSize: string – Header name size. Example: '1rem'
- headerNameFontWeight: string – Header name weight. Example: '600'
- headerLocationFontSize: string – Header location size. Example: '0.875rem'
- headerLocationOpacity: number – Location opacity. Example: 0.7
- headerCloseButtonColor: string – Close icon color. Example: '#64748b'
- headerCloseButtonBgHover: string – Close hover bg. Example: 'rgba(0,0,0,.05)'
- headerShowCloseButton: boolean – Show the header close button. Example: true

- messagesAreaBgColor: string – Messages area background. Example: '#ffffff'
- messagesAreaPadding: string – Messages area padding. Example: '16px'

- messageBgColor: string – Others’ message bg. Example: '#f1f5f9'
- messageTextColor: string – Others’ message text. Example: '#334155'
- messageBorder: string – Others’ message border. Example: '1px solid #e2e8f0'
- messageRadius: string – Others’ border radius. Example: '18px'
- messageFontSize: string – Others’ font size. Example: '0.9375rem'
- messageFontWeight: string – Others’ font weight. Example: '400'
- messageFontFamily: string – Others’ font family. Example: 'inherit'

- ownMessageBgColor: string – Own message bg. Example: 'linear-gradient(135deg, #3b82f6, #2563eb)'
- ownMessageTextColor: string – Own message text. Example: '#ffffff'
- ownMessageBorder: string – Own message border. Example: 'none'
- ownMessageRadius: string – Own border radius. Example: '18px'
- ownMessageFontSize: string – Own font size. Example: '0.9375rem'
- ownMessageFontWeight: string – Own font weight. Example: '400'
- ownMessageFontFamily: string – Own font family. Example: 'inherit'

- dateSeparatorTextColor: string – Date text color. Example: '#64748b'
- dateSeparatorLineColor: string – Date line color. Example: '#e2e8f0'
- dateSeparatorBgColor: string – Date bg. Example: '#ffffff'
- dateSeparatorBorderRadius: string – Date radius. Example: '8px'

- inputBgColor: string – Input area container bg. Example: '#ffffff'
- inputAreaBorder: string – Input area top border. Example: '1px solid #e2e8f0'
- textareaBorder: string – Textarea border. Example: '1px solid #e2e8f0'
- textareaBorderHover: string – Textarea hover border. Example: '1px solid #cbd5e1'
- textareaBorderFocus: string – Textarea focus border. Example: '1px solid #3b82f6'
- inputTextColor: string – Textarea text color. Example: '#334155'
- inputFontSize: string – Textarea font size. Example: '0.875rem'
- inputFontWeight: string – Textarea font weight. Example: '400'
- inputFontFamily: string – Textarea font family. Example: 'inherit'
- inputPlaceholderColor: string – Placeholder color. Example: '#94a3b8'
- inputHeight: string – Textarea height. Example: '38px'
- inputBorderRadius: string – Textarea radius. Example: '20px'
- inputPlaceholder: string – Placeholder text. Example: 'Type a message...'
- inputActionAlign: 'start'|'center'|'end' – Vertical alignment of action buttons. Example: 'end'

- sendIcon: string – Send icon name. Example: 'send'
- sendIconColor: string – Send icon color. Example: '#334155'
- sendIconSize: string – Send icon size. Example: '20px'
- attachmentIcon: string – Attachment icon name. Example: 'paperclip'
- attachmentIconColor: string – Attachment icon color. Example: '#334155'
- attachmentIconSize: string – Attachment icon size. Example: '20px'
- removeIcon: string – Remove icon name. Example: 'x'
- removeIconColor: string – Remove icon color. Example: '#f43f5e'
- removeIconSize: string – Remove icon size. Example: '12px'

- sendButtonBgColor: string – Send button bg/gradient. Example: 'linear-gradient(135deg, #3b82f6, #2563eb)'
- sendButtonHoverBgColor: string – Send button hover bg. Example: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
- sendButtonBorder: string – Send button border. Example: 'none'
- sendButtonBorderRadius: string – Send button radius. Example: '12px'
- sendButtonSize: string – Send button size. Example: '42px'
- sendButtonBoxShadow: string – Send button shadow. Example: '0 2px 4px rgba(59,130,246,.3)'
- attachmentButtonBgColor: string – Attachment button bg. Example: '#f8fafc'
- attachmentButtonHoverBgColor: string – Attachment button hover bg. Example: '#f1f5f9'
- attachmentButtonBorder: string – Attachment button border. Example: '1px solid #e2e8f0'
- attachmentButtonBorderRadius: string – Attachment button radius. Example: '12px'
- attachmentButtonSize: string – Attachment button size. Example: '42px'
- attachmentButtonBoxShadow: string – Attachment button shadow. Example: '0 1px 2px rgba(0,0,0,.06)'

- emptyMessageText: string – Text when no messages. Example: 'No messages yet'
- emptyMessageColor: string – Empty state color. Example: '#64748b'

- locale: string – Date-fns locale key. Example: 'enUS'
- timeFormat: string – Time display format. Example: 'h:mm a'
- todayText: string – Label for today. Example: 'Today'
- yesterdayText: string – Label for yesterday. Example: 'Yesterday'
- justNowText: string – Label for recent time. Example: 'just now'

- mappingMessageId: Formula – Extract message id. Default: context.mapping?.['id']
- mappingMessageText: Formula – Extract text. Default: context.mapping?.['text']
- mappingSenderId: Formula – Extract sender id. Default: context.mapping?.['senderId']
- mappingTimestamp: Formula – Extract timestamp. Default: context.mapping?.['timestamp']
- mappingAttachments: Formula – Extract attachments. Default: context.mapping?.['attachments']

Attachments Data (visible only when Attachments mapping is set):
- mappingAttachmentId: Formula – Attachment id. Example: context.mapping?.['id']
- mappingAttachmentName: Formula – Attachment name. Example: context.mapping?.['name']
- mappingAttachmentUrl: Formula – Attachment URL. Example: context.mapping?.['url'] ?? context.mapping?.['href']
- mappingAttachmentType: Formula – Attachment MIME type. Example: context.mapping?.['type'] ?? context.mapping?.['mime']
- mappingAttachmentSize: Formula – Attachment size in bytes. Example: context.mapping?.['size'] ?? context.mapping?.['length']
- mappingParticipantId: Formula – Extract participant id.
- mappingParticipantName: Formula – Extract participant name.
- mappingParticipantAvatar: Formula – Extract avatar url.
- mappingParticipantLocation: Formula – Extract location.
- mappingParticipantStatus: Formula – Extract status.
- mappingIsCurrentUser: Formula – Extract isCurrentUser.

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
- Attachment id is optional; the renderer falls back to the array index when no id is provided.
- Event payload shapes: messageSent attachments may include a File (local upload); messageReceived attachments are metadata objects (id, name, url, type, size).
- IMPORTANT: Do NOT add a custom message input. The component already includes a built-in input area with textarea, send button, and attachment support. Adding another input leads to duplicated UI and broken events.
- Messages area is always rendered; the header is controlled by `displayHeader`.
- Enter sends; Shift+Enter inserts a newline.
- Attachment File objects may not be visible in some inspectors; ids, name, type, size, and url remain available.

***Example***:
<elements>
{"uid":"0","tag":"ww-chat","settings":{},"props":{"default":{"locale":"enUS","disabled":false,"messages":{"js":"return collections['07a4f487-4af6-4fb8-9c00-116cb5cba5de']?.['data']"},"sendIcon":"lucide/alarm-clock-check","userName":{"defaultValue":"User","js":"return wwFormulas.lookup(variables['fc812afb-c75d-4494-ad68-5053345dcff1-value'],collections['e59a6d10-891b-49ab-8fa5-89a5082620a6']?.['data'],\"user_id\").full_name"},"todayText":"Today","fontFamily":"inherit","removeIcon":"lucide/album","timeFormat":"h:mm a","userAvatar":{"defaultValue":"","js":"return wwFormulas.lookup(variables['fc812afb-c75d-4494-ad68-5053345dcff1-value'],collections['e59a6d10-891b-49ab-8fa5-89a5082620a6']?.['data'],\"user_id\").avatar_url"},"userStatus":{"defaultValue":"online","js":"return wwFormulas.lookup(variables['fc812afb-c75d-4494-ad68-5053345dcff1-value'],collections['e59a6d10-891b-49ab-8fa5-89a5082620a6']?.['data'],\"user_id\").about"},"chatHistory":{"filter":{"link":"$or","conditions":[]},"defaultValue":[{"id":"msg-1","text":"Hello there!","senderId":"user-1","userName":"John Doe","timestamp":"2025-08-29T08:11:48.015Z","attachments":[]}],"js":"return collections['07a4f487-4af6-4fb8-9c00-116cb5cba5de']?.['data']"},"inputHeight":"60px","justNowText":"just now","headerBorder":"1px solid #e2e8f0","inputBgColor":"#ffffff","participants":{"js":"return collections['e59a6d10-891b-49ab-8fa5-89a5082620a6']?.['data']"},"sendIconSize":"47px","userLocation":{"defaultValue":"","js":"return wwFormulas.lookup(variables['fc812afb-c75d-4494-ad68-5053345dcff1-value'],collections['e59a6d10-891b-49ab-8fa5-89a5082620a6']?.['data'],\"user_id\").location"},"currentUserId":{"defaultValue":"user-1","js":"return variables['fc812afb-c75d-4494-ad68-5053345dcff1-value']"},"displayHeader":true,"groupChatText":"","headerBgColor":"#f0f7ff","headerPadding":"12px 16px","inputFontSize":"0.875rem","messageBorder":"1px solid #e2e8f0","messageRadius":"0px 6px 6px 12px","sendIconColor":"#7105FF","yesterdayText":"Yesterday","attachmentIcon":"paperclip","inputTextColor":"#334155","messageBgColor":"#f1f5f9","removeIconSize":"16px","textareaBorder":"1px solid #e2e8f0","headerTextColor":"#1e293b","inputAreaBorder":"1px solid #e2e8f0","inputFontFamily":"inherit","inputFontWeight":"400","mappingSenderId":{"js":"return context.mapping?.['user_id']"},"mappingUserName":{"js":"return wwFormulas.lookup(context.mapping?.['user_id'],collections['e59a6d10-891b-49ab-8fa5-89a5082620a6']?.['data'],\"user_id\").full_name"},"messageFontSize":"0.875rem","removeIconColor":"#334155","allowAttachments":true,"emptyMessageText":"No messages yet","mappingMessageId":{"js":"return context.mapping?.['id']"},"mappingTimestamp":{"js":"return context.mapping?.['send_at']"},"messageTextColor":"#334155","ownMessageBorder":"1px solid #bfdbfe","ownMessageRadius":"6px 0px 6px 6px","showSelfInHeader":false,"emptyMessageColor":"#64748b","inputBorderRadius":"20px","messageFontFamily":"inherit","messageFontWeight":"400","ownMessageBgColor":"#dbeafe","attachmentIconSize":"20px","autoScrollBehavior":"smooth","headerNameFontSize":"1rem","mappingAttachments":{"js":"return context.mapping?.['attachment']"},"mappingMessageText":{"js":"return context.mapping?.['message']"},"ownMessageFontSize":"0.875rem","attachmentIconColor":"#334155","messagesAreaBgColor":"#ffffff","messagesAreaPadding":"16px","ownMessageTextColor":"#1e40af","textareaBorderFocus":"1px solid #3b82f6","textareaBorderHover":"1px solid #cbd5e1","dateSeparatorBgColor":"#ffffff","headerNameFontWeight":"600","mappingIsCurrentUser":{"js":"return context.mapping?.['user_id'] == variables['fc812afb-c75d-4494-ad68-5053345dcff1-value']"},"mappingParticipantId":{"js":"return context.mapping?.['user_id']"},"ownMessageFontFamily":"inherit","ownMessageFontWeight":"400","headerLocationOpacity":0.7,"inputPlaceholderColor":"#94a3b8","dateSeparatorLineColor":"#e2e8f0","dateSeparatorTextColor":"#64748b","headerCloseButtonColor":"","headerLocationFontSize":"0.875rem","mappingParticipantName":{"js":"return context.mapping?.['full_name']"},"headerCloseButtonBgHover":"rgba(0, 0, 0, 0.05)","mappingParticipantAvatar":{"js":"return context.mapping?.['avatar_url']"},"mappingParticipantStatus":{"js":"return context.mapping?.['about']"},"dateSeparatorBorderRadius":"4px","mappingParticipantLocation":{"js":"return context.mapping?.['location']"}}},"styles":{"default":{"width":"90%","display":"block","maxHeight":"800px","minHeight":"400px"}}}
</elements>
