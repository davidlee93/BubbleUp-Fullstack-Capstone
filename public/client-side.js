var MOCK_POSTS = {
    "posts": [
    {
        "name": {
            "firstName": "Test1",
            "lastName": "Testerton1"
        },
        "category": "Funny",
        "content": "https://youtuve.com/video",
        "contentType": "Video",
        "created": "1470012976609"
    },
    {
        "name": {
            "firstName": "Test2",
            "lastName": "Testerton2"
        },
        "category": "Motivational",
        "content": "https://youtuve.com/video/motivational",
        "contentType": "Video",
        "created": "1470012976610"
    },
    {
        "name": {
            "firstName": "Test3",
            "lastName": "Testerton3"
        },
        "category": "Thoughtful",
        "content": "Man does not live by bread alone",
        "contentType": "quote",
        "created": "1470012976611"
    },
    {
        "name": {
            "firstName": "Test4",
            "lastName": "Testerton4"
        },
        "category": "Reminder",
        "content": "Got to do ____ on a daily basis",
        "contentType": "text",
        "created": "1470012976612"
    },
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

// state object
state = {
    currentPost: {
        category: '',
        content: '',
        contentType: ''
    },
    posts: []
}

// Call API functions
function getPosts() {
    // $.ajax({
    //     method: "GET",
    //     url: "/bubbles",
    //     headers: { 'Content-Type': 'application/json'}
    // }
    fetch('/bubbles', {
        method: "GET",
        headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(bubbles => displayPosts(bubbles))
    .catch(error => console.log(error));
}

function createBubble() {

    const post = {
        "name": {
            "firstName": "Edit",
            "lastName": "Me"
        },
        "category": "Needs Edit",
        "content": "Bubble needs editing",
        "contentType": "text",
        "created": "just now"
    }
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(post)
    }
    fetch(`/bubbles`, options)
    .then(response => response.json())
    .then(bubble => displayNewPost(bubble))
    .catch(error => console.log(error));
}

function displayNewPost(data) {
   $('.bubbles').append(
    `<div class="post col-md-4">
        <h3>${data.name}</h3>
        <h3># ${data.category}</h3>
        <p>${data.content}</p>
        <h5>${data.created}</h5>
        <a href="#" class="deleteBubble" data-id=${data.id}>Delete bubble</a>
        <div id="panel">
            <a href="#" class="editBubble">Edit bubble</a>
            <div class="dialog" id="myform" tabindex="-1" data-backdrop="false">
                <form>
                    <label id="Edit Page">
                    </label>
                    <input type="text" name="category" id="name">
                    <input type="text" name="content" id="content">
                    <input type="text" name="contentType" id="contentType">
                    <div align="center">
                        <input type="button" value="Edit" id="btnOK" data-id=${data.id}>
                    </div>
                </form>
            </div>
        </div>
    </div>`
    );
}
// <input type="text" name="category" id="category" ex.value="Sports" />
// <button id="create-post-button" onclick="grabPost()" /> 
 
//  function grabPost () {
//     const post = {
//            category: $("#category").val(),
//            content: $("#content").val(),
//            contentType: $("contentType").val()
//     }
//     // set state currentPost to post value from create form
//     state.currentPost = post
//  }
 
// $("#create-post-button").click({
//     createPost(state.currentPost)
// })

function updatePost(id) {
    
    const post = {
        "category": $("#category").val(),
        "content": $("#content").val(),
        "contentType": $("#contentType").val()
    }
    state.currentPost = post;

    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(state.currentPost)
    }
    fetch(`/bubbles/${id}`, options)
    .then(response => response.json())
    .then(bubble => displayNewPost(bubble))
    .catch(error => console.log(error));
}

function deleteBubble(bubbleId) {
    console.log(bubbleId)
    fetch(`/bubbles/${bubbleId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
}

// display data from API
function displayPosts(data) {
    for (index in data) {
       $('.bubbles').append(
        `<div class="post col-md-4">
            <h3>${data[index].name}</h3>
            <h3># ${data[index].category}</h3>
            <p>${data[index].content}</p>
            <h5>${data[index].created}</h5>
            <a href="#" class="deleteBubble" data-id=${data[index].id}>Delete bubble</a>
            <div id="panel">
                <a href="#" class="editBubble">Edit bubble</a>
                <!-- Dialog Box-->
                <div class="dialog" id="myform" tabindex="-1" data-backdrop="false">
                    <form>
                        <label id="editModal">Edit Page
                        </label>
                        <br>
                        <label for="category">Category:</label>
                        <input type="text" name="category" id="category">
                        <label for="content">Content:</label>
                        <input type="text" name="content" id="content">
                        <label for="contentType">Content Type:</label>
                        <input type="text" name="contentType" id="contentType">
                        <div align="center">
                            <input type="button" value="Edit" id="btnOK" data-id=${data[index].id}>
                        </div>
                    </form>
                </div>
            </div>
        </div>`
        );
    }
}

// Event handlers to call API functions
getPosts()

$(document).on('click', '.editBubble', function() {
    $("#myform input[type=text]").val('');
    $("#myform").show(500);
});

$(document).on('click', '#btnOK', function() {
    const bubbleId = $(this).data('id');
    updatePost(bubbleId);
    $("#myform").hide(400);
});

// $(function() {
//     $(".edit-button").click(function() {
//         $("#myform #valueFromMyButton").text($(this).val().trim());
//         $("#myform input[type=text]").val('');
//         $("#valueFromMyModal").val('');
//         $("#myform").show(500);
//     });
//     $("#btnOK").click(function() {
//         $("#valueFromMyModal").val($("#myform input[type=text]").val().trim());
//         $("#myform").hide(400);
//     });
// });

$(document).on('click', '.deleteBubble', function(){
    event.preventDefault();
    const bubbleId = $(this).data('id');
    deleteBubble(bubbleId);
    $(this).parent().remove();

});

$(document).on('click', '.createBubble', function(){
    event.preventDefault();
    createBubble();
});

