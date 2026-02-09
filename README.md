# whatsapp-n8n-gateway
🚀 DIY WhatsApp Business Gateway & n8n Outreach System
This repository features a self-hosted, Free WhatsApp API gateway and a complete automation workflow. It is designed to perform automated outreach without relying on expensive third-party APIs like Twilio or the Official WhatsApp Business API.

🛠 What's inside this Repository?

server.mjs (Custom WhatsApp API):

A lightweight, self-hosted WhatsApp Gateway built with Node.js and the Baileys library.

It functions as a Free API server by turning your WhatsApp account into a messaging gateway.

Includes a /send HTTP endpoint that receives triggers from n8n to dispatch messages.

package.json:

Contains the list of all necessary dependencies (Express, Baileys, Pino, etc.) required to run the gateway.

n8n_outreach_workflow.json:

The complete automation logic. Once imported into n8n, it handles the data flow from the database to WhatsApp.

.gitignore:

A critical security file that ensures your personal WhatsApp session data (auth_info_baileys) remains private and is never uploaded to GitHub.

📊 How the System Works
Lead Management: The system connects to Airtable, where lead data (e.g., Software Houses) is pre-populated.

Automated Processing: n8n fetches "Active" leads from Airtable, processes the information, and sends a command to our Custom API.

Smart Delivery: The workflow includes built-in "Wait" nodes to stagger message delivery, mimicking human behavior to keep the WhatsApp account safe.

🚀 The Advantage
No monthly subscriptions or per-message costs. You own the code, you own the VPS, and you control the entire automation pipeline.
