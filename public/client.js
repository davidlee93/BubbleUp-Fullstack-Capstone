
function displayData(data) {
	//console.log(data)
	const posts = data.map(post => {
		return `<div>${post.name}</div>`
	})
	let div = document.createElement("div");
	div.innerHTML = posts;
	document.getElementById('posts').appendChild(div)
}

function getPosts() {
	fetch('/posts')
.then(response => response.json())
.then(data => displayData(data))
.catch(error => console.log(error))
}

function deletePost(id){
	fetch(`/posts/${id}`)
	.then()
}

getPosts()