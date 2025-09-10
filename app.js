const express = require("express");
const app = express();

const PORT = 3000;

let mongoURL = "mongodb://localhost:27017/teacher_crud";
const {connectMongoDb} = require("./Connection");
connectMongoDb(mongoURL).then(()=>console.log("MongoDb Connected"));

app.use(express.urlencoded({extended:true}));

app.use("/", require("./routes"));

app.listen(PORT, ()=>console.log("Server Started"));