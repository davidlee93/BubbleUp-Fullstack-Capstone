// state object
state = {
    currentBubble: {
        title: '',
        category: '',
        content: '',
        contentType: ''
    },
    bubbles: []
}

// Call API functions
function getBubbles() {
    fetch('/bubbles', {
        method: "GET",
        headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(bubbles => displayBubbles(bubbles))
    .catch(error => console.log(error));
}

function createBubble(newBubble) {
    console.log(newBubble);
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBubble)
    }
    fetch(`/bubbles`, options)
    .then(response => response.json())
    .then(bubble => displayNewBubble(bubble))
    .catch(error => console.log(error));
}

function displayNewBubble(data) {
    console.log(data);
    console.log(data.id);
   $('.bubbles').append(
        `<div class="post col-md-4">
            <h3>${data.title}</h3>
            <h3># ${data.category}</h3>
            <p>${data.content}</p>
            <h5>${data.created}</h5>
            <a href="#" class="deleteBubble" data-id="${data.id}">Delete bubble</a>
            <div id="panel">
                <a href="#" data-id="${data.id}" class="editBubble">Edit bubble</a>
                <!-- Dialog Box-->
                <div class="dialog" id="myform" tabindex="-1" data-backdrop="false">
                    <form>
                        <label id="editModal">Edit Bubble
                        </label>
                        <br>
                        <label for="title">Title:</label>
                        <input type="text" id="${data.id}" name="title" class="title">
                        <label for="category">Category:</label>
                        <input type="text" id="${data.id}" name="category" class="category">
                        <label for="content">Content:</label>
                        <input type="text" id="${data.id}" name="content" class="content">
                        <label for="contentType">Content Type:</label>
                        <input type="text" id="${data.id}" name="contentType" class="contentType">
                        <div align="center">
                            <input type="button" value="Edit" class="btnOK" data-id="${data.id}">
                            <input type="button" value="Cancel" class="btnCANCEL">
                        </div>
                    </form>
                </div>
            </div>
        </div>`
    );
}

function updateBubble(id, updates) {
    
    updates.id = id
    console.log(id)
    console.log(updates)
    const options = {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updates)
    }
    fetch(`/bubbles/${id}`, options)
    .then(response => response.json())
    .then(json => console.log(json))
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
function displayBubbles(data) {
    for (index in data) {
       $('.bubbles').append(
        `<div class="post col-md-4">
            <h3>${data[index].title}</h3>
            <h3># ${data[index].category}</h3>
            <p>${data[index].content}</p>
            <h5>${data[index].created}</h5>
            <a href="#" class="deleteBubble" data-id="${data[index].id}">Delete bubble</a>
            <div id="panel">
                <a href="#" data-id="${data[index].id}" class="editBubble">Edit bubble</a>
                <!-- Dialog Box-->
                <div class="dialog" id="myform" tabindex="-1" data-backdrop="false">
                    <form>
                        <label id="editModal">Edit Bubble
                        </label>
                        <br>
                        <label for="title">Title:</label>
                        <input type="text" id="${data[index].id}" name="title" class="title">
                        <label for="category">Category:</label>
                        <input type="text" id="${data[index].id}" name="category" class="category">
                        <label for="content">Content:</label>
                        <input type="text" id="${data[index].id}" name="content" class="content">
                        <label for="contentType">Content Type:</label>
                        <input type="text" id="${data[index].id}" name="contentType" class="contentType">
                        <div align="center">
                            <input type="button" value="Edit" class="btnOK" data-id="${data[index].id}">
                            <input type="button" value="Cancel" class="btnCANCEL">
                        </div>
                    </form>
                </div>
            </div>
        </div>`
        );
    }
}

// Event handlers to call API functions
getBubbles()

//Edit Modal
$(document).on('click', '.editBubble', function() {
    $("#myform input[type=text]").val('');
    $(this).next("div").show(500);
    $(".btnCANCEL").click(function(){
        $(this).closest(".dialog").hide(400);
    });
});

//updateBubble
$(document).on('click', '.btnOK', function() {
    const bubbleId = $(this).data('id');
    const updates = {
        "title": $(`#${bubbleId}.title`).val(),
        "category": $(`#${bubbleId}.category`).val(),
        "content": $(`#${bubbleId}.content`).val(),
        "contentType": $(`#${bubbleId}.contentType`).val()
    };
    state.currentBubble = updates;
    console.log(state.currentBubble);
    updateBubble(bubbleId, state.currentBubble);
    $(this).closest(".dialog").hide(400);
    location.reload();
});

//deleteBubble
$(document).on('click', '.deleteBubble', function(){
    event.preventDefault();
    const result = confirm("Deleting Bubble");
    if (result) {
        const bubbleId = $(this).data('id');
        deleteBubble(bubbleId);
        $(this).parent().remove();
    }
});

//create MODAL
$(document).on('click', '.createBubble', function() {
    event.preventDefault();
    $('#createform input[type=text]').val('');
    $(this).next("#createform").show(500);
    $('.btnCANCEL').click(function(){
        $(this).closest(".createform").hide(400);
    })
});

//createBubble 
//.on('submit') dont work!
$(document).on('click', '.btnCREATE', function() {
    const create = {
        "title": $(`#title`).val(),
        "category": $(`#category`).val(),
        "content": $(`#content`).val(),
        "contentType": $(`#contentType`).val()
    };
    state.currentBubble = create;
    console.log(state.currentBubble);
    createBubble(state.currentBubble);
    $(this).closest('.createform').hide(400);
})

