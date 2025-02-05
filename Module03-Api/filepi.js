
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


// GET for creating file

app.get('/createfile/:filename', (req, res) => {
    const filename = req.params.filename;
    const fpath = './' + filename;

    fs.open(fpath, "w", (err) => {
        if(err) throw err;

        res.send(`${filename} created successfully!`);
    });
});

// GET for reading the file content

app.get('/readfile/:filename', (req, res) => {
    const filename = req.params.filename;
    const fpath = './' + filename;

    fs.readFile(fpath, 'utf-8', (err, data) => {
        if(err) throw err;

        res.json(data);
    });
});

app.get("/readfile/:fpath/*", (req, res) => {
  console.log(req.params);

  const fpath = req.params.fpath + "/" + req.params["0"];
  console.log(fpath);

  fs.readFile(fpath, 'utf-8',(err, data) => {
    res.json(data);
  });
});

// GET for deleting a file and folder

app.get("/deletefile/:filename", (req, res) => {
  const filename = req.params.filename;
  const fpath = "./" + filename;

  fs.rm(fpath, (err) => {
    if(err) throw err;

    res.send(`${filename} deleted successfully!`);
  });
});

app.get("/deletedir/:dirname", (req, res) => {
  const dirname = req.params.dirname;
  const fpath = "./" + dirname;

  fs.rmdir(fpath, (err) => {
    if(err) throw err;

    res.send(`${dirname} is deleted successfully!`);
  });
});

app.get("/deletedir/:fpath/*", (req, res) => {
  console.log(req.params);

  const fpath = req.params.fpath + "/" + req.params["0"];
  console.log(fpath);

  fs.rmdir(fpath, (err) => {
    if(err) throw err;

    res.send(`[Deleted] ${fpath}`);
  });
});

app.listen(3000, () => {
    console.log(`server listening on https://localhost:3000/`);
});