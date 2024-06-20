const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const dbconnection=async()=>{
    const mongoURL=process.env.mongoURL;
    console.log(mongoURL);
    try {
        await mongoose.connect(mongoURL,{useNewUrlParser:true});
        console.log("DB connection established");
        
    } catch (error) {
        console.log("can't connect to DB");
        
    }
};

module.exports={dbconnection};