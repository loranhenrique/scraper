async function scraper(page) {
    const terminalOutput = await page.evaluate(() => {
        const elemento = document.querySelectorAll('.bubbles-group.bubbles-group-last .message.spoilers-container');
        const lista = [...elemento];
        const ultimoElemento = lista[lista.length - 1];
        return ultimoElemento ? ultimoElemento.innerText : null;
    });

    if(!terminalOutput) return null;

    const antesOddMinimaMatch = terminalOutput.match(/([\s\S]*)@/);
    const tamanhoEntrada = antesOddMinimaMatch[1].length;
    const valorConvertido = antesOddMinimaMatch[1].concat(terminalOutput.slice(tamanhoEntrada, tamanhoEntrada + 5));

    return valorConvertido;
}


module.exports = { scraper };