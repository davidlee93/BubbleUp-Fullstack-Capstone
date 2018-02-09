'use strict'
const marked = require('marked');
const { BubbleUpPost } = require('./models'); 

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('pages/index');
    });

    // app.get('/bubbles', function(req, res) {
    //    res.render('pages/bubbles');
    // });

    app.get('/bubbles', (req, res) => {
    	BubbleUpPost
    		.find()
    		.limit(15)
    		.then(bubbles => {
    			console.log('fetching posts')
    			console.log(bubbles)
    			if(!(req.get('Content-Type') === 'application/json')) {
    				res.render('pages/bubbles');
    			} else {
    				res.json(bubbles.map(bubble => bubble.serialize()
                    ));
    			}
    			
    		})
    		.catch(err => {
    			console.error(err);
    			res.status(500).json({message: 'Internal server error' });
    		});
    });
    app.get('/bubbles/:id', (req, res) => {
    	BubbleUpPost
    		.findById(req.params.id)
    		.then(bubble => res.json(bubble.serialize()))
    		.catch(err => {
    			console.error(err);
    			res.status(500).json({ message: 'Internal server error' });
    		});
    });

    app.post('/bubbles', (req, res) => {
    	const requiredFields = ['title', 'category', 'content', 'contentType'];
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
                title: req.body.title,
    			category: req.body.category,
    			content: req.body.content,
                contentType: req.body.contentType
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
    	const updateableFields = ['title', 'category', 'content', 'contentType'];
    	updateableFields.forEach(field => {
    		if (field in req.body) {
    			updated[field] = req.body[field];
    		}
    	});
        console.log(updated)
        console.log(req.params.id)
    	BubbleUpPost
    		.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    		.then(updatedBubble => res.json(updatedBubble.serialize()))
    		.catch(err => res.status(500).json({ message: 'Internal server error' }));
    });
};

// a) Make sure you can return JSON data from /bubbles
// b) Make client requests from app to /bubbles to retrieve that data. 
// c) Setup event handlers to make other calls to data (add, edit, delete)
