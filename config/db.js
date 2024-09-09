const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

exports.PORT = process.env.PORT
exports.secretkey = process.env.SECRET_KEY
exports.privatekey=process.env.PRIVATE_KEY

exports.connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
          
        console.log('conected.....')
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
};
