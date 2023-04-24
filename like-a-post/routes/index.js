const express = require('express');
const { getFirstLikedPost, updatePostLikedStatus } = require('../db/post');
const router = express.Router();
/* GET home page. */
router.get('/', async (_req, res) => {
	try {
		const isLiked = await getFirstLikedPost();

		if (isLiked) {
			const { liked } = isLiked;
			res.status(200).render('index', { liked });
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
});

router.post('/', async (req, res) => {
	const { liked } = req.body;
	try {
		const isLiked = await getFirstLikedPost({ where: { liked: !liked } });
		if (isLiked) {
			const post = await updatePostLikedStatus(isLiked.id, liked);
			console.log(post.liked);
			res.status(200).json({ liked });
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
