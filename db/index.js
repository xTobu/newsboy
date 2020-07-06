const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db/data.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
const news = {
	title: '',
	src: '',
	url: '',
	content: '',
	date: '',
	createdAt: '',
};
const d = { posts: [], user: {}, count: 0 };
db.defaults(d).write();

// Add a post
db.get('posts').push({ id: 1, title: 'lowdb is awesome' }).write();

// Set a user using Lodash shorthand syntax
db.set('user.name', 'typicode').write();

// Increment count
db.update('count', (n) => n + 1).write();
