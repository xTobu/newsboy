const Crawler = require('./crawler');
const list = require('./list');

(async () => {
	try {
		await largeTitle();
		throw '123';
	} catch (e) {
		console.error(e);
	}
})();
