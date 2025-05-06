const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");


const allowedOrigins = ["http://localhost:3000"];
const corsOption = {
    origin:function(origin , callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null , true);
        }
        else{
            console.log("blocked by origin: " , origin)
        }
    },
    credentials:true,
    optionsSuccessStatus: 200
};
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOption));

//routes
const userRoutes = require("./routes/user.route");
app.use("/api/v1/user" , userRoutes);



module.exports = app;