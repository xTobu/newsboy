const puppeteer = require('puppeteer-extra');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const stealth = require('puppeteer-extra-plugin-stealth')();
stealth.onBrowser = () => {};
puppeteer.use(stealth);
puppeteer.use(AdblockerPlugin());

const fs = require('fs');

class Crawler {
	constructor() {
		this.browser = null;
		this.page = null;
		this.dir = null;
	}

	async Start(url, saveDir) {
		try {
			if (!fs.existsSync(saveDir)) {
				fs.mkdirSync(saveDir);
			}
			const args = [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-infobars',
				'--window-position=0,0',
				'--ignore-certifcate-errors',
				'--ignore-certifcate-errors-spki-list',
				'--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
			];
			this.browser = await puppeteer.launch({
				headless: false,
				args,
			});
			this.page = await this.browser.newPage();
			// this.page = (await this.browser.pages())[0];

			// await this.page.setDefaultNavigationTimeout(0);

			await this.page.goto(url, {
				waitUntil: ['networkidle2'],
				timeout: 30 * 1000,
			});

			await this.page.waitForFunction('window.ready');

		} catch (e) {
			console.error(e);
		}
	}

	async End() {
		await this.browser.close();
	}
}
module.exports = Crawler;
