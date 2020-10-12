const mongoose= require('mongoose')

const connectDB = async (req,res)=>{
    try {
        mongoose.connect("mongodb://localhost:27017/travel_log",{
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex:true
        
    })
    console.log("MongoDB connected...");
    } catch (error) {
        console.error(error.message);
        // Exit process with failure
        process.exit(1)
    }
    
}

module.exports = connectDB
