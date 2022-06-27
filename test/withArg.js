const puppeteer = require('puppeteer');

(async() => {
  try {
    let argObj = JSON.parse(process.argv.slice(2)[0])
    console.log('args: `JSON.stringify(args)`')
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('http://example.com');
    await page.screenshot({path: 'example.png'});
    console.log("success");
    browser.close();
} catch(error) {
  console.log(error);
}

})();