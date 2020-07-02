const waitFor = (ms) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
};
module.exports = waitFor;
