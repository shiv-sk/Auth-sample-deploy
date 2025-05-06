const mongoose = require("mongoose");
const dbConnection = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("mongoDb is connected! ");
    } catch (error) {
        console.log("error from Db connection! " , error);
        process.exit(1);
    } 
}

module.exports = dbConnection;