const dotenv = require("dotenv");
dotenv.config({
    path:"./.env"
});
const app = require("./app");
const mongoDbConnection = require("./connection/db.connection");
const port = process.env.PORT || 3000;
mongoDbConnection()
.then(()=>{
    app.listen(port , ()=>{
        console.log(`server is connected at ${port}`);
    })
})
.catch((error)=>{
    console.log("error from DbConnection! " , error);
})
