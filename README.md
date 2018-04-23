# bubbleUp

https://bubble-up-app.herokuapp.com/

Thinkful's (https://www.thinkful.com/) Fullstack Capstone Project - A web app using Node and Express to create a backend that serves your static files and a REST API.

## Introduction
bubbleUP allows you to create bubbles that become a part of your collection of stories, memories and moments in life you want to be reminded of. You simply need to enter in the title, tag, and content of your bubble. These bubbles can be reminders, fond memories, youtube videos, or maybe even quotes you'd want to remember or have bubble up in your mind as you revisit these bubbles.


## Client-side
There is a simple, single page given to the user to personalize his/her app. The "+" button is for creating a bubble. And the filter input is used to filter through your bubbles by the tags given to each bubble. You may also edit each bubble by clicking the edit button on each bubble and delete the bubble via the edit modal.

The app was designed to work on mobile as well as tablet and desktop from the outset.

### Documentation of API
**Show Bubbles**
----
Returns json data on all bubbles
* **URL**

  /bubbles

* **Method:**

  `GET`
  
*  **URL Params**

   If you want to filter out bubbles by category (aka tag), you can use:
   /bubbles/:category

   **Optional:**
 
   `category=[string]`

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{
        id: "5ada27459c3137002008efb3",
        title: "Ipsum",
        category: "Lorem Ipsum",
        contentType: "Text/markdown",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.",
        created: "2018-04-20T00:00:00.000Z"
    }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 <br />
    **Content:** `{ message : "Internal servor Error" }`

* **Sample Call:**

  fetch('/bubbles', {
        method: "GET",
        headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .catch(error => console.log(error));

**Create Bubble**
----
Create a new bubble
* **URL**

  /bubbles

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

   `title=[string]`
   `category=[string]`
   `content=[string]`
   `contentType=[string]`

* **Data Params**

  `{ title=[string], category=[string], content=[string], contentType=[string] }`

* **Success Response:**
  
  * **Code:** 201 <br />
    **Content:** `{
        id: "5ada27459c3137002008efb3",
        title: "Ipsum",
        category: "Lorem Ipsum",
        contentType: "Text/markdown",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
        created: "2018-04-20T00:00:00.000Z"
    }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 400 <br />
    **Content:** `{message = 'Missing "field" in request body'}`

  OR

  * **Code:** 500 <br />
    **Content:** `{ message : "Internal servor Error" }`

* **Sample Call:**

  const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBubble)
    }
    fetch(`/bubbles`, options)
    .then(response => response.json())
    .catch(error => console.log(error));

**Edit Bubbles**
----
Edit a bubble
* **URL**

  /bubbles/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**

   `id=[string]`

   **Optional:**
 
   `title=[string]`
   `category=[string]`
   `content=[string]`
   `contentType=[string]`

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 202 <br />
    **Content:** `{
        id: "5ada27459c3137002008efb3",
        title: "Ipsum",
        category: "Lorem Ipsum",
        contentType: "Text/markdown",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
        created: "2018-04-20T00:00:00.000Z"
        }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 400 <br />
    **Content:** `{error: 'Request path id and request body id values must match'}`

  OR

  * **Code:** 500 <br />
    **Content:** `{message : "Internal server error" }`

* **Sample Call:**

   const options = {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updates)
    }
    fetch(`/bubbles/${id}`, options)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error)); 

**Delete Bubbles**
----
Delete bubbles
* **URL**

  /bubbles/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[string]`

* **Success Response:**

  * **Code:** 204 <br />
    **Content:** `{mesage: Success}`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{message: "Internal server error" }`

* **Sample Call:**

   fetch(`/bubbles/${bubbleId}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));

* **Notes:**

   Most requests grab the params from inputs and put them in the body of option which is passed into the function that calls each request method.

### Screenshots

Front Page:
![front page screenshot](https://github.com/davidlee93/BubbleUp-FullStack-Capstone/blob/master/frontpage.png)

Create Bubble Modal:
![create bubble modal screenshot](https://github.com/davidlee93/BubbleUp-FullStack-Capstone/blob/master/Create.png)

Edit Bubble Modal:
![edit buble modal screenshot](https://github.com/davidlee93/BubbleUp-FullStack-Capstone/blob/master/edit.png)

Filter Bubbles:
![filtering "lorem ip" example](https://github.com/davidlee93/BubbleUp-FullStack-Capstone/blob/master/filter.png)

## Technical/Technology

* The client-side web app is built using HTML/CSS, Javascript, jQuery.
* The web app is fully responsive, adapting for mobile, table and desktop viewports.
* A RESTful API was created in making this web app - Node Express was utilized.
