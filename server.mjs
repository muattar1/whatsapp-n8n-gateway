import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import express from 'express';
import pino from 'pino';

const app = express();
app.use(express.json());

// Session storage - This folder should be in .gitignore
const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

async function connectToWhatsApp() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed due to error, reconnecting:', shouldReconnect);
            if (shouldReconnect) connectToWhatsApp();
        } else if (connection === 'open') {
            console.log('WhatsApp connection is now open!');
        }
    });

    // API Endpoint for n8n to send messages
    app.post('/send', async (req, res) => {
        const { number, message } = req.body;
        try {
            const jid = `${number}@s.whatsapp.net`;
            await sock.sendMessage(jid, { text: message });
            res.status(200).json({ status: 'Success', message: 'Sent successfully' });
        } catch (error) {
            res.status(500).json({ status: 'Error', error: error.message });
        }
    });

    return sock;
}

const sock = await connectToWhatsApp();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
