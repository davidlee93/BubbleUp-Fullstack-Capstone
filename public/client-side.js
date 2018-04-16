
state = {
    currentBubble: {
        title: '',
        category: '',
        content: '',
        contentType: ''
    },
    bubbles: []
};


// Call API functions
function getBubbles() {
    fetch('/bubbles', {
        method: "GET",
        headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(bubbles => displayBubbles(bubbles))
    .catch(error => console.log(error));
};

function filterBubble(category) {
    const options = {
        method: "GET",
        headers: { 'Content-Type': 'application/json'}
    }
    fetch(`/bubbles/${category}`, options)
    .then(response => {
        console.log("tTESTESTESTSETSTEST");
        return response.json()
    })
    .then(bubbles => {
        console.log(bubbles);
        displayBubbles(bubbles)
    })
    .catch(error => console.log(error));
};

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
};


function displayNewBubble(data) {
    console.log(data);
    console.log(data.id);
   if (data.content.includes('https://www.youtube.com')) {
        let videoID = data.content.split("v=")[1];
        let videoUrl = `[![${data.content}](http://img.youtube.com/vi/${videoID}/0.jpg)](http://www.youtube.com/watch?v=${videoID})`
        $('.bubbles').prepend(
        `<div class="bubble col-xs-12">
            <div class="editButton">
                <a href="#" data-id="${data.id}" class="editBubble">
                Edit Bubble
                <i class="far fa-edit"></i>
                </a>
            </div>
            <div class="dialog" id="myform" tabindex="-1" data-backdrop="false">
                <form class="editForm">
                    <label id="editModal">Edit Bubble
                    </label>
                    <br>
                    <a href="#" class="deleteBubble" data-id="${data.id}">
                    Delete
                    <i class="fas fa-trash-alt"></i>
                    </a>
                    <div class="splitModal col-xs-6 leftModal">
                    <label for="title">Title:</label>
                    <input type="text" id="${data.id}" name="title" class="title col-xs-12" value="${data.title}">
                    </div>
                    <div class="splitModal col-xs-6 rightModal">
                    <label for="category">Category:</label>
                    <input type="text" id="${data.id}" name="category" class="category col-xs-12" value="${data.category}">
                    </div>
                    <label for="content">Content:</label>
                    <textarea type="text" rows="4" cols="42" id="${data.id}" name="content" class="content col-xs-12">${data.content}</textarea>
                    <label for="contentType">Content Type:</label>
                    <select type="text" id="${data.id}" name="contentType" class="contentType" value="${data.contentType}">
                        <option>Text/markdown</option>
                        <option>Image</option>
                        <option>Url</option>
                    </select>
                    <div align="center">
                        <input type="submit" value="Edit" class="btnOK" data-id="${data.id}">
                        <input type="button" value="Cancel" class="btnCANCEL">
                    </div>
                </form>
            </div>
            <div>
                <h3>${data.title}</h3>
                <h4># ${data.category}</h4>
                <p>${marked(videoUrl)}</p>
                <h5>Created: ${dateFns.format(data.created, 'MM/DD/YYYY')}</h5>
            </div>

        </div>`
    )
    } else {
        $('.bubbles').prepend(
        `<div class="bubble col-xs-12">
            <div class="editButton">
                <a href="#" data-id="${data.id}" class="editBubble">
                Edit Bubble
                <i class="far fa-edit"></i>
                </a>
            </div>
            <div class="dialog" id="myform" tabindex="-1" data-backdrop="false">
                <form class="editForm">
                    <label id="editModal">Edit Bubble
                    </label>
                    <br>
                    <a href="#" class="deleteBubble" data-id="${data.id}">
                    Delete
                    <i class="fas fa-trash-alt"></i>
                    </a>
                    <div class="splitModal col-xs-6 leftModal">
                    <label for="title">Title:</label>
                    <input type="text" id="${data.id}" name="title" class="title col-xs-12" value="${data.title}">
                    </div>
                    <div class="splitModal col-xs-6 rightModal">
                    <label for="category">Category:</label>
                    <input type="text" id="${data.id}" name="category" class="category col-xs-12" value="${data.category}">
                    </div>
                    <label for="content">Content:</label>
                    <textarea type="text" rows="4" cols="42" id="${data.id}" name="content" class="content col-xs-12">${data.content}</textarea>
                    <label for="contentType">Content Type:</label>
                    <select type="text" id="${data.id}" name="contentType" class="contentType" value="${data.contentType}">
                        <option>Text/markdown</option>
                        <option>Image</option>
                        <option>Url</option>
                    </select>
                    <div align="center">
                        <input type="submit" value="Edit" class="btnOK" data-id="${data.id}">
                        <input type="button" value="Cancel" class="btnCANCEL">
                    </div>
                </form>
            </div>
            <div>
                <h3>${data.title}</h3>
                <h4># ${data.category}</h4>
                <p>${marked(data.content)}</p>
                <h5>Created: ${dateFns.format(data.created, 'MM/DD/YYYY')}</h5>
            </div>

        </div>`)
    }
};

function updateBubble(id, updates) {
    
    updates.id = id
    const options = {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updates)
    }
    fetch(`/bubbles/${id}`, options)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error)); 
};

