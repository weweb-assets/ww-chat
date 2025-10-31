# WW-CHAT

This is a customizable chat component for WeWeb, designed to be easily integrated into any project. It provides a complete chat interface, including a header, message list, and input area, with extensive options for customization.

## Features

- **Customizable Header:** Display user information, including name, avatar, location, and status.
- **Message List:** Shows a list of messages with support for attachments, grouping by sender, and date separators.
- **Input Area:** Allows users to type messages and attach files, with a sleek and modern design.
- **Flexible Styling:** All colors, fonts, and borders can be customized to match your application's theme.
- **Participant Mapping:** Easily map your existing data structures to the chat component's participant and message formats.
- **Event Handling:** Emits events for common chat actions, such as sending messages and clicking attachments.

## Installation

To use this component in your project, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ww-chat.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd ww-chat
    ```
3.  **Install the dependencies:**
    ```bash
    npm install
    ```

## Usage

To run the component locally, use the following command:

```bash
npm run serve --port=[PORT]
```

Then, go to the WeWeb editor, open the developer popup, and add `localhost:[PORT]` as a custom element.

## Build

To build the component for production, run the following command:

```bash
npm run build --name="ww-chat" --type="element"
```

This will create a production-ready build in the `dist` directory.
