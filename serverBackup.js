const PORT = 8000;
const express = require("express");
const cors = require("cors");
const path = require('path');
const multer  = require('multer');
const chokidar = require('chokidar')
const fs = require('fs')

require('dotenv').config({path:'./.env'})

const app = express();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow_Origin", "*");
    next();
});

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/src/assets/uploads")
    },
    filename: function(req, file, callback) {
        callback(null, `image-uploads-${Date.now()}` + path.extname(file.originalname))
    },
})
const multerFilter = function(req, file, callback){
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       return callback(new Error('Please upload a Image'))
     }
     callback(null, true)
};
const uploads = multer({
    storage: storage,
    fileFilter: multerFilter
})

app.post("/image-upload-services", uploads.array("file"), async (req, res)=>{
    res.status(200).json({'statusCode':200, 'status':true, message: 'Image uploaded successfully','data': {imgUrl: `/assets/uploads/${req.files[0].filename}`}});
})

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))

const getDestinationPath = (pathName) => {
    const pathDirName = pathName.split("/")
    let newPathName = ""

    pathDirName.map((dirPath, index) => {
        if (dirPath === "src") {
            newPathName += `public/`;
        } else {
            newPathName += (pathDirName.length-1) === index ? `` : `${dirPath}/`
        }
    })
    return `/${newPathName.trim("/").trim()}`
}

const watcher = chokidar.watch('src/assets/uploads', { persistent: false })
const  moveFile = (file, dir2)=>{
  //gets file name and adds it to dir2
  var f = path.basename(file);
  var dest = path.resolve(dir2, f);

  fs.rename(file, dest, (err)=>{
    if(err) throw err;
    else console.log('Successfully moved');
  });
};


watcher.on("add", filePath => {
    setTimeout(()=>{
        const outputDir = getDestinationPath(filePath)
        moveFile(`./${filePath}`, `./${outputDir}`)
    }, 1000)
})

  