const baseUrl = 'https://blog-apps-c12bf.firebaseio.com';

function attachEvents() {
	let loadPostsElement = document.getElementById('btnLoadPosts');
	let postsElement = document.getElementById('posts');
	let viewPostBtn = document.getElementById('btnViewPost');
	let postTitleElement = document.getElementById('post-title');
	let postBodyElement = document.getElementById('post-body');
	let postComments = document.getElementById('post-comments');

	loadPostsElement.addEventListener('click', () => {
		fetch(`${baseUrl}/posts.json`)
			.then(res => res.json())
			.then(data => {

				let options = Object.keys(data).map(key =>
					`<option value="${key}">${data[key].title}</option>`).join('');

				postsElement.innerHTML = options;
			});
	});

	viewPostBtn.addEventListener('click', () => {
		fetch(`${baseUrl}/posts/${postsElement.value}.json`)
			.then(res => res.json())
			.then(data => {
				postTitleElement.innerHTML = data.title;
				postBodyElement.innerHTML = data.body;
				let comments;
				try {
					if (data.comments !== undefined) {
						comments = data.comments.map(com => `<li>${com}</li>`).join('');
						postComments.innerHTML = comments;
					} else
						postComments.innerHTML = '';
					
				}catch (err){
					console.log(err.message);
				}
				
			});
	})

}

attachEvents();