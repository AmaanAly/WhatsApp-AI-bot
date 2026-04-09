# WhatsApp AI Auto-Reply Bot

A Node.js bot that automatically replies to WhatsApp messages using OpenAI's GPT models, making it feel like a real person is responding.

## Features

- **AI-powered responses:** Uses OpenAI's models to generate natural, conversational replies.
- **WhatsApp Web Integration:** Built using `whatsapp-web.js` for seamless connection.
- **Easy Setup:** Simple QR code scanning for authentication.
- **Customizable Prompt:** Define the bot's personality in the `.env` file.
- **Individual Chat Focus:** Automatically ignores group messages to avoid unwanted noise.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [OpenAI API Key](https://platform.openai.com/api-keys)

## Installation

1. Clone this repository or copy the files.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Open `.env` and enter your OpenAI API key and other configurations:
   ```env
   OPENAI_API_KEY=your_actual_api_key_here
   OPENAI_MODEL=gpt-4o-mini
   ```

## Usage

1. Start the bot:
   ```bash
   npm start
   ```
2. A QR code will be generated in your terminal.
3. Open WhatsApp on your phone, go to **Linked Devices**, and scan the QR code.
4. The bot is now active! It will automatically reply to incoming individual messages.

## Customization

- **Bot Personality:** Change the `SYSTEM_PROMPT` in your `.env` file.
- **OpenAI Model:** Change `OPENAI_MODEL` in `.env` (e.g., `gpt-4o-mini`, `gpt-4`).
- **Chrome Path:** If you are running on a server where Chrome/Chromium is installed in a non-standard location, set `CHROME_PATH` in `.env`.

## Troubleshooting

- **QR Code not appearing:** Ensure your terminal window is large enough to display it properly.
- **Authentication Issues:** If you encounter issues, try deleting the `.wwebjs_auth` folder and restart the bot.
- **Chrome/Chromium Errors:** The script defaults to `/usr/bin/google-chrome`. Use `CHROME_PATH` in `.env` if your path is different.
