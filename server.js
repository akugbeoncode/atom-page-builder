const PORT = 8000;
const express = require("express");
const cors = require("cors");
// const uploadImage = require('./uploadImage.js')

require('dotenv').config({path:'./.env'})

const app = express();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow_Origin", "*");
    next();
});

app.post("/image-upload-services", (req, res)=>{
    // uploadImage(req.body.image)
    //     .then((url)=>res.send(url))
    //     .catch((err) => res.status(500).send(err))
    res.send("Hello World...")
})

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));