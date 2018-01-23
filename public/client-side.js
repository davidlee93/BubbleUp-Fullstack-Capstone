var MOCK_POST_UPDATES = {
    "postUpdates": [
        {
            "id": "1111111",
            "text": "This is the first post on BubbleUp!.",
            "friendId": "aaaaaa",
            "friendName": "John Doe",
            "publishedAt": 1470016976609
        },
        {
            "id": "2222222",
            "text": "And this is the second one!",
            "friendId": "bbbbbbb",
            "friendName": "Jane Doe",
            "publishedAt": 1470012976609
        },
        {
            "id": "333333",
            "text": "Working on the client-side js to make things work.",
            "friendId": "cccc",
            "friendName": "Jim Doe",
            "publishedAt": 1470011976609
        },
        {
            "id": "4444444",
            "text": "Kind of have to refresh my mind on a lot of this stuff",
            "friendId": "ddddd",
            "friendName": "Jackie Doe",
            "publishedAt": 1470009976609
        },
        {
            "id": "5555555",
            "text": "Since Ajax and jQuery have not been on my mind...",
            "friendId": "eeeee",
            "friendName": "A Deer",
            "publishedAt": 1470000976609
        }
    ]
};

function getRecentPostUpdates(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_POST_UPDATES)}, 1000);
}

// this function stays the same when we connect
// to real API later
function displayPostUpdates(data) {
    for (index in data.postUpdates) {
       $('body').append(
        '<p>' + data.postUpdates[index].text + '</p>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayPostUpdates() {
    getRecentPostUpdates(displayPostUpdates);
}

$(function() {
    getAndDisplayPostUpdates();
})





// function displayData(data) {
//     //console.log(data)
//     const posts = data.map(post => {
//         return `<div>${post.name}</div>`
//     })
//     let div = document.createElement("div");
//     div.innerHTML = posts;
//     document.getElementById('posts').appendChild(div)
// }

// function getPosts() {
//     fetch('/posts')
// .then(response => response.json())
// .then(data => displayData(data))
// .catch(error => console.log(error))
// }

// function deletePost(id){
//     fetch(`/posts/${id}`)
//     .then()
// }

// getPosts()




