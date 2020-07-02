const Crawler = require('./crawler');
const list = require('./list');
const asyncForEach = require('./util/asyncForEach.js');
const data = list.map(({ name, website: { marketwatch } }) => {
	return { name, url: marketwatch };
});

const BASE_URL = 'tmp';
const c = new Crawler();

(async () => {
	try {
		await asyncForEach(data, async (item, i) => {
			const { name, url } = item;

			await c.Start(url, BASE_URL);

			await c.page
				.waitForSelector('.element.element--table.performance')
				.then(
					async (element) =>
						await element.screenshot({
							path: `${BASE_URL}/${name}.png`,
						})
				);

			await c.End();
		});
	} catch (e) {
		console.error(e);
	}
})();
