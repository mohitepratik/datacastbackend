const express = require("express");
// const config = require("config");

var cors = require('cors')





const bp = require("body-parser");
const req = require("express/lib/request");
const res = require("express/lib/response");

const connectDB = require("./config/db");

const app = express();
// const path = require("path");
app.use(cors())

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// const app_id = config.get("app_id");
// const app_key = config.get("app_key");

connectDB();

app.use("/api/datacast", require("./routes/api/datacast"));

app.get('/',(req,res)=> res.send("api running"))



// Production
if (process.env.NODE_ENV === "production") {
    // static folder
    // app.use(express.static("client/build"));
    // app.get("*", (req, res) => {
    //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    // });
  }
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
  