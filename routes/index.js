'use strict'
const marked = require('marked');
const { BubbleUpPost } = require('./models'); 

module.exports = function(app) {
	app.get('/', function(req, res) {
        res.render('pages/home');
	});

	app.get('/bubbles', function(req, res) {
        res.render('pages/bubbles');
	});
	
    app.get('/bubbles/all', (req, res) => {
    	BubbleUpPost
    		.find()
    		.limit(100)
    		.then(bubbles => {
				res.json(bubbles.map(bubble => bubble.serialize())); 			
    		})
    		.catch(err => {
    			res.status(500).json({message: 'Internal server error' });
    		});
	});
	
	app.get('/bubbles/:category', (req, res) => {
    	BubbleUpPost
			.find()
    		.then(bubbles => {
				const filtered = bubbles.filter(bubble => bubble.category.toLowerCase().includes(req.params.category.toLowerCase().trim()));
				res.json(filtered.map(bubble => bubble.serialize()));
			})
    		.catch(err => {
    			res.status(500).json({ message: 'Internal server error' });
    		});
	});

    app.post('/bubbles', (req, res) => {
    	const requiredFields = ['title', 'category', 'content'];
    	for (let i = 0; i < requiredFields.length; i++) {
    		const field = requiredFields[i];
    		if (!(field in req.body)) {
    			const message = `Missing \`${field}\` in request body`;
    			return res.status(400).send(message);
    		}
    	}
    	BubbleUpPost
    		.create({
                title: req.body.title,
    			category: req.body.category,
    			content: req.body.content
    		})
    		.then(bubble => res.status(201).json(bubble.serialize()))
    		.catch(err => {
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
    	const updateableFields = ['title', 'category', 'content'];
    	updateableFields.forEach(field => {
    		if (field in req.body) {
    			updated[field] = req.body[field];
    		}
    	});
    	BubbleUpPost
    		.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    		.then(updatedBubble => res.json(updatedBubble.serialize()))
    		.catch(err => res.status(500).json({ message: 'Internal server error' }));
	});

};
