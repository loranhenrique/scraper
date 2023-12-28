const browserObject = require('./src/browser');
const pageController = require('./src/pageController');
const qrcode = require('qrcode-terminal');
const wppw = require('whatsapp-web.js');


const client = new wppw.Client({
    authStrategy: new wppw.LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    const chats = await client.getChats();
    const chatTips = chats.find(chat => chat.name.includes('Tips'));
    //chatTips.sendMessage('☀️ Bom dia galerinha\n🍀 Iniciando os trabalhos do bot Tips!\n🚨 Assim que surgir uma nova tip, eu te aviso!');

    let browserInstance = browserObject.startBrowser();

    setInterval(() => {
        pageController(browserInstance, chatTips);
    }, 5000);
});

client.initialize();