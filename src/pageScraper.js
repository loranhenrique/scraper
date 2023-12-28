async function scraper(page) {
    const terminalOutput = await page.evaluate(() => {
        const elemento = document.querySelectorAll('.bubbles-group.bubbles-group-last .message.spoilers-container');
        const lista = [...elemento];
        const ultimoElemento = lista[lista.length - 1];
        return ultimoElemento ? ultimoElemento.innerText : null;
    });

    return terminalOutput;
}


module.exports = { scraper };