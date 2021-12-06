const axios = require('axios');
const fs = require('fs');

// axios.get('http://www.google.com')

//to stream request
axios({
    //method: 'get',
    method: 'post',
   //url: 'http://www.google.com',
    url: 'http://localhost:8080/users',
    //responseType: 'stream'
    data: {
        userNames: ['Slimguy','Nicholas','NIck','Mariga']
    },
    transformRequest: (data, Headers) =>{
        //mapping 
        const newData = data.userNames.map((userName) =>{
            return userName + '!';
        });
        return JSON.stringify(newData);
    }

})
.then((response) => {
    // console.log(response);
    //response body made available through data property
    //console.log(response.data);

    //streaming
    response.data.pipe(fs.createWriteStream('google.html'));
})
.catch((error) => {
    console.error(error);
});