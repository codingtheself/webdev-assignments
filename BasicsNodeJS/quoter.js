const http = require('http');

const url = "http://zenquotes.io/api/random";

http.get(url, (res) => {
    let data = "";

    res.on('data', (chunks) => {
        data += chunks;
    });

    res.on('close', () => {
        try {
            const jsonRes = JSON.parse(data);
            console.log(jsonRes);
        }
        catch(error) {
            console.log("Error in parsing json");
        }
    });
});