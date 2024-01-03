async function login(page) {
    await new Promise(resolve => setTimeout(resolve, 4000));
    await page.click('.c-ripple');

    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.type('.input-field-phone .input-field-input', '5519997325252');
    await page.click('.btn-primary.btn-color-primary .c-ripple');

    await new Promise(resolve => setTimeout(resolve, 20000));
    const chat = await page.$x("//span[contains(text(), 'CLT')]");

    chat.length > 0 
        ? await chat[0].click()
        : console.log('Chat não encontrado!');
}

module.exports = { login }