const puppeteer = require('puppeteer');
const pageLogin = require('./pageLogin');

async function startBrowser() {
    const url = 'https://web.telegram.org/k/';
    let page;

    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });

        page = await browser.newPage();
        await page.goto(url);
        await pageLogin.login(page);
    } catch (err) {
        console.log("Não foi possível fazer login no telegram => : ", err);
    }

    return page;
}

module.exports = { startBrowser }