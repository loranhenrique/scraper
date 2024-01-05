const pageScraper = require('./pageScraper');

let ultimaTipEnviada = '';
let primeiraExecucao = true;
let jaCobrou = false;

async function scrapeAll(pageInstance, chatTips) {
    try {
        const page = await pageInstance;
        const chat = await chatTips;
        const entrada = await pageScraper.scraper(page);
        
        if (!entrada || entrada === ultimaTipEnviada) return;

        if (primeiraExecucao) {
            if(cobrarPagamentoSemHorario()) chat.sendMessage(mensagemCobranca());
            ultimaTipEnviada = entrada;
            primeiraExecucao = false;
            return;
        }

        if(cobrarPagamentoComHorario() && jaCobrou === false) {
            chat.sendMessage(mensagemCobranca());
            jaCobrou = true;
        }

        ultimaTipEnviada = entrada;
        chat.sendMessage(entrada);
    } catch (err) {
        console.log("Não foi possível abrir a instância do navegador => ", err);
    }
}

function cobrarPagamentoComHorario() {
    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    const horarioAtual = dataAtual.getHours();

    const estaEntre10e19 = diaAtual >= 4 && diaAtual <= 19;
    const is22Horas = horarioAtual === 23;

    if (estaEntre10e19 && is22Horas) return true;
    return false;
}

function cobrarPagamentoSemHorario() {
    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();

    const estaEntre10e19 = diaAtual >= 4 && diaAtual <= 19;
    if (estaEntre10e19) return true;

    return false;
}

function mensagemCobranca() {
    return '🚨 Salve tropa!!!!!\n💳 O cartão do Léo vence dia 19\n📍 Então, se possível fazer o pix até dia 19' +
           '\n👾 PIX: 19997325252 (C6 BANK)' +
           '\n💰 VALOR: R$25,00';
}

module.exports = (browserInstance, chatTips) => scrapeAll(browserInstance, chatTips)