// AXIOS GLOBALS
// CREATING A GLOBAL FOR TOKENS

// If any request is made, and look into config, there is a token, so can be validated on server

axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


// GET REQUEST
function getTodos() {
    // console.log('GET Request');
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',   // returns a promise
    //     params: {
    //         _limit: 5
    //     }
    // })
    // .then((res) => showOutput(res)) // console.log(data) or console.log(res.data)
    // .catch(err => console.log(err))

    // SHORTEN

    // By default if nothing is mentioned ahead of axios, get request is the one that gets called
    // or directly paste in url with addition of /todos?_limit=5
    axios.get('https://jsonplaceholder.typicode.com/todos', {params: {_limit: 5}}, { timeout: 5000 }) 
    .then((res) => showOutput(res)) // console.log(data) or console.log(res.data)
    .catch(err => console.log(err))


    // timeout: maxtimeout to stop passed as a parameter
  }
  
  // POST REQUEST - sending data
  function addTodo() {
    // console.log('POST Request');

    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',   // returns a promise
    //     data: {                                              // gives id with data whose response is set as false
    //         title: 'New Todo',
    //         completed: false
    //     }
    //     // id returned is 201, since number of responses is 200, so next one added will have response_id = 201
    // })
    // .then((res) => showOutput(res)) // console.log(data) or console.log(res.data)
    // .catch(err => console.log(err))

    // SHORTEN

    axios.post('https://jsonplaceholder.typicode.com/todos', {title: 'New Todo', completed: false})
    .then(res => showOutput(res))
    .catch(err => console.log(err))

  }
  
  // PUT/PATCH REQUEST - to update
  // PUT - replaces entire resource
  // PATCH - update incrementally
  function updateTodo() {
    // console.log('PUT/PATCH Request');

    // For PUT request, user id would have gone, since its replaced
    axios.put('https://jsonplaceholder.typicode.com/todos/1', { // (/1) implies updating todo with id=1
        title: 'Updated Todo', 
        completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err))
    
    // data will have userid, since it didnt replace it completely, but just changed the data specified i.e title and completed
    axios.patch('https://jsonplaceholder.typicode.com/todos/2', { // (/2) implies updating todo with id=1
        title: 'Updated Todo', 
        completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  }
  
  // DELETE REQUEST
  function removeTodo() {
    // console.log('DELETE Request');

    // When delete request is made, returns an empty object
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err))
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    // console.log('Simultaneous Request');

    // If from the given url, want to get both posts and todos at the same time
    // Can use then, to first get posts, then wait on and get todos
    // Use axios.all -> Takes in array of requests and once all promises are fulfilled, get response and handle it

    // ------------------------------------------------------------

    // axios.all([
    //     axios.get('https://jsonplaceholder.typicode.com/todos'),
    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    // ])
    // .then(res => {
    //     console.log(res[0]);
    //     console.log(res[1]);
    //     showOutput(res[1]);
    // })
    // .catch(err => console.error(err));

    // --------------------------------------------------------------

    // OR BY USING SPREAD OPERATOR IN .then()

    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err));
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    // console.log('Custom Headers');

    // Data needs to be sent in headers, eg: authentication using JSON web tokens:
    // Make request to login, validate login, get back a token, send that token in header to access protected routes

    const config = {
        headers: {
            'Content-Type' : 'application/json' ,
            Authorization : 'sometoken'
        }
    }
    
    // 1st parameter is url, 2nd is data sent, 3rd is config
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Todo', 
        completed: false
    }, config)
    .then(res => showOutput(res))
    .catch(err => console.log(err))

  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    // console.log('Transform Response');

    // Create an object called 'options' and send to axios as parameter -> send a get request using whatver put in options

    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
            title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    }

    axios(options).then(res => showOutput(res))
  }
  
  // ERROR HANDLING
  function errorHandling() {
    // console.log('Error Handling');

    axios.get('https://jsonplaceholder.typicode.com/todoss', {
        // validateStatus: function(status) {
        //     return status < 500; // reject only if status >= 500
        // }
    }) 
    .then((res) => showOutput(res)) 
    .catch(err => {
        if(err.response) {
            // Server responded with a status other than 200 range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        }

        if (err.response.status === 404) {
            alert('Error: Page Not Found');
        } else if (err.request) {
            // Request was made but no response
            console.error(err.request);
        } else {
            console.error(err.message);
        }
    })
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    // console.log('Cancel Token');

    const source = axios.CancelToken.source();

    axios.get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
    })
    .then((res) => showOutput(res))
    .catch(thrown => {
        if(axios.isCancel(thrown)) {
            console.log('Request Cancelled', thrown.message)
        }
    }) 

    if(true) {
        source.cancel('Request Cancelled!');
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  // Allows to run a functionality by intercepting a request like a logger
  // Everytime any request is made, in the console, shows what request is made
  axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`)
    return config
  }, error => {
    return Promise.reject(error)
  })
  
  // AXIOS INSTANCES
  const axiosInstance = axios.create({
    // other custom settings
    baseURL: 'https://jsonplaceholder.typicode.com'
  })

  // axiosInstance.get('/comments').then(res => showOutput(res))
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);