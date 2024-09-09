const users=require('../model/user');
exports.getusers=async(req,res)=>{
    try{
        const user=await users.find({});
       res.json(user)
    }
    catch(err){
        console.log("err...",err)
        res.status(500).json({msg:'error'})
    }
}