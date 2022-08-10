// console.log('This is my tut 64.');

// Hide the parameter box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box 
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// If the user clicks on params box, hide the json box 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// Initialiaze the no. of parameters.
let addParamCount = 0;

// If the use clicks on + button, add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamCount + 2}</label>
                        <div class="col-md-4">
                        <input type="text" class="form-control my-2" id="parameterKey${addParamCount + 2}" placeholder="Enter Parameter ${addParamCount + 2} Key"></div>
                        <div class="col-md-4">
                        <input type="text" class="form-control my-2" id="parameterValue${addParamCount + 2}" placeholder="Enter Parameter ${addParamCount + 2} Value"></div>
                        <button class="btn btn-primary deleteParam my-2">-</button>
                </div>`

    // Convert the elemnt string into DOM node.  
    let div = document.createElement('div');
    div.innerHTML = string;
    params.appendChild(div);
    addParamCount++;
    // console.log(addParamCount);

    // Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (const item of deleteParam) {
        item.addEventListener('click', (e) => {
            if(confirm("Do you want to delete the parameter.") == true){
                e.target.parentElement.remove(); 
            }
        })
    }

})

// If the user click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').innerHTML = "Please wait... Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait... Fetching response...";


    // Fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // If user has used param option instead of json, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i+1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }          
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // console.log("Url is ", url);
    // console.log("requestType is ", requestType);
    // console.log("contentType is ", contentType);
    // console.log("data is ", data);

    // If the request type is get, invoke fetch api to create a post request...
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        }).then(response => response.text()).then((text) => {
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
        
    } else {
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text()).then((text) => {
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });
    }
})

// Get and post both request APi --> https://jsonplaceholder.typicode.com
// Get request APi --> https://randomuser.me/api