'use strict'

const { BubbleUpPost } = require('./models'); 

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('pages/index');
    });

//    app.get('/bubbles', function(req, res) {
//        res.render('pages/bubbles');
//    });
    app.get('/bubbles', (req, res) => {
    	BubbleUpPost
    		.find()
    		.limit(5)
    		.then(posts => {
    			console.log('fetching posts')
    			console.log(posts)
    			res.json(posts.map(post => post.serialize()));
    		})
    		.catch(err => {
    			console.error(err);
    			res.status(500).json({message: 'Internal server error' });
    		});
    });
    app.get('/bubbles/:id', (req, res) => {
    	BubbleUpPost
    		.findById(req.params.id)
    		.then(post => res.json(post.serialize()))
    		.catch(err => {
    			console.error(err);
    			res.status(500).json({ message: 'Internal server error' });
    		});
    });

    app.post('/bubbles', (req, res) => {
    	const requiredFields = ['category', 'content', 'name'];
    	for (let i = 0; i < requiredFields.length; i++) {
    		const field = requiredFields[i];
    		if (!(field in req.body)) {
    			const message = `Missing \`${field}\` in request body`;
    			console.error(message);
    			return res.status(400).send(message);
    		}
    	}

    	BubbleUpPost
    		.create({
    			category: req.body.category,
    			content: req.body.content,
    			name: req.body.name
    		})
    		.then(bubbleUpPost => res.status(201).json(bubbleUpPost.serialize()))
    		.catch(err => {
    			console.error(err);
    			res.status(500).json({ message: 'Internal server error' });
    		});
    });

    app.delete('/bubbles/:id', (req, res) => {
    	BubbleUpPost
    		.findByIdAndRemove(req.params.id)
    		.then(() => {
    			res.status(204).json({ message: 'success' });
    		})
    		.catch(err => {
    			console.error(err);
    			res.status(500).json({ error: 'Internal server error' });
    		});
    });

    app.put('/bubbles/:id', (req, res) => {
    	if(!(req.params.id && req.body.id === req.body.id)) {
    		res.status(400).json({
    			error: 'Request path id and request body id values must match'
    		});
    	};
    	const updated = {};
    	const updateableFields = ['category', 'content', 'name'];
    	updateableFields.forEach(field => {
    		if (field in req.body) {
    			updated[field] = req.body[field];
    		}
    	});

    	BubbleUpPost
    		.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    		.then(updatedPost => res.status(204).end())
    		.catch(err => res.status(500).json({ message: 'Internal server error' }));
    });
};

// a) Make sure you can return JSON data from /bubbles
// b) Make client requests from app to /bubbles to retrieve that data. 
// c) Setup event handlers to make other calls to data (add, edit, delete)
