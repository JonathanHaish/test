const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');

const app = express();
const port = 3000;




// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get("/",function(req,res){
	res.sendFile("/home/ubuntu/myapp/public/index.html")
});

//
// Setup multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './myapp/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// Route for file upload
app.post('/upload', upload.single('image'), (req, res) => {
    res.send("File uploaded successfully!");
});



// Route for running commands
app.post('/run-command', express.urlencoded({ extended: true }), (req, res) => {
    console.log(req.body.command)
    exec(req.body.command, (error, stdout, stderr) => {
        if (error) {
            res.send(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            res.send(`stderr: ${stderr}`);
            return;
        }
        res.send(`stdout: ${stdout}`);
    });
});

app.listen(port,'0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
});
