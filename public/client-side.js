var MOCK_POST_UPDATES = {
    "postUpdates": [
    {
        "name": {
            "firstName": "Test1",
            "lastName": "Testerton1"
        },
        "category": "Funny",
        "content": "https://youtuve.com/video",
        "contentType": "Video",
        "created": "1470012976609"
    }
    {
        "name": {
            "firstName": "Test2",
            "lastName": "Testerton2"
        },
        "category": "Motivational",
        "content": "https://youtuve.com/video/motivational",
        "contentType": "Video",
        "created": "1470012976610"
    }
    {
        "name": {
            "firstName": "Test3",
            "lastName": "Testerton3"
        },
        "category": "Thoughtful",
        "content": "Man does not live by bread alone",
        "contentType": "quote",
        "created": "1470012976611"
    }
    {
        "name": {
            "firstName": "Test4",
            "lastName": "Testerton4"
        },
        "category": "Reminder",
        "content": "Got to do ____ on a daily basis",
        "contentType": "text",
        "created": "1470012976612"
    }
    {
        "name": {
            "firstName": "Test5",
            "lastName": "Testerton5"
        },
        "category": "Scripture",
        "content": "Rejoice in the Lord always; again I will say, rejoice. Let your reasonableness be known to everyone. The Lord is at hand; do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus - Philippains 4:4-7",
        "contentType": "quote",
        "created": "1470012976613"
    }]
};

function getRecentPostUpdates(callbackFn) {
    // $('.bubbles-onclick').onclick(event => {
    //     callbackFn(MOCK_POST_UPDATES);
    // });

    setTimeout(function(){ callbackFn(MOCK_POST_UPDATES)}, 1000);
}

// this function stays the same when we connect
// to real API later
function displayPostUpdates(data) {
    for (index in data.postUpdates) {
       $('body').append(
        `<div class="post col-md-4">
            <p>${data.postUpdates[index].friendName}</p>
            <p>${data.postUpdates[index].text}</p>
            <p>${data.postUpdates[index].publishedAt}</p>
        </div>`
        );
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




