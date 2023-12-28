const pageScraper = require('./pageScraper');

let ultimaTipEnviada = '';
let primeiraExecucao = true;

async function scrapeAll(pageInstance, chatTips) {
    try {
        const page = await pageInstance;
        const chat = await chatTips;
        const entrada = await pageScraper.scraper(page);

        console.log(entrada);
        
        if (!entrada || entrada === ultimaTipEnviada) return;

        if (primeiraExecucao) {
            ultimaTipEnviada = entrada;
            primeiraExecucao = false;
            return;
        }

        ultimaTipEnviada = entrada;
        chat.sendMessage(entrada);
    } catch (err) {
        console.log("Não foi possível abrir a instância do navegador => ", err);
    }
}

module.exports = (browserInstance, chatTips) => scrapeAll(browserInstance, chatTips)