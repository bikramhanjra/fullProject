const express = require("express");
const app = express();

const PORT = 3000; 

let mongoURL = "mongodb://localhost:27017/school_management";
const {connectMongoDb} = require("./connection");
connectMongoDb(mongoURL).then(()=>console.log("MongoDb Connected"));

// app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api/v1/", require("./routes"));
//testing
app.listen(PORT, ()=>console.log("Server Started"));