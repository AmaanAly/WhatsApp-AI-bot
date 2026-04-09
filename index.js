const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { OpenAI } = require('openai');
require('dotenv').config();

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
});

// Initialize WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Use CHROME_PATH from .env or default to /usr/bin/google-chrome
        executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

// Display QR Code
client.on('qr', (qr) => {
    console.log('Scan the QR code below to log in:');
    qrcode.generate(qr, { small: true });
});

// Client is ready
client.on('ready', () => {
    console.log('WhatsApp Bot is ready and running!');
});

// Handle incoming messages
client.on('message', async (msg) => {
    // Basic filter: only respond to individual chats, ignore groups
    if (msg.from.endsWith('@g.us')) {
        return;
    }

    console.log(`Received message from ${msg.from}: ${msg.body}`);

    try {
        // Show "typing..." status
        const chat = await msg.getChat();
        await chat.sendStateTyping();

        // Get AI response
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || "gpt-4o-mini",
            messages: [
                { 
                    role: "system", 
                    content: process.env.SYSTEM_PROMPT || "You are a helpful and friendly person responding to WhatsApp messages. Keep your responses concise and natural, as if you were chatting with a friend." 
                },
                { 
                    role: "user", 
                    content: msg.body 
                }
            ],
        });

        const aiReply = completion.choices[0].message.content;

        // Send the reply
        await msg.reply(aiReply);
        console.log(`Replied with: ${aiReply}`);

    } catch (error) {
        if (process.env.OPENAI_API_KEY === 'your_openai_api_key_here' || !process.env.OPENAI_API_KEY) {
            console.error('Error: OpenAI API Key not configured. Please set it in the .env file.');
        } else {
            console.error('Error generating AI response:', error);
        }
    }
});

// Initialize the client
client.initialize();
