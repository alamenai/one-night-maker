import { likePost } from '/javascripts/api/post.js';

const likeElement = document.getElementById('like-post');
const likeLabel = likeElement.querySelector('p');

likeElement.addEventListener('click', (event) => {
	const { tagName } = event.target;
	if (tagName === 'P' || tagName == 'I' || tagName == 'SPAN') {
		const classList = likeElement.classList;
		let liked = classList.toggle('liked-status');
		likeLabel.textContent = liked ? 'Liked' : 'Like';
		likePost(liked);
	}
});
