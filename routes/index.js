'use strict'

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('pages/index');
    });

    app.get('/bubbles', function(req, res) {
        res.render('pages/bubbles');
    });
};

// a) Make sure you can return JSON data from /bubbles
// b) Make client requests from app to /bubbles to retrieve that data. 
// c) Setup event handlers to make other calls to data (add, edit, delete)

// app.get('/posts', (req,res) => {
// 	BlogPost
// 		.find()
// 		.limit(3)
// 		.then(posts => {
// 			res.json(posts.map(post => post.serialize()));
// 		})
// 		.catch(err => {
// 			console.error(err);
// 			res.status(500).json({ message: 'Internal server error' });
// 		});
// });

// app.get('/posts/:id', (req, res) => {
// 	BlogPost
// 		.findById(req.params.id)
// 		.then(post => res.json(post.serialize()))
// 		.catch(err => {
// 			console.error(err);
// 			res.status(500).json({ message: 'Internal server error' });
// 		});

// });

// app.post('/posts', (req, res) => {
// 	const requiredFields = ['title', 'content', 'author'];
// 	for (let i = 0; i < requiredFields.length; i++) {
// 		const field = requiredFields[i];
// 		if (!(field in req.body)) {
// 			const message = `Missing \`${field}\` in request body`;
// 			console.error(message);
// 			return res.status(400).send(message);
// 		}
// 	}

// 	BlogPost
// 		.create({
// 			title: req.body.title,
// 			content: req.body.content,
// 			author: req.body.author
// 		})
// 		.then(blogPost => res.status(201).json(blogPost.serialize()))
// 		.catch(err => {
// 			console.error(err);
// 			res.status(500).json({ message: 'Internal server error'});
// 		});
// });

// app.delete('/posts/:id', (req, res) => {
// 	BlogPost
// 		.findByIdAndRemove(req.params.id)
// 		.then(() => {
// 			res.status(204).json({ message: 'success' });
// 		})
// 		.catch(err => {
// 			console.error(err);
// 			res.status(500).json({ error: 'Internal server error' });
// 		});

// });

// app.put('/posts/:id', (req, res) => {
// 	if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
// 		res.status(400).json({
// 			error: 'Request path id and request body id values must match'
// 		});
// 	};

// 	const updated = {};
// 	const updateableFields = ['title', 'content', 'author'];
	
// 	updateableFields.forEach(field => {
// 		if (field in req.body) {
// 			updated[field] = req.body[field];
// 		}
// 	});

// 	BlogPost
// 		.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
// 		.then(updatedPost => res.status(204).end())
// 		.catch(err => res.status(500).json({ message: 'Internal server error' }));
// });