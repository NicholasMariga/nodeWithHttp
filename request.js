//making a GET Request
const http = require('http');
//const https = require('https');

const data = JSON.stringify({
    userName: 'Nicholas Mariga'
});

const options = {
    hostname: 'localhost',
    port: 8080,
    //port: 443,
    path: '/users',
    //method: 'POST',
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        //making authenticated requests
        //'Authorization': Buffer.from('myUsername' + ':' + 'myPassword').toString('base64')
    }
}

//variable 
const request = http.request(
//const request = https.request(
    options,
    //url to make request to
    // {hostname: 'www.google.com'},
    // 'http://www.google.com',
    //callack
    (response)=>{
        console.log(`statusCode: ${response.statusCode}`);
        console.log(response.headers);

        //listen to stream through a data event
        response.on('data', (chunk) =>{
            console.log("This is a chunk");
            console.log(chunk.toString());

        });
    }
)
request.on('error', (err)=>{
    console.error(err);
});

request.write(data);

request.end();