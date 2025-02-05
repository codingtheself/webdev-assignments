
const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Home!</h1>");
});

// sending the GET request to list all file

app.get('/listall', (req, res) => {
    
    fs.readdir('./', (err, files) => {
        res.json(files);
    });
});

app.get('/listall/:fpath/*', (req, res) => {
    
    console.log(req.params);

    const fpath = req.params.fpath + '/' + req.params['0'];
    console.log(fpath);
    
    fs.readdir(fpath, (err, files) => {
        res.json(files);
    });
});

app.listen(3000, () => {
    console.log(`server listening on https://localhost:3000/`);
});