function deleteBubble(bubbleId) {
    fetch(`/bubbles/${bubbleId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
};

// display data from API
function displayBubbles(data) {
    $('.bubbles').html("");
    for (index in data) {
        if (data[index].content.includes('https://www.youtube.com')) {
            let videoID = data[index].content.split("v=")[1];
            let videoUrl = `[![${data[index].content}](http://img.youtube.com/vi/${videoID}/0.jpg)](http://www.youtube.com/watch?v=${videoID})`
            $('.bubbles').prepend(
            `<div class="bubble col-xs-12">
                <div class="editButton">
                    <a href="#" data-id="${data[index].id}" class="editBubble">
                    Edit Bubble
                    <i class="far fa-edit"></i>
                    </a>
                </div>
                <div class="dialog" id="myform" tabindex="-1" data-backdrop="false">
                    <form class="editForm">
                        <label id="editModal">Edit Bubble
                        </label>
                        <br>
                        <a href="#" class="deleteBubble" data-id="${data[index].id}">
                        Delete
                        <i class="fas fa-trash-alt"></i>
                        </a>
                        <div class="splitModal col-xs-6 leftModal">
                        <label for="title">Title:</label>
                        <input type="text" id="${data[index].id}" name="title" class="title col-xs-12" value="${data[index].title}">
                        </div>
                        <div class="splitModal col-xs-6 rightModal">
                        <label for="category">Category:</label>
                        <input type="text" id="${data[index].id}" name="category" class="category col-xs-12" value="${data[index].category}">
                        </div>
                        <label for="content">Content:</label>
                        <textarea type="text" rows="4" cols="42" id="${data[index].id}" name="content" class="content col-xs-12">${data[index].content}</textarea>
                        <label for="contentType">Content Type:</label>
                        <select type="text" id="${data[index].id}" name="contentType" class="contentType" value="${data[index].contentType}">
                            <option>Text/markdown</option>
                            <option>Image</option>
                            <option>Url</option>
                        </select>
                        <div align="center">
                            <input type="submit" value="Edit" class="btnOK" data-id="${data[index].id}">
                            <input type="button" value="Cancel" class="btnCANCEL">
                        </div>
                    </form>
                </div>
                <div>
                    <h3>${data[index].title}</h3>
                    <h4># ${data[index].category}</h4>
                    <p>${marked(videoUrl)}</p>
                    <h5>Created: ${dateFns.format(data[index].created, 'MM/DD/YYYY')}</h5>
                </div>

            </div>`
        )
        } else {
            $('.bubbles').prepend(
            `<div class="bubble col-xs-12">
                <div class="editButton">
                    <a href="#" data-id="${data[index].id}" class="editBubble">
                    Edit Bubble
                    <i class="far fa-edit"></i>
                    </a>
                </div>
                <div class="dialog" id="myform" tabindex="-1" data-backdrop="false">
                    <form class="editForm">
                        <label id="editModal">Edit Bubble
                        </label>
                        <br>
                        <a href="#" class="deleteBubble" data-id="${data[index].id}">
                        Delete
                        <i class="fas fa-trash-alt"></i>
                        </a>
                        <div class="splitModal col-xs-6 leftModal">
                        <label for="title">Title:</label>
                        <input type="text" id="${data[index].id}" name="title" class="title col-xs-12" value="${data[index].title}">
                        </div>
                        <div class="splitModal col-xs-6 rightModal">
                        <label for="category">Category:</label>
                        <input type="text" id="${data[index].id}" name="category" class="category col-xs-12" value="${data[index].category}">
                        </div>
                        <label for="content">Content:</label>
                        <textarea type="text" rows="4" cols="42" id="${data[index].id}" name="content" class="content col-xs-12">${data[index].content}</textarea>
                        <label for="contentType">Content Type:</label>
                        <select type="text" id="${data[index].id}" name="contentType" class="contentType" value="${data[index].contentType}">
                            <option>Text/markdown</option>
                            <option>Image</option>
                            <option>Url</option>
                        </select>
                        <div align="center">
                            <input type="submit" value="Edit" class="btnOK" data-id="${data[index].id}">
                            <input type="button" value="Cancel" class="btnCANCEL">
                        </div>
                    </form>
                </div>
                <div>
                    <h3>${data[index].title}</h3>
                    <h4># ${data[index].category}</h4>
                    <p>${marked(data[index].content)}</p>
                    <h5>Created: ${dateFns.format(data[index].created, 'MM/DD/YYYY')}</h5>
                </div>

            </div>`)
        }
    }
}

function closeAll() {
    $('.dialog').hide();
    $('#createform').hide();
};

// Event handlers to call API functions
getBubbles();

//Edit Modal
$(document).on('click', '.editBubble', function() {
    event.preventDefault()
    closeAll();
    $(this).closest('div').siblings('.dialog').show(400);
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
        $(this).closest(".bubble").remove();
    }
});

//show create MODAL
$(document).on('click', '.createBubble', function() {
    event.preventDefault();
    closeAll();
    $('#createform input[type=text]').val('');
    $('#createform textarea').val('');
    $(this).next("#createform").show(400);
    $('.btnCANCEL').click(function(){
        $(this).closest(".createform").hide();
    })
});

//createBubble 
$(document).on('submit', '.createForm', function() {
    event.preventDefault();
    const create = {
        "title": $(`#title`).val(),
        "category": $(`#category`).val(),
        "content": $(`#content`).val(),
        "contentType": $(`#contentType`).val()
    };
    state.currentBubble = create;
    createBubble(state.currentBubble);
    $(this).closest('.createform').hide(400);
});

//filterBubble
$(document).on('click', '.filterButton', function() {
    event.preventDefault();
    filter = $(`#filter`).val().toLowerCase().trim();
    filterBubble(filter);
});