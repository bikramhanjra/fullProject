const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const dotenv = require("dotenv");
dotenv.config();

let mongoURL = process.env.MONGOURL;
console.log("mongourl", mongoURL);
const { connectMongoDb } = require("./connection");
connectMongoDb(mongoURL).then(() => console.log("MongoDb Connected"));
// app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.use("/api/v1/", require("./routes"));

//testing
app.listen(PORT, () => console.log("Server Started"));
