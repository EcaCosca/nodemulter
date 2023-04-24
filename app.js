const express = require('express');
const app = express();
const path = require('path');

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
    console.log("POST IS WORKING");
    
    console.log(req.file)
    
    const { file, fileValidationError } = req;
    if (fileValidationError) {
        return res.status(500).send(fileValidationError);
    }
    
    if (!file) {
        return res.status(400).send('Please upload a file');
    }
    
    // res.send("Image uploaded")
    res.send(`<div>You have uploaded this image: <br/> <img src="http://localhost:3008/images/${req.file.filename}" width="500" /></div>`);
})

app.listen(3008, ()=>{console.log("Up and running");})