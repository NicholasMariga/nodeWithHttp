const http = require("http");
const url = require("url");
const services = require("./services/services");
const textBody = require("body");
const jsonBody = require("body/json");
const fs = require("fs");
const formidable = require("formidable");

const server = http.createServer();

server.on("request", (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  // console.log(parsedUrl);
  if (request.method === "GET" && parsedUrl.pathname === "/metadata") {
    const { id } = parsedUrl.query;
    //console.log(id);
    const metadata = services.fetchImageMetadata(id);
    //responding with json
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;
    const serializedJSON = JSON.stringify(metadata);
    response.write(serializedJSON);
    response.end();
    console.log(metadata);
    //console.log(request.headers);
  } else if (request.method === "POST" && parsedUrl.pathname === "/users") {
    jsonBody(request, response, (err, body) => {
      console.log(body);
      if (err) {
        console.log(err);
      } else {
        services.createUser(body["userName"]);
      }
    });
  }  else if (request.method === "DELETE" && parsedUrl.pathname === "/users") {
    jsonBody(request, response, (err, body) => {
      console.log(body);
      if (err) {
        console.log(err);
      } else {
        services.deleteUser(body["userName"]);
      }
    });
  } 
  else if (request.method === "POST" && parsedUrl.pathname === "/upload") {
    const form = new formidable.IncomingForm({
      uploadDir: __dirname,
      keepExtensions: true,
      multiples: true,
      maxFileSize: 5 * 1024 * 1024
    });
    //using callback
    // form.parse(request, (err, fields, files) => {
    //   if (err){
    //     console.log(err);
    //     response.statusCode = 500;
    //     response.end("Error");
    //   }
    //   console.log("\n fields");
    //   console.log(fields);
    //   console.log("\n files");
    //   console.log(files);
    //   response.statusCode = 200;
    //   response.end("success");
    // });

    //Using events
    form.parse(request).on('fileBegin', (name, file)=>{
      console.log('Our upload has started!');
    }).on('file', (name, file) =>{
      console.log('Field + File pair has been recieved');
    }).on('field', (name, value) => {
      console.log('Field Received');
    }).on('progress',(bytesReceived, bytesExpected)=>{
      console.log(bytesReceived + ' / ' + bytesExpected);
    }).on('error', (err) =>{
      console.error(err);
      request.resume();
    }).on('aborted', ()=>{
      console.error("Request aborted by the user")
    }).on('end', ()=>{
      console.error('Done - request fully received!');
      response.end('Success');
    });
  } else {
    // response.statusCode = 404;
    // response.setHeader("X-Powered-By", "Node");
    // response.end();
    fs.createReadStream("./index.html").pipe(response);
  }
  //   const body = [];
  //   request.on('data', (chunk) => {
  //     body.push(chunk);
  //   }).on('end', () => {
  //     const parsedJSON = JSON.parse(Buffer.concat(body));
  //     const userName = parsedJSON[0]['userName'];
  //     services.createUser(userName);
  //   });
  //console.log('This is an incoming request');
});

server.listen(8080);
