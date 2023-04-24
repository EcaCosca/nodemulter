import express from 'express';
import cors from 'cors';
import upload from './utils/fileUploader.js';
import ejs from "ejs";

const app = express();
const publicFolder = "./public";


app.use(cors());
app.use(express.json());
app.use(express.static(publicFolder));



app.get('/upload-profile-picture', (req, res) => {
    res.sendFile('upload_profile_picture.html', { root: publicFolder })
});

app.post('/upload-profile-picture', upload.single('profile_pic'), (req, res, next) => {
    const { file, fileValidationError } = req;
    if (fileValidationError) {
        return res.status(500).send(fileValidationError);
    }

    if (!file) {
        return res.status(400).send('Please upload a file');
    }

    res.send(`<div>You have uploaded this image: <br/> <img src="http://localhost:3000/uploads/${req.file.filename}" width="500" /></div>`);
})


app.get('/upload-cat-pics', (req, res) => {
    res.sendFile('upload_cat_pictures.html', { root: publicFolder })
});


app.post('/upload-cat-pics', upload.array('cat_pics'), (req, res, next) => {
    const { files, fileValidationError } = req;
    if (fileValidationError) {
        return res.status(500).send(fileValidationError);
    }

    if (!files) {
        return res.status(400).send('Please upload a file');
    }


    let html = ejs.render(`
        <h1>You have uploaded this images:</h1>
        <ul>
            <% for (let i = 0; i < pictures.length; i++) { %>
                <li> 
                    <img src="http://localhost:3000/uploads/<%= pictures[i].filename %>" width="500" />
                </li>
            <% } %>
        </ul>`,
        { pictures: req.files }
    );

    res.send(html);
})

app.listen(3000, () => console.log('Server running on port 3000'));